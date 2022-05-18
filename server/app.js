var express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();

const fileupload = require("express-fileupload");
app.use(fileupload());

const cors = require("cors");
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// ROUTE
const accountsRoute = require("./routes/accounts");
const categoryRoute = require("./routes/category");
const questionRoute = require("./routes/question");
const usersRoute = require("./routes/users");
const rolesRoute = require("./routes/roles");
const examRoute = require("./routes/exam");

app.use("/accounts", accountsRoute);
app.use("/category", categoryRoute);
app.use("/question", questionRoute);
app.use("/users", usersRoute);
app.use("/roles", rolesRoute);
app.use("/exam", examRoute);

// CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
