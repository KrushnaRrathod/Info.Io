import { Login, Register } from "./components/(auth)"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Main from "./components/(root)/main/Main.jsx"
import Profile from "./components/(root)/profile/Profile.jsx"
import YourStory from "./components/(root)/your-stroy/YourStory.jsx"

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/your-story" element={<YourStory/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App