import './App.css'

import { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import * as gameService from './services/gameService'
import { AuthContext } from './contexts/AuthContext'
import { GameContext } from './contexts/GameContext'

import Header from './components/Header/Header';

function App() {
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();

    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({});
    };

    const addComment = (gameId, comment) => {
        setGames(state => {
            const game = state.find(x => x._id == gameId);

            const comments = game.comments || [];
            comments.push(comment)

            return [
                ...state.filter(x => x._id !== gameId),
                { ...game, comments },
            ];
        });
    };

    const gameAdd = (gameData) => {
        setGames(state => [
            ...state,
            gameData,
        ]);

        navigate('/catalog');
    };

    const gameEdit = (gameId, gameData) => {
        setGames(state => state.map(x => x._id === gameId ? gameData : x));
    }

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div id="box">
                <Header />
                <GameContext.Provider value={{ games, gameAdd, gameEdit }}>
                    <main id="main-content">
                        <Routes>
                            
                        </Routes>
                    </main>
                </GameContext.Provider>
            </div>
        </AuthContext.Provider>
    )
}

export default App
