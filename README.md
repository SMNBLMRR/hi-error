# hi-error
###### Tiny library for handling http client/server errors 

# Installation
```
npm i hi-error
```
# Example without using JSON

```javascript
const hi = require("hi-error");

//example using fastify
app.get("/api/v1/h1", async (req,res) => {
  return hi.CreateError(400,"BAD REQUEST")
})
```

# Example using JSON

```javascript
const hi = require("hi-error")({
  path:["folder","file.json"]
});

//example using fastify
app.get("/api/v1/h1", async (req,res) => {
  return hi.BAD_REQUEST
})
```
in this example you can pass the path parameter inside the options, which can be a folder or a single file

**this is what your json schema should look like**

```json
[
  {
    "tag": "BAD_REQUEST",
    "error": {
      "code": 400,
      "message": "BAD REQUEST EXCEPTION"
    }
  }
]

```
so you can call an Exception using the tag name inside your json


