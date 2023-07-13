import NavBar from './NavBar'

function Home(props) {
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className='home-container'>
      <NavBar />
      <main>
        <h2>{props.currentCity}</h2>
        <p>{dateBuilder(new Date())}</p>
      </main>
    </div>
  )
}

export default Home