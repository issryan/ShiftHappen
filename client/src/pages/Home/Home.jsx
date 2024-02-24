import Nav from '../../components/Nav/Nav'
import './Home.css'
import clipart from '../../assets/event-planning.webp'
import Footer from '../../components/Footer/Footer';


export default function Home() {
    return (
        <>
            <Nav />
            <header id='home'>
                <section id="profile">
                    <div className="section__text">
                        <h1 className="title">SHIFT HAPPENS</h1>
                        <p className="section__text__p2">Our app makes scheduling a breeze, turning the tedious task of lining up employee shifts into a quick, easy click. Just set your team's availability, hit generate, and watch a perfectly planned month unfold. No fuss, no muss—just more time for what really matters. Let's make scheduling simple together.</p>
                        <div className="btn-container">
                            <a href="/employees" class="cta-button">Get Started</a>
                        </div>
                        <div class="hero-content">
                        </div>
                    </div>
                    <div className="section__pic-container">
                        <img src={clipart} alt="Avatar" />
                    </div>
                </section>
            </header>
        </>
    )
}