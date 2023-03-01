import './App.css';
import User_form from './components/User_form';
import { Route, Routes } from 'react-router-dom';
import Userdata from './components/Userdata';
import Updateuser from './components/Updateuser';
import Viewuser from './components/Viewuser';

function App() {
  return (
    <Routes>
      <Route path='/userform' element={<User_form />}/>
      <Route path='/' element={<Userdata />}/>
      <Route path='/updateuser' element={<Updateuser/> }/>
      <Route path='/viewuser' element={<Viewuser/>} />
    </Routes>
  );
}

export default App;
