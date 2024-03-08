import './Login.css';
import logo from '../../assets/shift-logo.png'


export default function Login() {
    return (
        <>
            <head>
                <title>Signup 1</title>
                <link rel="stylesheet" href="styles.css" />
            </head>
            <body>
                <div class="background"></div>
                <div class="card">
                    <img class="logo" src={logo} alt='logo' />
                    <h2>Create Account</h2>
                    <form class="form">
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">SIGN UP</button>
                    </form>
                    <footer>
                        Existing users, sign in
                        <a href="#/">here</a>
                    </footer>
                </div>
            </body>
        </>
    )
}
