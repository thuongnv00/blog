import './App.css';
import { Button } from '@mui/material';
import LoginForm from './component/authen/login/LoginForm';
import Test from './component/authen/signup/Test';
import SignupForm from './component/authen/signup/SignupForm';

function App() {
  return (
    <div>
      {/* <LoginForm/> */}
      {/* <Test/> */}
      <SignupForm></SignupForm>
    </div>
  );
}

export default App;
