import './App.css';
import { Button } from '@mui/material';
import LoginForm from './component/authen/login/LoginForm';
import Test from './component/authen/signup/Test';
import SignupForm from './component/authen/signup/SignupForm';
import Navbar from './component/web/header/Navbar';
import SearchForm from './component/web/search/SearchForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProfile from './component/web/userProfile/UserProfile';

function App() {
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
