defmodule BreezeWeb.Router do
  use BreezeWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", BreezeWeb do
    pipe_through :api
  end
end
