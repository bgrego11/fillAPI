import { useAuth0 } from "@auth0/auth0-react";
import './App.css';

// Components
import NavBar from './Components/Nav'
import SeriesScreen from './Components/SeriesScreen/SeriesScreen'
import Home from './Components/Home'

function App() {
  const { loginWithRedirect } = useAuth0();
  <button onClick={() => loginWithRedirect()}>Log In</button>

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <Home />
    </div>
  );
}

export default App;
