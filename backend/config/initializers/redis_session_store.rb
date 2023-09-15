Rails.application.config.session_store :redis_session_store,
  key: 'nextjs-rails',
  redis: {
    expire_after: 120.minutes,  # cookie expiration
    ttl: 120.minutes,           # Redis expiration, defaults to 'expire_after'
    key_prefix: 'nextjs-rails:session:',
    url: 'redis://redis:6379/0',
  }