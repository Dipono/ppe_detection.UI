import '../styles/Header.css';
import logo from '../assets/logo-black.png';
import { Link, useNavigate } from 'react-router-dom';
function Header() {
    const navigate =useNavigate();
    return (<div id="header">
        <div className='logo'>
            <img src={logo} alt='logo' />
            <h3>Monitor Safety Compliance</h3>
        </div>
        <div className='nav-bar'>
            <h3 ><Link to='/records' >History</Link></h3>
            <h3>Help</h3>
        </div>


    </div>)
}
export default Header;