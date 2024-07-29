// types.ts

import AnemoIcon from "./assets/element images/Anemo.png";
import HydroIcon from "./assets/element images/Hydro.png";
import GeoIcon from "./assets/element images/Geo.png";
import PyroIcon from "./assets/element images/Pyro.png";
import CryoIcon from "./assets/element images/Cryo.png";
import ElectroIcon from "./assets/element images/Electro.png";
import DendroIcon from "./assets/element images/Dendro.png";

export interface CharacterData {
  name: string;
  affiliation: string;
  title: string;
  birthday: string;
  elementText: string;
  elementType: string;
  id: number;
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

export const getElementColor = (element: string): string => {
  switch (element) {
    case "Pyro":
      return "rgba(255, 69, 0, 1)";
    case "Hydro":
      return "rgba(0, 191, 255, 1)";
    case "Anemo":
      return "rgba(144, 238, 144, 1)";
    case "Electro":
      return "rgba(138, 43, 226, 1)";
    case "Dendro":
      return "rgba(34, 139, 34, 1)";
    case "Geo":
      return "rgba(218, 165, 32, 1)";
    case "Cryo":
      return "rgba(135, 206, 235, 1)";
    default:
      return "rgba(0, 0, 0, 1)";
  }
};

export const elementalIcons: Record<string, string> = {
  Pyro: PyroIcon,
  Hydro: HydroIcon,
  Geo: GeoIcon,
  Anemo: AnemoIcon,
  Cryo: CryoIcon,
  Electro: ElectroIcon,
  Dendro: DendroIcon,
};
