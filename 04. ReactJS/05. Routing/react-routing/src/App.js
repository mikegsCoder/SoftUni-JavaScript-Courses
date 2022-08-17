import './App.css'

import { Routes, Route, Navigate } from 'react-router-dom'

import Navigation from './components/Navigation'
import Home from './components/Home'

function App() {
    return (
        <div className="App">
            <h1>Hello React Router</h1>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    )
}

export default App
