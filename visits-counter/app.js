const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
    host: "redis-server",           // specified in the docker-compose.yml
    port: 6379                      // default redis port
});

// Initialize the number of visits
client.set("visits", 0);

// Increase and store the number of visits
app.get("/", (req, res) => {
    client.get("visits", (err, visits) => {
        client.set("visits", parseInt(visits) + 1);
        res.send("This page has been visited " + visits + " times");
    });    
});

// Start the server
app.listen(8080, () => {
    console.log("Listening on port 8080");
});
