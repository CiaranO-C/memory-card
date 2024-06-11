import { useState } from "react";

export default function Card({ url, resetGame, incrementScore }) {
  const [clicked, setClicked] = useState(false);

  function toggleClicked() {
    if (clicked) {
      resetGame();
    } else {
      incrementScore();
      setClicked(!clicked);
    }
  }

  return (
    <button className="card" onClick={toggleClicked}>
      <img src={url} />
    </button>
  );
}
