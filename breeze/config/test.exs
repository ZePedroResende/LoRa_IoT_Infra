use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :breeze, BreezeWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
config :bcrypt_elixir, :log_rounds, 4
# Configure your database
config :breeze, Breeze.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "breeze_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
