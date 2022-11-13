import logo from './logo.svg';
import './App.css';
import  ResponsiveAppBar from './components/Appbar';
import Stock from './components/Stock'
function App() {
  return (
    <div className="App">
      <ResponsiveAppBar/>
      <Stock/>
    </div>
  );
}

export default App;
