import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer/Footer';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ResetPassword from './Auth/ResetPassword';
import ForgetPassword from './Auth/ForgetPassword';

function App() {
  return (
    <Router>
       <Header/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/courses' element = {<Courses/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/forgetpassword' element = {<ForgetPassword/>}/>
        <Route path='/resetpassword/:token' element = {<ResetPassword/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
