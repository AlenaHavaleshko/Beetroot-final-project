import { Routes, Route, Navigate  } from 'react-router-dom'
import LogIn from '../container/AuthForm/LogIn/LogIn';
import SignUp from '../container/AuthForm/SignUp/SignUp';

//routs
import AuthRoute from './routes/AuthRoute';
import PublicRoute from './routes/PublicRoute';


//layouts
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';

//page
import AccountPage from './AccountPage';
import CalendarPage from './CalendarPage';

function Router () {

 return(
<Routes>
  <Route path="/login" element={<AuthRoute element={LogIn}/>}/>
  <Route path="/login" element= {<AuthRoute element={LogIn}/>}/>
  <Route path="/signup" element= {<AuthRoute element={SignUp}/>}/>
  <Route path="/account" element= {<PublicRoute element={AccountPage}/>}/> 
  <Route path='/calendar' element={<PublicRoute element={CalendarPage}/>}/>
</Routes>
 );
}

export default Router;