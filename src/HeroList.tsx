import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeroList.css";
import { CharacterData } from "./types";
import { useState } from "react";
import { elementalIcons } from "./types";
import { getElementColor } from "./types";

interface HeroListProps {
  heroes: CharacterData[];
  setSelectedHero: (name: string) => void;
}

const HeroList: React.FC<HeroListProps> = ({ heroes, setSelectedHero }) => {
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("searchQuery") || "";
  });

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  const normalizeString = (str: string) => {
    return str.trim().replace(/\s+/g, " ").toLowerCase();
  };

  const filteredHeroes = heroes.filter(
    (hero) =>
      (hero.name &&
        normalizeString(hero.name).includes(normalizeString(searchQuery))) ||
      normalizeString(hero.elementText).includes(normalizeString(searchQuery))
  );
  console.log(heroes);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const elementX = rect.left + rect.width / 2;
    const elementY = rect.top + rect.height / 2;
    const angleX = (event.clientY - elementY) / 20;
    const angleY = -(event.clientX - elementX) / 20;
    element.style.color = "red";
    element.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    element.style.transform = `rotateX(0) rotateY(0)`;
    element.style.backgroundColor = "inherit";
  };

  return (
    // <div className="hero-list-page">
    <>
      <div className="hero-list-header">
        <input
          type="text"
          className="hero-search-bar"
          placeholder="Search heroes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="hero-list">
        {filteredHeroes.length === 0 ? (
          <div className="no-heroes-message">Oops, no heroes detected</div>
        ) : (
          filteredHeroes.map((hero, index) => {
            if (!hero.images.cover1) return null;

            return (
              <div
                key={hero.id || hero.name}
                className="hero-list-item"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  className="hero-list-item-link"
                  to={`/hero/${hero.name}`}
                  onClick={() => setSelectedHero(hero.name)}
                >
                  <div className="hero-list-image-box">
                    <img
                      src={hero.images.cover1}
                      alt={hero.name}
                      className="hero-list-image hero-list-image-default"
                    />
                    <img
                      src={hero.images.cover2}
                      alt={hero.name}
                      className="hero-list-image hero-list-image-hover"
                    />
                  </div>
                  <div
                    className="hero-list-name"
                    style={{ color: `${getElementColor(hero.elementText)}` }}
                  >
                    {hero.name}{" "}
                    <img
                      src={elementalIcons[hero.elementText]}
                      alt={hero.elementText}
                      style={{
                        width: "20px",
                        height: "24px",
                        marginLeft: "5px",
                      }}
                    />
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
    // </div>
  );
};

export default HeroList;
