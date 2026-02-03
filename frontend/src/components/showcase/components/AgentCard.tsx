import type { Agent } from "../types/showcase";

import { AgentImgs } from "../types/AgentImgs.ts";
import type { AgentName } from "../types/AgentImgs.ts";
import type { StatName, ElementName } from "../types/showcase.ts";

import {
  statDisplay,
  skillImages,
  coreSkillImages,
  discStatsDisplay,
  elementTypes,
} from "../types/showcase.ts";

import placeholder from "../../../assets/icon.jpg";

interface Props {
  a: Agent;
}

function AgentCard({ a }: Props) {
  const w = a.wengine;

  return (
    <div className="agent">
      <div className="bg">
        <img src={getBg(a.name)}></img>
      </div>

      <div className="left-container">
        <div className="stats">
          {statDisplay.map((s) => (
            <div key={s.label} className="stat">
              <span>{s.label}</span>
              <span>
                {s.format
                  ? s.format(a.stats[s.index].value)
                  : a.stats[s.index].value}
              </span>
            </div>
          ))}
          <div className="stat">
            <span>{getElementName(a.element)} DMG Bonus</span>
            <span>{getElementDmg(a.element, a)}</span>
          </div>
        </div>
        <div className="char-info">
          <div className="name">
            <h1>{a.name}</h1>
          </div>
          <div className="level">
            <h2>Lv. {a.level}</h2>
            <p>/60</p>
          </div>
          <div className="mindscape">
            <h3>M{a.mindscape}</h3>
          </div>
        </div>
      </div>

      <div className="mid-container">
        <div className="main-skills">
          {a.skills
            .filter((_, index) => index !== 4)
            .map((s, index) => (
              <div key={`skill${index}`} className="main-skill">
                <img src={skillImages[index]} height="40px" width="40px" />
                <span>{s.skill_lvl}</span>
              </div>
            ))}
        </div>
        <div className="core-skills">
          {coreSkillImages.map((CoreIcon, index) => (
            <div
              key={`core${index}`}
              className="core-skill"
              style={{
                color: index < a.core_skill_lvl ? a.color_mindscape : "white",
              }}
            >
              <CoreIcon />
            </div>
          ))}
        </div>
      </div>

      <div className="right-container">
        <div className="discs">
          {a.discs.map((disc, index) => {
            const [mainStat, ...subStats] = disc.substats;

            return (
              <div key={`disc${index}`} className="disc">
                <div className="set-icon">
                  <img
                    src={`https://enka.network/${disc.set_icon}`}
                    height="80px"
                    width="80px"
                  />
                </div>

                <div className="main-stat">
                  <img
                    src={getStatImg(mainStat.sub_stat)}
                    height="20px"
                    width="20px"
                  />
                  <span>
                    {formatStat(mainStat.sub_stat, mainStat.sub_stat_value)}
                  </span>
                </div>

                <div className="substats">
                  {subStats.map((substat, i) => (
                    <div key={`substat${i}`} className="stat">
                      <img
                        src={getStatImg(substat.sub_stat)}
                        height="20px"
                        width="20px"
                      />
                      <span>
                        {formatStat(substat.sub_stat, substat.sub_stat_value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="wengine">
          <div className="name">
            <span>{w.name}</span>
          </div>

          <div className="grid">
            <div className="w-img">
              <img src={w.icon}></img>
            </div>

            <div className="stats">
              <div className="stat">
                <img
                  src={getStatImg(w.main_stat.name)}
                  height="20px"
                  width="20px"
                ></img>
                <span>{w.main_stat.value}</span>
              </div>
              <div className="stat">
                <img
                  src={getStatImg(w.sub_stat.name)}
                  height="20px"
                  width="20px"
                ></img>
                <span>{formatStat(w.sub_stat.name, w.sub_stat.value)}</span>
              </div>
            </div>

            <div className="level">
              <span>Lv. {w.level}</span>
            </div>

            <div className="refine">
              <span>P{w.phase}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getElementName(name: string) {
  const key = name as ElementName;
  return elementTypes[key];
}

function getElementDmg(name: string, a: Agent) {
  const target = `${getElementName(name)} DMG Bonus`
    .toUpperCase()
    .replaceAll(" ", "_");

  const stat = a.stats.find((s) => s.name === target);

  if (!stat) return "0%";

  return (stat.value / 100).toFixed(1) + "%";
}

function getBg(name: string) {
  const key = name.toLowerCase().replaceAll(" ", "") as AgentName;
  return AgentImgs[key] ? AgentImgs[key].bg : placeholder;
}

function formatStat(name: string | undefined, value: number) {
  if (!name) return value;

  const key = normalizeName(name.trim().toLowerCase()) as StatName;
  const entry = discStatsDisplay[key];
  return entry ? entry.format(value) : value;
}

function getStatImg(name: string) {
  const key = normalizeName(name.trim().toLowerCase()) as StatName;
  return discStatsDisplay[key] ? discStatsDisplay[key].img : placeholder;
}

function normalizeName(name: string): StatName {
  return name
    .normalize("NFKC")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase() as StatName;
}

export default AgentCard;
