import "./Hero.css";
import heroImg from "../../assets/header/ellenwall.jpg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function sendUid(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      console.log(`submitting ${text} to the server`);
      const res = await fetch("http://127.0.0.1:8000/valid_uid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: text }),
      });

      if (!res.ok) {
        setError("invalid UID");
        return;
      }

      navigate(`/showcase/${text}`);
    } catch (err) {
      console.log(err);
      setError("server error, try again");
    }
  }

  return (
    <div className="hero">
      <div className="bg">
        <img src={heroImg}></img>
      </div>

      <div className="content">
        <div className="header">
          <h1>zzz character showcase</h1>
        </div>
        <div className="info">displays your character builds in zzz</div>

        <div className="uid">
          <form onSubmit={sendUid}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="enter uid.."
            />
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Hero;
