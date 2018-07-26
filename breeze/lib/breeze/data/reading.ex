defmodule Breeze.Data.Reading do
  use Ecto.Schema
  import Ecto.Changeset


  schema "readings" do
    field :reading, :map
    field :reading_time, :utc_datetime

    timestamps()
  end

  @doc false
  def changeset(reading, attrs) do
    reading
    |> cast(attrs, [:reading, :reading_time])
    |> validate_required([:reading, :reading_time])
  end
end
