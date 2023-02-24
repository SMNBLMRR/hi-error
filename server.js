const f = require("fastify")({
    logger:true
});
const hi = require("./index")();
f.get("/api/v1/ciao", async (req,res) => {
    hi.CreateError(100,"Exception");
})

f.listen({port:3002});