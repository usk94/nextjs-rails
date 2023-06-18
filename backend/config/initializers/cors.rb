Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '127.0.0.1:3000', 'localhost:3000', ENV["FRONTEND_HOST"] || ""

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
