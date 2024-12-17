import { useState, useContext } from 'react';
import './signin.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contests/auth';

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loadingAuth } = useContext(AuthContext);
    
    function handleSignin(e) {
        e.preventDefault();

        if (email !== '' && password !== ''){
            signIn(email, password);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSignin(e); 
        }
    };


    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt="Logo oficial OPR" />
                </div>

                <form onSubmit={handleSignin}>
                    <h1>Entrar</h1>
                    <input type="text"
                        placeholder="email@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <input type="password"
                        placeholder="*************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyPress} />

                    <button type="submit"> { loadingAuth ? "Carregando..."  : "Acessar" } </button>
                </form>


                <Link to="/register">Criar uma conta</Link>

            </div>
        </div>
    )
}