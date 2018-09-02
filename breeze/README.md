# Breeze

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix


## API

If running on localhost them we can interact with the api like:

### Signup
#### POST
  /api/signup
`curl -H "Content-Type: application/json" -X POST \
-d '{"user":{"email":"some@email.com","password":"some password"}}' \
http://localhost:4000/api/signup`

### Signin
#### POST
  /api/users/signin

`curl -H "Content-Type: application/json" -X POST \
-d '{"email":"asd@asd.com","password":"qwerty"}' \
http://localhost:4000/api/users/sign_in \
-c cookies.txt -b cookies.txt -i`

### Readings
#### GET
  /api/auth/readings
  `curl -H "Content-Type: application/json" -X GET \
http://localhost:4000/api/auth/readings \
-c cookies.txt -b cookies.txt -i`



## Configuration

You can configure the pro enviorment either:

  - by modifying the config/prod.exs
  - [using destilary and configure that to generate a binary of the app](https://github.com/bitwalker/distillery)
