import './App.css';
import { Button } from '@mui/material';
import LoginForm from './component/authen/login/LoginForm';
import SignupForm from './component/authen/signup/SignupForm';
import Navbar from './component/web/header/Navbar';
import SearchForm from './component/web/search/SearchForm';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import UserProfile from './component/web/userProfile/user/UserProfile';
import ResetPassword from './component/web/userProfile/password/ResetPassword';
import FormResetPass from './component/web/userProfile/password/FormResetPass';
import Paging from './component/web/search/Paging';
import Pagination from './component/web/pagination/Pagination';
function App() {


  const passwordToken = localStorage.getItem('passwordToken')
  const urlPass = "/resetPassword/user/changePassword/token=" + passwordToken;
  console.log('url=============>', urlPass)

  return (
    // // <div>
    // //   <div className='head'>
    // //   <Navbar></Navbar>
    // //   <LoginForm></LoginForm>
    // //   </div>



    // </div>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>} />
        <Route path="/signup" element={<SignupForm/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/search/" element={<SearchForm/>}>
        </Route>
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/resetPassword" element={<ResetPassword/>} />
        <Route path={urlPass} element={<FormResetPass/>} />
        <Route path='/demo' element={<Paging/>} />
        <Route path='/page' element={<Pagination/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
