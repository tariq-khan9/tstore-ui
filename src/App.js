import Home from "./components/Home";
import Layout from "./components/Layout";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from "./components/admin/Dashboard";
import LoginReg from "../src/components/admin/auth/LoginReg";
import SendPasswordResetEmail from "../src/components/admin/auth/SendPasswordResetEmail";
import Products from "./components/admin/products/Products";
import Garments from "./components/homeComponents/Garments";
import Watches from "./components/homeComponents/Watches";
import AdminPanel from "./components/admin/auth/AdminPanel";


function App() {
  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/garments" element={<Garments/>}/>
        <Route path="watches" element={<Watches/>}/>
        <Route path="login" element={<LoginReg/>}/>
        <Route path="sendpasswordemail" element={<SendPasswordResetEmail/>}/>
                   
        </Route>

        <Route path="/dashboard" element={<Dashboard/>}>  
        <Route index element={<Products/>}/>
        <Route path="/dashboard/admin-panel" element={<AdminPanel/>}/>
        
         
        </Route>
        
     </Routes>
       
    </BrowserRouter>
   </>
  );
}

export default App;
