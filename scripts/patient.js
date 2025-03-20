// Replace with your actual ThingSpeak details
var CHANNEL_ID = "2885794";  // Your ThingSpeak Channel ID
var FIELD_NUMBER = "1";  // Field to subscribe to
var READ_API_KEY = "AGYJOGI7MKWKC9WE";  // Not needed for MQTT, but useful for HTTP requests
// ThingSpeak MQTT Broker details
var MQTT_BROKER = "mqtt3.thingspeak.com";
var MQTT_PORT = 80;  // WebSockets Port
var MQTT_PATH = "/mqtt";
var MQTT_USERNAME = "MhwFIjkzJw4XDAwKDi4sDxU";  // Your Account API Key (not Read API Key)
var MQTT_PASSWORD = "ymTCsJ/3AdGJIeEGVlvzlao6";  // Your MQTT API Key

// Generate a unique MQTT client ID
var MQTT_CLIENT_ID = "MhwFIjkzJw4XDAwKDi4sDxU";
// Create MQTT client
var MQTT_CLIENT = new Paho.MQTT.Client(MQTT_BROKER, MQTT_PORT, MQTT_PATH, MQTT_CLIENT_ID);

// Define callback when message arrives
MQTT_CLIENT.onMessageArrived = function (message) {
    console.log("Received MQTT Message:", message.payloadString);
    document.getElementById("data").innerText = "Latest Data: " + message.payloadString;
};

// Connect to MQTT Broker
MQTT_CLIENT.connect({
    onSuccess: onConnect,
    onFailure: onFailure,
    userName: MQTT_USERNAME,
    password: MQTT_PASSWORD
});

// Function called when connected
function onConnect() {
    console.log("Connected to ThingSpeak MQTT Broker");

    // Subscribe to ThingSpeak field topic
    var topic = "channels/" + CHANNEL_ID + "/subscribe/fields/field" + FIELD_NUMBER;
    MQTT_CLIENT.subscribe(topic);
    console.log("Subscribed to: " + topic);
}

// Function called when connection fails
function onFailure(response) {
    console.log("Connection failed: " + response.errorMessage);
}
