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
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/payments/Subscribe';
import PaymentSuccess from './components/payments/PaymentSuccess';
import NotFound from './components/Layout/NotFound/NotFound';
import PaymentFail from './components/payments/PaymentFail';
import CoursePage from './components/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile'
import Dashboard from './components/Admin/Dashboard/Dashboard';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import Users from './components/Admin/Users/Users';


function App() {

    //  window.addEventListener("contextmenu" , (e)=>{
    //      e.preventDefault();
    //  })
  
  return (
    <Router>
       <Header/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/courses' element = {<Courses/>}/>
        <Route path='/subscribe' element = {<Subscribe/>}/>
        <Route path='/course/:id' element = {<CoursePage/>}/>
        <Route path='/paymentsuccess' element = {<PaymentSuccess/>}/>
        <Route path='/contact' element = {<Contact/>}/>
        <Route path='/request' element = {<Request/>}/>
        <Route path='/profile' element = {<Profile/>}/>
        <Route path='/changepassword' element = {<ChangePassword/>}/>
        <Route path='/updateprofile' element = {<UpdateProfile/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/forgetpassword' element = {<ForgetPassword/>}/>
        <Route path='/resetpassword/:token' element = {<ResetPassword/>}/>
        <Route path='/paymentfail' element = {<PaymentFail/>}/>
        <Route path='*' element = {<NotFound/>}/>

        {/* Admin routes */}

        <Route path='/admin/dashboard' element = {<Dashboard/>}/>
        <Route path='/admin/courses' element = {<AdminCourses/>}/>
        <Route path='/admin/createcourse' element = {<CreateCourse/>}/>
        <Route path='/admin/users' element = {<Users/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
