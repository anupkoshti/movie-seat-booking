import { Fragment, useState } from "react";
import "./App.css";

function App() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSelectSeatHandler = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const isSelected = (seatNumber) => selectedSeats.includes(seatNumber);
  // console.log(selectedSeats)

  const bookSeatsHandler = () => {
    // Send selectedSeats as a JSON object to the server
    fetch("/insert-selected-seats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedSeats }),
    }).then((response) => {
      if (response.ok) {
        console.log("Selected seats have been booked!");
        setSelectedSeats([]);
      } else {
        console.log("Error occurred while booking seats!");
      }
    });
  };

  return (
    <Fragment>
      <div className="movie-container">
        <label> Select a movie:</label>
        <select id="movie" onChange={() => setSelectedSeats([])}>
          <option value="220">Godzilla vs Kong (RS.220)</option>
          <option value="320">Radhe (RS.320)</option>
          <option value="250">RRR (RS.250)</option>
          <option value="260">F9 (RS.260)</option>
        </select>
      </div>

      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>Available</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat sold"></div>
          <small>Sold</small>
        </li>
      </ul>

      <div className="container">
        <div className="screen"></div>

        <div className="row">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              onClick={() => toggleSelectSeatHandler(i + 1)}
              className={isSelected(i + 1) ? "selected" : "seat"}
              style={{ backgroundColor: isSelected(i + 1) ? "green" : "" }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="">
          <button
            onClick={() =>
              setSelectedSeats(Array.from({ length: 10 }, (_, i) => i + 1))
            }
          >
            All
          </button>
          <button onClick={() => setSelectedSeats([])}>None</button>
          <button onClick={bookSeatsHandler}>Book</button>
          {selectedSeats.length > 0 && (
            <div className="selected-seats">
              <p>Selected Seats:</p>
              <div className="row">
                {selectedSeats.map((seatNumber) => (
                  <span key={seatNumber} className="seat">
                    {seatNumber}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
