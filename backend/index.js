const express = require("express");
const cors = require("cors");
const app = express();

const port = 3001;


app.use(cors());

app.post("/commissions", (req, res) => {
   res.status(500);
   return res.send(">:C");
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
