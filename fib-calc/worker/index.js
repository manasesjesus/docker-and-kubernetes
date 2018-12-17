const keys  = require("./keys");
const redis = require("redis");

// create a redis client
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

// Fibonacci classic implementation
function fib (i) {
    return i < 2 ? 1 : fib(i - 1) + fib(i - 2);
}

// duplicate the redis client
const sub = redisClient.duplicate();

// subscription on new message (index)
sub.on("message", (channel, message) => {
    // calculate the fibonacci value and insert into a hash of values
    redisClient.hset("values", message, fib(parseInt(message)));
});
sub.subscribe("insert");

