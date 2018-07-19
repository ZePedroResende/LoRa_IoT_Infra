defmodule BreezeWeb.PageController do
  use BreezeWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
