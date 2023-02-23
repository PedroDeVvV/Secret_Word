//CSS
import "./App.css";

//React
import { useCallback, useEffect, useState } from "react";

//Date - words
import { wordsList } from "./data/words";

//Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import End from "./components/End";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWorld] = useState("");
  const [pickedCategory, setPictureCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(4);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    //Essa função vai selecionar uma categoria aleatória
    const categories = Object.keys(words); //no arquivo js, as categorias são as keys
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //Pegando uma palavra aleatoria
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  };

  //Função para mudar a tela para start
  const startGame = () => {
    //pick word and pick category
    const { category, word } = pickWordAndCategory(); // quando o jogo é iniciado, as palavras retornadas da função pickwordandcategory são requisitadas

    //Transformar a palavra em letras
    let wordLetters = word.split(""); //separando
    wordLetters = wordLetters.map((l) => l.toLowerCase()); //tranformando todas em minusculas

    //fill state
    setPickedWorld(word);
    setPictureCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  //Processando a letra do input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    //verificar se a letra já foi usada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //validar letra ou usuario perde uma chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
    }
  };

  //Recomeçar o jogo
  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}{" "}
      {/*função passada como prop*/}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <End retry={retry} />}
    </div>
  );
}

export default App;
