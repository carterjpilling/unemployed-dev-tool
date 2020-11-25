import Navbar from '../src/Components/Navbar'
import routes from './routes'
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      {routes}
    </div>
  );
}

export default App;
