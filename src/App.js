import requests from './api/requests';
import './App.css';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Row from './components/Row';

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchURL={requests.fetchNowPlaying}
        isLargeRow
      />

      <Row 
        title="Trending Now"
        id="TN"
        fetchURL={requests.fetchTrending}
      />

      <Row
        title="Top Rated"
        id="TR"
        fetchURL={requests.fetchTopRated}
      />

      <Row
        title="Action Movies"
        id="AM"
        fetchURL={requests.fetchActionMovies}
      />

      <Row
        title="Comedy Movies"
        id="CM"
        fetchURL={requests.fetchComedyMovies}
      />

      <Row
        title="Horror Movies"
        id="HM"
        fetchURL={requests.fetchHorrorMovies}
      />

      <Row
        title="Romance Movies"
        id="RM"
        fetchURL={requests.fetchRomanceMovies}
      />

      <Row
        title="Documentaries"
        id="DM"
        fetchURL={requests.fetchDocumentaries}
      />

      <Footer />
    </div>

  );
}

export default App;
