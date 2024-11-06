import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import components/modules
import Home from './screens/Home';
import Records from './screens/Records';

function App() {
  return (
    
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/records' element={<Records />} />
        </Routes>
      </Router>

  );
}

export default App;
