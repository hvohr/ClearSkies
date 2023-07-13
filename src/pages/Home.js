import NavBar from './NavBar'

function Home(props) {
  return (
    <div>
      <NavBar />
      <main>
        <h2>{props.currentCity}</h2>
      </main>
    </div>
  )
}

export default Home