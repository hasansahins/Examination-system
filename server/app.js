var express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


// ROUTE 
const accountsRoute = require("./routes/accounts");
const categoryRoute = require("./routes/category");
const questionRoute = require("./routes/question");

app.use("/accounts", accountsRoute);
app.use("/category", categoryRoute);
app.use("/question", questionRoute);


// CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("MongoDB: Connected");
  }
);

// SERVER LISTEN
var server = app.listen(3030, function () {
  var port = server.address().port;
  console.log("Example app listening at http://localhost:", port);
});
