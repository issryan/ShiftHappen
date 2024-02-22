import Nav from '/Users/ryanarafeh/Desktop/Projects/Shift/client/src/components/Nav/Nav.jsx'
import './Home.css'
import Footer from '../../components/Footer/Footer';


export default function Home() {
    return (
        <>
            <Nav />
            <header id='home'>
                <section id="profile">
                    <div className="section__text">
                        <h1 className="title">Employee Time Management</h1>
                        <p className="section__text__p2">Streamline your team's schedule with ease. Our intuitive platform lets managers coordinate monthly shifts according to everyone's availability.</p>
                        <div className="btn-container">
                            <a href="#get-started" class="cta-button">Get Started</a>
                        </div>
                        <div class="hero-content">
                        </div>
                    </div>
                    <div className="section__pic-container">
                        <img src={''} alt="Avatar" />
                    </div>
                </section>
            </header>
            <Footer/>
        </>
    )
}