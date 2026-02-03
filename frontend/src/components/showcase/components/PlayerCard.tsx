import type { Player, ImgMap } from "../types/showcase";

import background from "../../../assets/showcase/playercard/sixthstreet.jpg";
import pfps from "../../../../../backend/.enka_py/assets/zzz/pfps.json";

import placeholder from "../../../assets/icon.jpg";

interface Props {
  p: Player;
}

const typedImgs = pfps as ImgMap;

function PlayerCard({ p }: Props) {
  const pfpLink = typedImgs[String(p.avatar_id)].Icon;

  return (
    <div className="player-card">
      <div className="bg">
        <img src={background}></img>
      </div>

      <div className="card">
        <div className="namecard">
          <img src={`${p.namecard_icon ? p.namecard_icon : placeholder}`}></img>
        </div>

        <div className="content">
          <div className="icon">
            <img src={`https://enka.network${pfpLink}`}></img>
          </div>

          <div className="stats">
            <div className="name">
              <span>{p.name}</span>
            </div>
            <div className="lvl">
              <span>Lv. {p.level}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
