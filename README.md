# Message Board

A mini-app created with Express, includes:
-  `"/"` messages on the home page
-  The `"/new"` route contains a form for adding new messages
-  Messages are routed based on their IDs: `"/message/:id"`
-  Other routes return an error page

Example of a draft .env file containing environment variables:
```js
//.env
PGHOST="localhost" 
PGUSER="user123" 
PGDATABASE="my_messages" 
PGPASSWORD="password123"
PGPORT=1234
PORT=3000
```