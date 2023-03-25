// const express = require("express");
// const mysql = require("mysql2");
// const bodyParser = require("body-parser");

// const app = express();
// // app.use(bodyParser.urlencoded({ extended: false }))
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

// // MySQL connection configuration
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Sly@123456",
//   database: "movie_seat_booking",
// });

// // Connect to MySQL database
// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to MySQL database!");
// });

// // Define the API endpoint for inserting selectedSeats data
// app.post("/insert-selected-seats", urlencodedParser, (req, res) => {
//   const selectedSeats = JSON.parse(req.body.selectedSeats);

//   console.log("hello");

//   // Insert the selected seats into the MySQL database
//   // const sql = "INSERT INTO seats (seat_number) VALUES ?";
//   // const values = selectedSeats.map((seatNumber) => [seatNumber]);

//   for (let i = 0; i < selectedSeats.length; i++) {
//     let value = selectedSeats[i];
//     connection.execute("INSERT INTO seats (Seat_No) VALUES(?)", [value]);
//   }

//   // connection.query(sql, [values], (err, result) => {
//   //   if (err) throw err;

//   //   // console.log(`${result.affectedRows} rows inserted`);
//   //   res.sendStatus(200);
//   // });

//   // connection.execute('INSERT INTO seats (Seat_No) VALUES(?)', [])
// });

// // Start the server
// const PORT = process.env.PORT || 8000;

// app.listen(PORT, console.log(`Server started on port ${PORT}`));

// // console.log("Selected seats inserted into MySQL database!");
// // res.send("Selected seats inserted into MySQL database!");

const express = require("express");
const mysql = require("mysql2");

const app = express();
const bodyParser = require("body-parser");

// ...

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use;

// create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sly@123456",
  database: "movie_seat_booking",
});

// connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// handle the POST request to insert selectedSeats data
app.post("/insert-selected-seats", (req, res) => {
  console.log(req.body);
  const selectedSeats = req.body.selectedSeats;
  const sql = "INSERT INTO seats (Seat_No) VALUES ?";
  const values = selectedSeats.map((seatNumber) => [seatNumber]);

  connection.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Error inserting selectedSeats into MySQL: ", err);
      return res.status(500).send("Error inserting selectedSeats into MySQL");
    }
    console.log("Selected seats inserted into MySQL!");
    return res.status(200).send("Selected seats inserted into MySQL");
  });
});

// start the server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
