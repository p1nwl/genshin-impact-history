import { useState, useEffect } from "react";
import HeroCard from "./HeroCard";
import RandomHeroButton from "./RandomHeroButton";

function App() {
  const [heroes, setHeroes] = useState<string[]>([]);
  const [selectedHero, setSelectedHero] = useState<string>("Sigewinne");

  useEffect(() => {
    fetch(
      "https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not okay");
        }
        return response.json();
      })
      .then((data) => setHeroes(data))
      .catch((error) => console.error(error));
  }, []);

  const getRandomHeroName = () => {
    if (heroes.length > 0) {
      const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
      setSelectedHero(randomHero);
    }
  };

  return (
    <div className="app-container">
      <RandomHeroButton onClick={getRandomHeroName} />
      <HeroCard selectedHero={selectedHero} />
    </div>
  );
}

export default App;
