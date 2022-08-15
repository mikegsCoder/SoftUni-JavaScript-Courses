import './App.css';

import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

function App() {
    return (
        <div>
            <Header />

            <main className="main">
                <section className="card users-container">

                </section>
            </main>

            <Footer />
        </div>
    );
}

export default App;
