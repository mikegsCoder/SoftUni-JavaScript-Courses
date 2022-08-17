import './App.css'

import { Routes, Route, Navigate } from 'react-router-dom'

import Navigation from './components/Navigation'
import Home from './components/Home'
import About from './components/About'
import Pricing from './components/Pricing'

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
                
            </Routes>
        </div>
    )
}

export default App
