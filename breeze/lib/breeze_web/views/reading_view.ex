defmodule BreezeWeb.ReadingView do
  use BreezeWeb, :view
  alias BreezeWeb.ReadingView

  def render("index.json", %{readings: readings}) do
    %{data: render_many(readings, ReadingView, "reading.json")}
  end

  def render("show.json", %{reading: reading}) do
    %{data: render_one(reading, ReadingView, "reading.json")}
  end

  def render("reading.json", %{reading: reading}) do
    %{id: reading.id,
      reading: reading.reading,
      reading_time: reading.reading_time}
  end
end
