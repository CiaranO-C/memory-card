import { useState, useEffect } from "react";
import "./App.css";
import pokeNames from "./pokeData.js";
import Card from "./components/Card.jsx";

function App() {
  const [scores, setScores] = useState({ score: 0, highScore: 0 });
  const [newGame, setNewGame] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getPokemon();
  }, []);

  async function getPokemon() {
    let pokeArray;
    if (!localStorage.length) {
      console.log("fetching");
      const response = await Promise.all(
        pokeNames.map((name) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
            mode: "cors",
          }).then((res) => res.json()),
        ),
      );
      pokeArray = response.map((res) => {
        return {
          id: res.species.name,
          imageURL: res.sprites.other["official-artwork"].front_default,
        };
      });
      localStorage.setItem("pokeArray", JSON.stringify(pokeArray));
    } else {
      console.log("retrieving");
      const pokeArrayJSON = localStorage.getItem("pokeArray");
      pokeArray = await JSON.parse(pokeArrayJSON);
    }
    setImages(pokeArray);
  }

  return (
    <>
      <header>
        <h1>Poke Card</h1>
      </header>
      <main className="card-container">
        {images.map((image) => (
          <Card key={image.id} url={image.imageURL} />
        ))}
      </main>
    </>
  );
}

export default App;
