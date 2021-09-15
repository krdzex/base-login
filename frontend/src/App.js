import './App.css';
import MainRouter from './MainRouter';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
