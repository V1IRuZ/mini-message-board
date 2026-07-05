# Message Board

A mini-app created with Express, includes:
-  `"/"` messages on the home page
-  The `"/new"` route contains a form for adding new messages
-  Messages are routed based on their IDs: `"/message/:id"`
-  Other routes return an error page

Environmental variables:
```js
//.env
DATABASE_URL="postgresql://<role_name>:<role_password>@<host>:<port>/<database>"
PORT=<local_server_port>
```