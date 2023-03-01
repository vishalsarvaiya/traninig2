
import './App.css';
import Homepage from './components/Homepage';
import Loginform from './components/Loginform';
import Registrationform from './components/Registrationform';
import {Routes,Route} from 'react-router-dom';


function App() {
  return (
  <>
      <Routes> 
          <Route path='/' element={<Homepage/>} />
          <Route exact path='/login' element={<Loginform/>} />
          <Route exact path='/register' element={<Registrationform/>} />
      </Routes>
    </>
      
      
  
  );
}

export default App;
