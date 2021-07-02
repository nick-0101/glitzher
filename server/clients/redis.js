const redis = require('redis');
const { promisify } = require('util');

// Redis Clients
const RedisClient = redis.createClient({
  host: process.env.HOSTNAME,
  port: process.env.REDISPORT,
  password: process.env.PASSWORD,
});
const PORT_REDIS = process.env.PORT || 6379;
const RedisCacheClient = redis.createClient(PORT_REDIS);

// Homepage Get
const GET_ASYNC = promisify(RedisClient.get).bind(RedisClient);

// Cache Get
const GET_CACHE_ASYNC = promisify(RedisCacheClient.get).bind(RedisCacheClient);
const SET_CACHE_ASYNC = promisify(RedisCacheClient.set).bind(RedisCacheClient);

module.exports = {
  GET_ASYNC,
  GET_CACHE_ASYNC,
  SET_CACHE_ASYNC,
};
