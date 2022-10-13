import './App.css';
import { BrowserRouter } from "react-router-dom";
import Navigation from './components/Navigation/Navbar';
import Routers from './Routers';
import { GlobalStore } from "./store/GlobalStore";


function App() {
  return (
   
      <BrowserRouter>
       <GlobalStore>
        <div className="App">
          <Navigation>
            <Routers />
          </Navigation>
        </div>
        </GlobalStore>
      </BrowserRouter>
  );
}

export default App;
