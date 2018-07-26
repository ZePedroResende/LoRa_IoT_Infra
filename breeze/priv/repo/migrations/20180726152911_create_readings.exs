defmodule Breeze.Repo.Migrations.CreateReadings do
  use Ecto.Migration

  def change do
    create table(:readings) do
      add :reading, :map
      add :reading_time, :utc_datetime

      timestamps()
    end

  end
end
