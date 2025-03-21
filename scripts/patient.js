const mqtt = require("mqtt");

const CHANNEL_ID = "2885794";
const MQTT_USERNAME = "OjkPIC48PR4QJCMVBhkZLAM";
const MQTT_PASSWORD = "9AXunB529V4pNFVXyBtxZyiE";
const CLIENT_ID = "OjkPIC48PR4QJCMVBhkZLAM";

const broker = "mqtt://mqtt3.thingspeak.com:1883"; // Use MQTT (not WebSockets)
const topic = `channels/${CHANNEL_ID}/subscribe/fields/field1`;

const client = mqtt.connect(broker, {
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    clientId: CLIENT_ID
});

client.on("connect", () => {
    console.log("Connected to ThingSpeak MQTT!");
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Subscribed to ${topic}`);
        }
    });
});

client.on("message", (receivedTopic, message) => {
    if (receivedTopic === topic) {
        console.log("Received:", message.toString());
    }
});

client.on("error", (err) => {
    console.error("Connection error:", err);
});