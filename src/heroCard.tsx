import { useState, useEffect } from "react";
import Loading from "./loading";
import "./HeroCard.css";
import AnemoIcon from "./assets/element images/Anemo.png";
import HydroIcon from "./assets/element images/Hydro.png";
import GeoIcon from "./assets/element images/Geo.png";
import PyroIcon from "./assets/element images/Pyro.png";
import CryoIcon from "./assets/element images/Cryo.png";
import ElectroIcon from "./assets/element images/Electro.png";
import DendroIcon from "./assets/element images/Dendro.png";

interface CharacterData {
  name: string;
  affiliation: string;
  title: string;
  birthday: string;
  elementText: string;
  images: {
    cover1: string;
    cover2: string;
    icon: string;
    cover: string;
  };
  rarity: number;
  region: string;
  version: string;
  weaponText: string;
}

const elementalIcons: Record<string, string> = {
  Pyro: PyroIcon,
  Hydro: HydroIcon,
  Geo: GeoIcon,
  Anemo: AnemoIcon,
  Cryo: CryoIcon,
  Electro: ElectroIcon,
  Dendro: DendroIcon,
};

const getShadowColor = (element: string): string => {
  switch (element) {
    case "Pyro":
      return "rgba(255, 69, 0, 0.7)";
    case "Hydro":
      return "rgba(0, 191, 255, 0.7)";
    case "Anemo":
      return "rgba(144, 238, 144, 0.7)";
    case "Electro":
      return "rgba(138, 43, 226, 0.7)";
    case "Dendro":
      return "rgba(34, 139, 34, 0.7)";
    case "Geo":
      return "rgba(218, 165, 32, 0.7)";
    case "Cryo":
      return "rgba(135, 206, 235, 0.7)";
    default:
      return "rgba(0, 0, 0, 0.7)";
  }
};

interface HeroCardProps {
  selectedHero: string;
}

function HeroCard({ selectedHero }: HeroCardProps) {
  const [data, setData] = useState<CharacterData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedHero) {
      setLoading(true);
      fetch(
        `https://genshin-db-api.vercel.app/api/v5/characters?query=${selectedHero}`
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
    ? getShadowColor(data.elementText)
    : "rgba(0, 0, 0, 0.7)";

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="hero-card">
      {data && (
        <>
          <div className="image-card">
            {data.images && data.images.cover2 ? (
              <img
                className="hero-image"
                src={data.images.cover2}
                alt={`${data.name}`}
                style={{ filter: `drop-shadow(10px 10px 10px ${shadowColor})` }}
              />
            ) : (
              <div className="no-image">Image not available yet</div>
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
  );
}

export default HeroCard;
