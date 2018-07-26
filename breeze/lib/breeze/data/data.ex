defmodule Breeze.Data do

  import Ecto.Query, warn: false
  alias Breeze.Repo

  alias Breeze.Data.Reading

  def list_readings do
    Repo.all(Reading)
  end

  def get_reading!(id), do: Repo.get!(Reading, id)

  def create_reading(attrs \\ %{}) do
    %Reading{}
    |> Reading.changeset(attrs)
    |> Repo.insert()
  end

  def update_reading(%Reading{} = reading, attrs) do
    reading
    |> Reading.changeset(attrs)
    |> Repo.update()
  end

  def delete_reading(%Reading{} = reading) do
    Repo.delete(reading)
  end

  def change_reading(%Reading{} = reading) do
    Reading.changeset(reading, %{})
  end
end
