import { HeroSection } from './components/HeroSection'
import { About } from './components/About'
import { Service } from './components/Service'
import { Portfolio } from './components/Portfolio'
import { News } from './components/News'

function App() {
    return (
        <div>
            <HeroSection />
            <About />
            <Service />
            <Portfolio />
            <News />
        </div>
    )
}

export default App
