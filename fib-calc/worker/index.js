const keys  = require("./keys");
const redis = require("redis");

// create a redis client
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

// duplicate the redis client to...
const sub = redisClient.duplicate();

// Fibonacci classic implementation
function fib (i) {
    return i < 2 ? 1 : fib(i - 1) + fib(i - 2);
}

// subscription on new message (index)
sub.on("message", (channel, message) => {
    // calculate the fibonacci value and insert into a hash of values
    redisClient.hset("values", message, fib(parseInt(message)));
});
sub.subscribe("insert");

