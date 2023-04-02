import './App.css';
import { Button } from '@mui/material';
import LoginForm from './component/authen/login/LoginForm';
import Test from './component/authen/signup/Test';
import SignupForm from './component/authen/signup/SignupForm';
import Navbar from './component/web/header/Navbar';
import SearchForm from './component/web/search/SearchForm';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import UserProfile from './component/web/userProfile/user/UserProfile';
import ResetPassword from './component/web/userProfile/password/ResetPassword';
import FormResetPass from './component/web/userProfile/password/FormResetPass';

function App() {


  const passwordToken = localStorage.getItem('passwordToken')
  const urlPass = "/resetPassword/user/changePassword/token=" + passwordToken;
  console.log('url=============>',urlPass)

  return (
    // // <div>
    // //   <div className='head'>
    // //   <Navbar></Navbar>
    // //   <LoginForm></LoginForm>
    // //   </div>



    // </div>

    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Navbar} />
        <Route path="/signup" Component={SignupForm} />
        <Route path="/login" Component={LoginForm} />
        <Route path="/search" Component={SearchForm} />
        <Route path="/profile" Component={UserProfile} />
        <Route path="/resetPassword" Component={ResetPassword} />
        <Route path= {urlPass} Component={FormResetPass} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
