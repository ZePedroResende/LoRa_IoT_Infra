defmodule Breeze.DataTest do
  use Breeze.DataCase

  alias Breeze.Data

  describe "readings" do
    alias Breeze.Data.Reading

    @valid_attrs %{reading: %{}, reading_time: "2010-04-17 14:00:00.000000Z"}
    @update_attrs %{reading: %{}, reading_time: "2011-05-18 15:01:01.000000Z"}
    @invalid_attrs %{reading: nil, reading_time: nil}

    def reading_fixture(attrs \\ %{}) do
      {:ok, reading} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Data.create_reading()

      reading
    end

    test "list_readings/0 returns all readings" do
      reading = reading_fixture()
      assert Data.list_readings() == [reading]
    end

    test "get_reading!/1 returns the reading with given id" do
      reading = reading_fixture()
      assert Data.get_reading!(reading.id) == reading
    end

    test "create_reading/1 with valid data creates a reading" do
      assert {:ok, %Reading{} = reading} = Data.create_reading(@valid_attrs)
      assert reading.reading == %{}
      assert reading.reading_time == DateTime.from_naive!(~N[2010-04-17 14:00:00.000000Z], "Etc/UTC")
    end

    test "create_reading/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Data.create_reading(@invalid_attrs)
    end

    test "update_reading/2 with valid data updates the reading" do
      reading = reading_fixture()
      assert {:ok, reading} = Data.update_reading(reading, @update_attrs)
      assert %Reading{} = reading
      assert reading.reading == %{}
      assert reading.reading_time == DateTime.from_naive!(~N[2011-05-18 15:01:01.000000Z], "Etc/UTC")
    end

    test "update_reading/2 with invalid data returns error changeset" do
      reading = reading_fixture()
      assert {:error, %Ecto.Changeset{}} = Data.update_reading(reading, @invalid_attrs)
      assert reading == Data.get_reading!(reading.id)
    end

    test "delete_reading/1 deletes the reading" do
      reading = reading_fixture()
      assert {:ok, %Reading{}} = Data.delete_reading(reading)
      assert_raise Ecto.NoResultsError, fn -> Data.get_reading!(reading.id) end
    end

    test "change_reading/1 returns a reading changeset" do
      reading = reading_fixture()
      assert %Ecto.Changeset{} = Data.change_reading(reading)
    end
  end
end
