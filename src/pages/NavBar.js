import { NavLink } from 'react-router-dom'
import './pages.css'


function NavBar() {
  return (
    <nav className='nav-bar'>
      <h1 className='nav-title'>ClearSkies</h1>
      <NavLink className='home-button' to='/' >Home</NavLink>
      <NavLink className='hourly-button' to='/hourlyforecast'>Hourly Forecast</NavLink>
      <NavLink className='daily-button' to='/dailyforecast'>Daily Forecast</NavLink>

    </nav>
  )
}


export default NavBar