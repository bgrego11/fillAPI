import { useAuth0 } from "@auth0/auth0-react";
import './App.css';

// Components
import NavBar from './Components/Nav'
import SeriesScreen from './Components/SeriesScreen/SeriesScreen'

function App() {
  const { loginWithRedirect } = useAuth0();
  <button onClick={() => loginWithRedirect()}>Log In</button>

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <SeriesScreen />
    </div>
  );
}

export default App;
