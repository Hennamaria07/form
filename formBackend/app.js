const express = require ("express") ;
const userRouter = require("./routes/userRoutes")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())
app.use(userRouter)
module.exports = app;