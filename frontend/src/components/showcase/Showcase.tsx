import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AgentCard from "./components/AgentCard.tsx";
import PlayerCard from "./components/PlayerCard.tsx";

import type { ShowcaseResponse } from "./types/showcase.ts";
import { AgentImgs } from "./types/AgentImgs.ts";
import type { AgentName } from "./types/AgentImgs.ts";

import placeholder from "../../assets/icon.jpg";

import "./Showcase.css";

function Showcase() {
  const { uid } = useParams();
  const [data, setData] = useState<ShowcaseResponse>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!uid) return;

    async function getShowcase() {
      try {
        const res = await fetch("http://127.0.0.1:8000/get_showcase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid: uid }),
        });

        if (!res.ok) {
          throw new Error("invalid uid");
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    }
    getShowcase();
  }, [uid]);

  if (!data) return <div>Loading</div>;

  const activeAgent = data.agents[activeIndex] ?? data.agents[0];

  return (
    <div className="showcase">
      <PlayerCard p={data.player} />

      <div className="agents">
        <div className="thumbnail">
          {data.agents.map((agent, index) => (
            <div
              key={agent.name}
              className={`item ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <img src={getThumbnail(agent.name)}></img>
              <div className="content">{agent.name}</div>
            </div>
          ))}
        </div>

        <div className="agent-list">
          <AgentCard a={activeAgent} />
        </div>
      </div>
    </div>
  );
}

function getThumbnail(name: string) {
  const key = name.toLowerCase().replaceAll(" ", "") as AgentName;
  return AgentImgs[key] ? AgentImgs[key].thumbnail : placeholder;
}
/*
function getBg(name: string) {
  const key = name.toLowerCase() as AgentName;
  return AgentImgs[key].bg;
}
*/

export default Showcase;
