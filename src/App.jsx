import { useState, useEffect } from "react";
import "./App.css";
import pokeNames from "./pokeData.js";
import Card from "./components/Card.jsx";

function App() {
  const [scores, setScores] = useState({ score: 0, highScore: 0 });
  const [newGame, setNewGame] = useState(false);
  const [images, setImages] = useState([]);

  const shuffled = images.sort(() => Math.random() - 0.5);

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

  function incrementScore() {
    const newScore = scores.score + 1;
    const highScore = scores.highScore;
    const newHighScore = newScore > highScore ? newScore : highScore;
    setScores({ score: newScore, highScore: newHighScore });
  }

  function resetGame() {
    setNewGame(true);
    setScores({ ...scores, score: 0 });
  }

  return (
    <>
      <header>
        <h1>Poke Card</h1>
        <div className="points">
          <p>
            Score<span>{scores.score}</span>
          </p>
          <p>
            High Score<span>{scores.highScore}</span>
          </p>
        </div>
      </header>
      {newGame && (
        <button className="play-button" onClick={() => setNewGame(false)}>
          Play!
        </button>
      )}
      <main className="card-container">
        {!newGame &&
          shuffled.map((image) => (
            <Card
              key={image.id}
              url={image.imageURL}
              resetGame={resetGame}
              incrementScore={incrementScore}
            />
          ))}
      </main>
    </>
  );
}

export default App;
