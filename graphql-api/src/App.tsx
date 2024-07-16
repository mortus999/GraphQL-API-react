import { BrowserRouter, Routes, Route } from "react-router-dom"
import CharactersPage from "./components/characters"
import CharacterPage from "./components/characterPage"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharactersPage />}/>
          <Route path="/:id" element={<CharacterPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App