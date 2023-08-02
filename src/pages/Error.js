import NavBar from '../pages/NavBar'


function Error() {
  return (
    <section>
      <NavBar />
      <section className='error-container'>
        <img className='error-icon' alt="small angry cloud showing a 404 not found message" src={require('../components/images/218954-P1070Y-526.jpg')}></img>
      </section>
    </section>
  )
}

export default Error