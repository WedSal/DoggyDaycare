import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import CatalogPage from './CatalogPage'; 
import DogDetails from './DogDetails';



function App() {
  

  return (
    <Router>
      <div className='app-container'>
      <header className="header">
        <img src="" alt="" className="logo"/>
        <nav className="nav">
          <Link to="/"className='nav-link'>Home</Link>
         <Link to="/catalog"className='nav-link'>Catalog</Link>
          <Link to="/contact"className='nav-link'>Contact Us</Link>
          <Link to="/about"className='nav-link'>About Us</Link>
         <Link to="/social"className='nav-link'>Social Media</Link>
        </nav>
       </header>


         <main className='main-content'>
        <Routes>
         <Route path="/" element={<WelcomePage />} />  
         <Route path="/catalog" element={<CatalogPage />} />
         <Route path="/dog/:id" element={<DogDetails/>} />
        </Routes>
        </main>
      </div>
         </Router>
  );
}

export default App;
