import { useState, useEffect } from "react";
import HeroCard from "./HeroCard";
import HeroList from "./HeroList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CharacterData } from "./types";
import Loading from "./loading";

const HEROES_STORAGE_KEY = "heroesData";
const HEROES_EXPIRATION_KEY = "heroesExpiration";
const EXPIRATION_TIME_MS = 10 * 60 * 1000;

function App() {
  const [heroes, setHeroes] = useState<CharacterData[]>([]);
  const [selectedHero, setSelectedHero] = useState<string>("Sigewinne");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const heroesWithImages: CharacterData[] = await Promise.all(
          data.map(async (hero: string) => {
            const heroResponse = await fetch(
              `https://genshin-db-api.vercel.app/api/v5/characters?query=${hero}&matchCategories=true`
            );
            if (!heroResponse.ok) {
              throw new Error("Network response was not ok");
            }
            const heroData = await heroResponse.json();
            return {
              name: heroData.name,
              images: {
                cover1: heroData.images.cover1,
                cover2: heroData.images.cover2,
              },
              elementType: heroData.elementType,
              elementText: heroData.elementText,
            };
          })
        );
        setHeroes(heroesWithImages);
        localStorage.setItem(
          HEROES_STORAGE_KEY,
          JSON.stringify(heroesWithImages)
        );
        localStorage.setItem(
          HEROES_EXPIRATION_KEY,
          JSON.stringify(Date.now() + EXPIRATION_TIME_MS)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const storedHeroes = localStorage.getItem(HEROES_STORAGE_KEY);
    const storedExpiration = localStorage.getItem(HEROES_EXPIRATION_KEY);
    const isExpired = storedExpiration
      ? Date.now() > JSON.parse(storedExpiration)
      : true;

    if (storedHeroes && !isExpired) {
      setHeroes(JSON.parse(storedHeroes));
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HeroList heroes={heroes} setSelectedHero={setSelectedHero} />
          }
        />
        <Route
          path="/hero/:name"
          element={<HeroCard selectedHero={selectedHero} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
