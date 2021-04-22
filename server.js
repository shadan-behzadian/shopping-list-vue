const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const BucketListItemRoutes = require("./routes/api/buckeListItems");

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB database conneted ..."))
  .catch((err) => console.log(err, mongoUri));

app.use("/api/bucketListItems", BucketListItemRoutes);
app.get("/", (req, res) => res.send("Hello world"));
app.listen(PORT, () =>
  console.log(`app lalala listenting at http/localhost/${PORT}`)
);
