import { useAuth0 } from "@auth0/auth0-react";
import './App.css';

// Components
import NavBar from './Components/Nav'
import Home from './Components/Home'

function App() {
  const { loginWithRedirect } = useAuth0();
  <button onClick={() => loginWithRedirect()}>Log In</button>

  //add auth0
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
