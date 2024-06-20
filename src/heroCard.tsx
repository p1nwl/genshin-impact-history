import { useState, useEffect } from "react";
import Loading from "./loading";
import "./HeroCard.css";
import AnemoIcon from "../public/Anemo.png";
import HydroIcon from "../public/Hydro.png";
import GeoIcon from "../public/Geo.png";
import PyroIcon from "../public/Pyro.png";
import CryoIcon from "../public/Cryo.png";
import ElectroIcon from "../public/Electro.png";
import DendroIcon from "../public/Dendro.png";

interface CharacterData {
  name: string;
  affiliation: string;
  birthday: string;
  elementText: string;
  images: {
    cover1: string;
    icon: string;
    cover: string;
  };
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

function HeroCard() {
  const [data, setData] = useState<CharacterData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://genshin-db-api.vercel.app/api/v5/characters?query=baizhu")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not okay");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  console.log(data);

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
          <img
            className="hero-image"
            src={data.images.cover1}
            alt={`${data.name}`}
          />
          <div className="hero-details">
            <h1>{data.name}</h1>
            <h2>{data.affiliation}</h2>
            <h3>{"Birthday: " + data.birthday}</h3>
            <h3>
              Element:{" " + data.elementText}
              <img
                src={elementalIcons[data.elementText]}
                alt={data.elementText}
                style={{ width: "20px", height: "24px", marginLeft: "5px" }}
              />
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default HeroCard;
