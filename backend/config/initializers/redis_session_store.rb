Rails.application.config.session_store :redis_session_store,
  key: 'nextjs-rails',
  redis: {
    expire_after: 30.days,
    ttl: 30.days,
    key_prefix: 'nextjs-rails:session:',
    url: ENV.REDIS_URL,
  }