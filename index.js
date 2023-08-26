const express = require("express");
const axios = require("axios");
const cors = require("cors");
const cheerio = require("cheerio");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.get("/api/directlink", (req, res) => {
  let id = req.query.id;
  if (!id) {
    res.send({
      error: "id is required",
    });
  }

  let videoId = id;
  const url = "https://faselhd-embed.scdn.to/video_player?uid=0&vid=" + videoId;

  axios.get(url).then((response) => {
    res.send({
      success: true,
      data: response.data,
    });
  });
});

const port = process.env.PORT || 8080;

app.listen(port, (err, res) => {
  if (err) {
    console.log(err);
    return res.status(500).send(err.message);
  } else {
    console.log("[INFO] Server Running on http://localhost:" + port);
  }
});

module.exports = app;
