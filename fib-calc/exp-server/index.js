const keys  = require("./keys");

// Express app setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());    // Cross-Origin Resource Sharing
app.use(bodyParser.json());


// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});
pgClient.on("error", () => console.error("Database connection lost!"));

pgClient
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch(err => console.error(err));


// Redis client setup
const redis = require("redis");
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000      // if connection is lost, try to reconnect once every 1000 milliseconds
});
const redisPublisher = redisClient.duplicate();


/*** Express route handlers ***/

app.get("/", (req, res) => {
    res.send("Express server running");
});

// Retrieve all values stored in the database (postgres)
app.get("/values/all", async (req, res) => {
    const values = await pgClient.query("SELECT * FROM values");

    res.send(values.rows);
});

// Retrieve all pair of values from redis
app.get("/values/current", async (req, res) => {
    redisClient.hgetall("values", (err, values) => {
        res.send(values);
    });
});

// Endpoint to submit an index
app.post("/values", async (req, res) => {
    const index = parseInt(req.body.index);

    if (index < 0 && index > 40) {       // avoid negative and big numbers
        return res.status(422).send("Index out of bounds");
    }

    // store the index
    redisClient.hset("values", index, "Nothing yet...");
    redisPublisher.publish("insert", index);
    pgClient.query("INSERT INTO values(number) VALUES ($1)", [index]);

    res.send({ status: "working" });
});

// start listening
app.listen(5000, err => {
    console.log("Express server up and listening...");
})
