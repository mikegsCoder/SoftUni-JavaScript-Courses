import './App.css'

import { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import * as gameService from './services/gameService'
import { AuthContext } from './contexts/AuthContext'
import { GameContext } from './contexts/GameContext'

import Header from './components/Header/Header';

function App() {
    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div id="box">
                <Header />
                <GameContext.Provider value={{ games, gameAdd, gameEdit }}>
                    <main id="main-content">
                        
                    </main>
                </GameContext.Provider>
            </div>
        </AuthContext.Provider>
    )
}

export default App
