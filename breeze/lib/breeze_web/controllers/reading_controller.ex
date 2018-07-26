defmodule BreezeWeb.ReadingController do
  use BreezeWeb, :controller

  alias Breeze.Data
  alias Breeze.Data.Reading

  action_fallback BreezeWeb.FallbackController

  def index(conn, _params) do
    readings = Data.list_readings()
    render(conn, "index.json", readings: readings)
  end

  def create(conn, %{"reading" => reading_params}) do
    with {:ok, %Reading{} = reading} <- Data.create_reading(reading_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", reading_path(conn, :show, reading))
      |> render("show.json", reading: reading)
    end
  end

  def show(conn, %{"id" => id}) do
    reading = Data.get_reading!(id)
    render(conn, "show.json", reading: reading)
  end

  def update(conn, %{"id" => id, "reading" => reading_params}) do
    reading = Data.get_reading!(id)

    with {:ok, %Reading{} = reading} <- Data.update_reading(reading, reading_params) do
      render(conn, "show.json", reading: reading)
    end
  end

  def delete(conn, %{"id" => id}) do
    reading = Data.get_reading!(id)
    with {:ok, %Reading{}} <- Data.delete_reading(reading) do
      send_resp(conn, :no_content, "")
    end
  end
end
