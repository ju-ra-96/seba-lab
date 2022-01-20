var express = require("express");
var app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
var multer = require('multer')
const { Pool } = require('pg');

app.get("/", (req, res, next) => {
  res.send("Api running");
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage }).single('file')
app.post('/upload', function (req, res) {

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  }); 
});

    // Connecting Routes

    app.use("/api/cluster", require("./routes/cluster"));
 
    const PORT = process.env.PORT || 8000;

    const server = app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );

    process.on("unhandledRejection", (err, promise) => {
      console.log(`Logged Error: ${err.message}`);
      server.close(() => process.exit(1));
    });