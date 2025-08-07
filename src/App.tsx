import Gallery from './components/Gallery';
import About from './components/About';
import Footer from './components/Footer';
import './App.scss';

function App() {
  return (
    <div className="container">
      <main>
        <Gallery />
        <div className="infoContainer">
          <About />
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default App
