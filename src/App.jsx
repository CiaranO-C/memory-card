import { useState, useEffect } from "react";
import "./App.css";
import pokeNames from "./pokeData.js";

function App() {
  const [scores, setScores] = useState({ score: 0, highScore: 0 });
  const [newGame, setNewGame] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getPokemon();
  }, []);

  async function getPokemon() {
    const response = await Promise.all(
      pokeNames.map((name) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
          mode: "cors",
        }).then(res => res.json()),
      ),
    );
   console.log(response)
    setImages(response.map((res) => res.sprites.other["official-artwork"].front_default));
  }

  return (
    <>
      {images.map((url, index) => (
        <img key={index} src={url} />
      ))}
    </>
  );
}

export default App;
