
const express = require("express")

const app = express();
const ejs = require("ejs")
const bodyParser = require("body-parser")
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs")


app.use("/public", express.static("./public/"))


app.use("/rest", require("./routes/API"))



let port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})