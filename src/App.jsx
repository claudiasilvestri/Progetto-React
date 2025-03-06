import {
  RouterProvider
} from "react-router-dom";
import router from './routes';

function App()  {
  return <RouterProvider router={router}/>
}
  
function Root()  {
    return <App />
  }
 
  export default Root