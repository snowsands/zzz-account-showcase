/*
import core1 from "../../../assets/showcase/svgs/coreskills/core1.svg";
import core2 from "../../../assets/showcase/svgs/coreskills/core2.svg";
import core3 from "../../../assets/showcase/svgs/coreskills/core3.svg";
import core4 from "../../../assets/showcase/svgs/coreskills/core4.svg";
import core5 from "../../../assets/showcase/svgs/coreskills/core5.svg";
import core6 from "../../../assets/showcase/svgs/coreskills/core6.svg";
*/

import core1 from '../components/coreskills/Core1';
import core2 from '../components/coreskills/Core2';
import core3 from '../components/coreskills/Core3';
import core4 from '../components/coreskills/Core4';
import core5 from '../components/coreskills/Core5';
import core6 from '../components/coreskills/Core6';



import placeholder from '../../../assets/icon.jpg';

import hpImg from '../../../assets/showcase/svgs/stats/HP.svg';
import defImg from '../../../assets/showcase/svgs/stats/DEF.svg';
import atkImg from '../../../assets/showcase/svgs/stats/ATK.svg';
import penImg from '../../../assets/showcase/svgs/stats/PEN.svg';
import penRatioImg from '../../../assets/showcase/svgs/stats/PEN_Ratio.svg';
import cdImg from '../../../assets/showcase/svgs/stats/CRIT_DMG.svg';
import crImg from '../../../assets/showcase/svgs/stats/CRIT_Rate.svg';
import apImg from '../../../assets/showcase/svgs/stats/Anomaly_Proficiency.svg';
import amImg from '../../../assets/showcase/svgs/stats/Anomaly_Mastery.svg';
import pbImg from '../../../assets/showcase/svgs/stats/physical_dmg_bonus.svg';
import ibImg from '../../../assets/showcase/svgs/stats/Ice_DMG_Bonus.svg';
import fbImg from '../../../assets/showcase/svgs/stats/Fire_DMG_Bonus.svg';
import ebImg from '../../../assets/showcase/svgs/stats/ether_dmg_bonus.svg';
import elImg from '../../../assets/showcase/svgs/stats/electric_dmg_bonus.svg';
import imImg from '../../../assets/showcase/svgs/stats/Impact.svg';


type ShowcaseResponse = {
  player: Player;
  agents: Agent[];
}

type Player = {
  name: string;
  uid: number;
  avatar_id: number;
  namecard_id: number;
  namecard_icon: number;
  signature: string;
  level: number;
}

type Agent = {
  name: string;
  rarity: string;
  color_accent: string;
  color_mindscape: string;
  level: number;
  promotion: number;
  mindscape: number;
  element: string;
  stats: Stat[];
  core_skill_lvl: number;
  skills: Skill[];
  discs: Disc[];
  wengine: WengineStats;
}

type Disc = {
  slot: number;
  set_id: number;
  set_icon: string;
  id: number;
  uid: number;
  level: number;
  substats: SubStat[]
}

type Stat = {
  name: string;
  value: number;
}

type SubStat = {
  sub_stat: string;
  sub_stat_value: number;
}

type Skill = {
  skill_type: string;
  skill_lvl: number;
}

type WengineStats = {
  name: string;
  id: number;
  uid: number;
  level: number;
  specialty: string;
  icon: string;
  modification: number;
  phase: number;
  rarity: number;
  main_stat: {
    name: string;
    value: number;
  };
  sub_stat: {
    name: string;
    value: number;
  };
}

type ImgMap = {
  [key: string]: {
    Icon: string;
  };
}

export const statDisplay = [
  { label: "HP", index: 0 },
  { label: "ATK", index: 1 },
  { label: "DEF", index: 2 },
  { label: "IMPACT", index: 3 },
  {
    label: "CRIT RATE",
    index: 4,
    format: (v: number) => (v / 100).toFixed(1) + "%",
  },
  {
    label: "CRIT DMG",
    index: 5,
    format: (v: number) => (v / 100).toFixed(1) + "%",
  },
  {
    label: "PEN RATIO",
    index: 6,
    format: (v: number) => (v / 100).toFixed(1) + "%",
  },
  { label: "PEN", index: 7 },
  { label: "ENERGY REGEN", index: 8 },
  { label: "AM", index: 11 },
  { label: "AP", index: 12 },
];

export const discStatsDisplay = {
  'crit rate': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: crImg
  },
  'crit dmg': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: cdImg
  },
  'percent hp': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: hpImg
  },
  'percent atk': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: atkImg
  },
  'percent def': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: defImg
  },
  'pen ratio': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: penRatioImg
  },
  'energy regen': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: placeholder
  },
  'ice dmg bonus': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: ibImg
  },
  'fire dmg bonus': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: fbImg
  },
  'physical dmg bonus': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: pbImg
  },
  'ether dmg bonus': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: ebImg
  },
  'electric dmg bonus': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: elImg
  },
  'anomaly mastery': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: amImg
  },
  'anomaly proficiency': {
    format: (v: number) => v,
    img: apImg
  },
  'hp': {
    format: (v: number) => v,
    img: hpImg
  },
  'atk': {
    format: (v: number) => v,
    img: atkImg
  },
  'def': {
    format: (v: number) => v,
    img: defImg
  },
  'pen': {
    format: (v: number) => v,
    img: penImg
  },
  'base atk': {
    format: (v: number) => v,
    img: atkImg
  },
  'impact': {
    format: (v: number) => (v / 100).toFixed(1) + "%",
    img: imImg
  }
}

export const skillImages = [
  'https://enka.network/ui/zzz/IconRoleSkillKeyNormal.png',
  'https://enka.network/ui/zzz/IconRoleSkillKeySpecialV2.png',
  'https://enka.network/ui/zzz/IconRoleSkillKeyEvade.png',
  'https://enka.network/ui/zzz/IconRoleSkillKeyUltimateV2.png',
  'https://enka.network/ui/zzz/IconRoleSkillKeySwitch.png', 
];
 

export const coreSkillImages = [
  core1, core2, core3, core4, core5, core6
];

export const elementTypes = {
  Fire: 'Fire',
  Ice: 'Ice',
  Physics: 'Physical',
  Ether: 'Ether',
  Elec: 'Electric',

  AuricEther: 'Ether',
  FireFrost: 'Ice',
  ZhenZhenAssault: 'Physical',
}

export const elementIndex = {
  Physics: 13,
  Fire: 14,
  Ice: 15,
  Elec: 16,
  Ether: 17,

  FireFrost: 15,
  AuricEther: 17,
  ZhenZhenAssault: 13
}

export type { ShowcaseResponse, Player, Agent, ImgMap, Skill };
export type StatName = keyof typeof discStatsDisplay;
export type ElementName = keyof typeof elementIndex | keyof typeof elementTypes;