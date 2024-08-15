import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CartList from './Components/cart';
import Spares from './Components/spares';
import Contact from './Components/contact';
import Service from './Components/service';
import LoginPaze from './Components/log_sign';
import Formzz from './Components/sparesform';
import Profile from './Components/checkout';
import Guest from './Components/guest';
import Navbarr from './Components/navbarr';
import Addmin from './Components/addmin';
import Delivery from './Components/delivery';
import RandomNumberGenerator from './Components/LIFE';
import Staytuned from './Components/staytuned';
const username = new URLSearchParams(window.location.search).get('username');

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPaze/>}></Route>
        <Route path='/spares' element={<Spares username={username}/>}></Route>
        <Route path='/cart' element={<CartList username={username}/>}></Route>
        <Route path='/contact' element={<Contact username={username}/>}></Route>
        <Route path='/service' element={<Service username={username}/>}></Route>
        <Route path='/home' element={<Navbarr username={username}/>}></Route>
        <Route path='/sform' element={<Formzz/>}></Route>
        <Route path='/profile' element={<Profile username={username}/>}></Route>
        <Route path='/guest' element={<Guest/>}></Route>
        <Route path='/add' element={<Addmin/>}></Route>
        <Route path='/delivery' element={<Delivery/>}></Route>
        <Route path='/dandelions' element={<RandomNumberGenerator/>}></Route>
        <Route path='/stay' element={<Staytuned/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
