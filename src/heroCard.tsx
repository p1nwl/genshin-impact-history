import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./loading";
import BackToHomeButton from "./BackToHomeButton";
import "./HeroCard.css";
import { CharacterData } from "./types";
import { elementalIcons } from "./types";
import { getElementColor } from "./types";

interface HeroCardProps {
  selectedHero: string;
}

function HeroCard({ selectedHero }: HeroCardProps) {
  const { name } = useParams<{ name: string }>();
  const [data, setData] = useState<CharacterData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedHero) {
      setLoading(true);
      fetch(
        `https://genshin-db-api.vercel.app/api/v5/characters?query=${
          name || selectedHero
        }`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not okay");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [selectedHero]);

  const shadowColor = data
    ? getElementColor(data.elementText)
    : "rgba(0, 0, 0, 0.7)";

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    // <div className="hero-card-page">
    <>
      <BackToHomeButton />
      <div className="hero-card">
        {data && (
          <>
            <div className="image-card">
              {data.images && data.images.cover2 ? (
                <img
                  className="hero-image"
                  src={data.images.cover2}
                  alt={`${data.name}`}
                  style={{
                    filter: `drop-shadow(10px 10px 10px ${shadowColor})`,
                  }}
                />
              ) : (
                <div className="no-image">Image is not available yet</div>
              )}
            </div>
            <div className="hero-details">
              <h1>{data.name}</h1>
              <h2>{data.title}</h2>
              <h3>{"Birthday: " + data.birthday}</h3>
              <h3>
                Element: {" " + data.elementText}
                <img
                  src={elementalIcons[data.elementText]}
                  alt={data.elementText}
                  style={{ width: "20px", height: "24px", marginLeft: "5px" }}
                />
              </h3>
              <h3>Weapon: {" " + data.weaponText}</h3>
              <h3>Region: {" " + data.region}</h3>
              <h3>Version: {" " + data.version}</h3>
              <h3>Rarity: {" " + data.rarity + " stars"}</h3>
            </div>
          </>
        )}
      </div>
    </>
    // </div>
  );
}

export default HeroCard;
