# app/redis_client.py
import os
import redis

REDIS_URL = os.getenv("REDIS_URL")

# Use decode_responses=True to get string data (not bytes)
redis_client = redis.Redis.from_url(REDIS_URL, decode_responses=True)
