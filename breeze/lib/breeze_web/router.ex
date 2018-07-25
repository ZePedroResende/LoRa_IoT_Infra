defmodule BreezeWeb.Router do
  use BreezeWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
  end

  pipeline :api_auth do
    plug :ensure_authenticated
  end


  scope "/api", BreezeWeb do
    pipe_through :api
    post "/users/sign_in", UserController, :sign_in

    scope "/auth" do
      pipe_through :api_auth
      resources "/users", UserController, except: [:new, :edit]
    end
  end

  defp ensure_authenticated(conn, _opts) do
    current_user_id = get_session(conn, :current_user_id)

    if current_user_id do
      conn
    else
      conn
      |> put_status(:unauthorized)
      |> render(BreezeWeb.ErrorView, "401.json", message: "Unauthenticated user")
      |> halt()
    end
  end
end
