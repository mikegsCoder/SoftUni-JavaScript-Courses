import './App.css'

import { Routes, Route, Navigate } from 'react-router-dom'

import Navigation from './components/Navigation'
import Home from './components/Home'
import About from './components/About'
import Pricing from './components/Pricing'
import Contacts from './components/Contacts'
import StarshipList from './components/StarshipList';

function App() {
    return (
        <div className="App">
            <h1>Hello React Router</h1>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing/*" element={<Pricing />} />
                <Route path="/pricing/premium" element={<h2>Premium Pricing</h2>} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/starships" element={<StarshipList />} />

            </Routes>
        </div>
    )
}

export default App
