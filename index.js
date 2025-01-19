const express = require('express');
const path= require ('path')
const app = express();
const port = 4000;
const cors = require("cors");
require("./connect")
const demo = require("./Router")
app.use(express.json())
app.use(cors())


app.use("/flowerapi", demo)
app.use('/uploadsflower', express.static(path.join(__dirname, 'uploadsflower')))

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
});














