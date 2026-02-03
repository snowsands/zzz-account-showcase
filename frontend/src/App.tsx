import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./components/front/Hero";
import Showcase from "./components/showcase/Showcase";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/showcase/:uid" element={<Showcase />} />
      </Routes>
    </BrowserRouter>
  );
}

// might need to act navigation <nav> later,
export default App;
