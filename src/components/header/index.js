import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contests/auth';
import { FiHome, FiUser, FiSettings, FiBookmark, FiCrosshair } from 'react-icons/fi';
import './header.css';


export default function Header(){
    const {user} = useContext(AuthContext);
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

    useEffect(() => {
        // Só define o avatarUrl quando o user estiver disponível
        if (user && user.avatarUrl) {
            setAvatarUrl(user.avatarUrl);
        } else {
            setAvatarUrl("/images/perfil/fotousuariobase.png"); // URL padrão
        }
    }, [user]); // Reexecuta quando user muda


    return(
        <div className="sidebar">
            <div>
            <img src={avatarUrl || "/images/perfil/fotousuariobase.png"} alt="Foto de perfil" />

            </div>
            
            <Link to="/dashboard">
            <FiHome color="#FFF" size= {24}/>
            Chamados
            </Link>
            <Link to="/customers">
            <FiBookmark color="#FFF" size= {24}/>
            Customers
            </Link>
            <Link to="/profile">
            <FiUser color="#FFF" size= {24}/>
            Profile
            </Link>
            </div>
    )
}