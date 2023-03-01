import './App.css';
import Registrationform from './components/Registrationform';
import Loginform from './components/Loginform';
import Homepage from './components/Homepage';
import { Route, Routes } from 'react-router-dom';
import MyProfile from './components/MyProfile';
import OrderDetail from './components/OrderDetail';
import OrderList from './components/OrderList';
import Orders from './components/Orders';
import Products from './components/Products';

function App() {
  return (
    <>

     <Routes> 
          <Route path='/' element={<Loginform/>} />
          {/* <Route path='/login' element={<Loginform/>} /> */}
          {/* <Route exact path='/login' element={<Loginform/>} /> */}
          <Route exact path='/register' element={<Registrationform/>} />
          <Route exact path='/myprofile' element={<MyProfile/>} />
          <Route exact path='/products' element={<Products/>} />
          <Route exact path='/orders' element={<Orders/>} />
          <Route exact path='/orderlist' element={<OrderList/>} />
          <Route exact path='/orderdetail' element={<OrderDetail/>} />
         
      </Routes>
    </>
  );
}

export default App;
