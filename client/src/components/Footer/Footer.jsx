import './Footer.css'
import logo from '/Users/ryanarafeh/Desktop/Projects/Shift/client/src/assets/shift-logo.png';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="footer-content">
                <div className="site-map">
                    <h4>Site Map</h4>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className="social-links">
                    <h4>Connect</h4>
                    <a href="https://www.facebook.com/yourpage">Facebook</a>
                    <a href="https://www.twitter.com/yourhandle">Twitter</a>
                    <a href="https://www.instagram.com/yourhandle">Instagram</a>
                </div>
            </div>
        </footer>
    );
};