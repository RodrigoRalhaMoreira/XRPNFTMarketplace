import './App.css';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createContext, useState } from 'react';
import Navbar from './components/Navbar';

export const ThemeContext = createContext(null); 

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme( (curr) => (curr === "light" ? "dark" : "light") );
  }

  return (
    <ThemeContext.Provider value={ { theme, toggleTheme } }>
      <div className='App' id={theme} style={{"minHeight":"100vh"}}>
        <BrowserRouter>
          <Navbar theme={theme} toggleTheme={toggleTheme}/>
          <Routes>
            <Route path="/" element={<Marketplace theme={theme} toggleTheme={toggleTheme}/>}/>
            <Route path="/nftPage/:tokenId" element={<NFTPage theme={theme} toggleTheme={toggleTheme}/>}/>        
            <Route path="/profile" element={<Profile theme={theme} toggleTheme={toggleTheme}/>}/>
            <Route path="/sellNFT" element={<SellNFT theme={theme} toggleTheme={toggleTheme}/>}/>             
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
