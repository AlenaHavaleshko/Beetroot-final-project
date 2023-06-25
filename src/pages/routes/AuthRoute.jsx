import { Route } from "react-router-dom";

//layouts
import AuthLayout from "../../layouts/AuthLayout";

function AuthRoute ( { element: Element, ... props }) {

 return(
  <AuthLayout>
   <Element { ...props }/>
  </AuthLayout>

  
 );
} 
export default AuthRoute;