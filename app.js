
const express = require("express")

const app = express();
const ejs = require("ejs")

app.use(express.json())
app.set("view engine", "ejs")


app.use(express.static("public"))
app.use("/rest", require("./routes/API"))




let port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})