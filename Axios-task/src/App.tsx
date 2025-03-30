import Spells from "./components/pages/SpellsFetch";
import Entrance from "./components/pages/Entrance";
import HPcharactersTable from "./components/pages/TanStackTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/HpCharacters" element={<HPcharactersTable />} />
        <Route path="/Spells" element={<Spells />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
