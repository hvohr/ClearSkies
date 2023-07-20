import { NavLink } from 'react-router-dom'
import './pages.css'


function NavBar() {
  return (
    <nav className='nav-bar'>
      <div className='conditional-container'>
      <h1 className='nav-title'>ClearSkies</h1>
      <p className='conditional'>( Only Available for US States )</p>
      </div>
      <NavLink className='home-button' to='/' >Home</NavLink>
      <NavLink className='daily-button' to='/dailyforecast'>Daily Forecast</NavLink>
    </nav>
  )
}


export default NavBar