import paho.mqtt.client as mqtt
import time
import random

# ThingSpeak configuration for credentials-based connection.
CHANNEL_ID = "2885794"
MQTT_USERNAME = "MhwFIjkzJw4XDAwKDi4sDxU"    # Your MQTT username for this channel
MQTT_PASSWORD = "ymTCsJ/3AdGJIeEGVlvzlao6"    # Your MQTT password for this channel
MQTT_CLIENT_ID = "MhwFIjkzJw4XDAwKDi4sDxU"          # Replace with your MQTT client ID

# Using the mqtt3 endpoint for credential-based connection.
MQTT_BROKER = "mqtt3.thingspeak.com"
MQTT_PORT = 1883
# Topic does NOT include the API key when using username/password.
MQTT_TOPIC = f"channels/{CHANNEL_ID}/publish"

def on_connect(client, userdata, flags, rc):
    print("Connected with result code", rc)
    if rc != 0:
        print("Connection failed. Check your credentials or network settings.")

def on_publish(client, userdata, mid):
    print("Data published successfully.")

# Create an MQTT client with the provided client id.
client = mqtt.Client(client_id=MQTT_CLIENT_ID, protocol=mqtt.MQTTv311)
client.on_connect = on_connect
client.on_publish = on_publish

# Set your MQTT credentials.
client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)

# Connect to the MQTT broker.
client.connect(MQTT_BROKER, MQTT_PORT, keepalive=60)
client.loop_start()  # Start network loop in background thread.

try:
    while True:
        # Generate a random value for field1.
        value = random.randint(0, 100)
        # Format the payload as expected by ThingSpeak, e.g., updating field1.
        message = f"field1={value}"
        result = client.publish(MQTT_TOPIC, message)
        if result.rc == mqtt.MQTT_ERR_SUCCESS:
            print("Published payload:", message)
        else:
            print("Failed to publish message:", mqtt.error_string(result.rc))
        # ThingSpeak free accounts allow one update every 15 seconds.
        time.sleep(15)
except KeyboardInterrupt:
    print("Terminated by user.")
finally:
    client.loop_stop()
    client.disconnect()
