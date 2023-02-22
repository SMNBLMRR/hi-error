# custom-http-error-handler
###### Tiny library for handling http client/server errors 


#Example without using JSON

```javascript
const he = require("he");
he.CreateError(400,"BAD REQUEST)
```

#Example using JSON

```javascript
const he = require("he")({
path:["folder","file.json"]
});

he.BAD_REQUEST
```
in this example you can pass the path parameter inside the options, which can be a folder or a single file

** this is what your json schema should look like **

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


