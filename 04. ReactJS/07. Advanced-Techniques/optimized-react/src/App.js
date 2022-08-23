import './App.css';
import { useEffect, useState } from "react";

function App() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
      fetch('https://swapi.dev/api/people')
        .then(res => res.json())
        .then(result => {
          setCharacters(result.results);
        })
    }, []);
    
  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
