defmodule Breeze.Mqtt_connection.Connection do
  use Supervisor
  alias Breeze.Mqtt_connection.Handler

  def start_link(opts) do
    Supervisor.start_link(__MODULE__, opts, name: __MODULE__)
  end

  @impl true
  def init(_opts) do
    children = [
      {Tortoise.Connection,
       [
         client_id: "ola",
         server: {Tortoise.Transport.Tcp, host: "eu.thethings.network", port: 1883},
         user_name: "testepysense",
         password: "ttn-account-v2.bSok0Le8kEZfKfwVH7EXfDYMspEp9UkqQYjWuy1Kqmg",
         handler: {Handler, []},
         subscriptions: [{"+/devices/+/up",0}]
       ]}
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end
end
