import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminRegisterPage from './pages/AdminRegisterPage';
import UserLoginPage from './pages/UserLoginPage';
import UserRegisterPage from './pages/UserRegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ProductPage from './pages/ProductPage';
import CreateNewProduct from './pages/CreateNewProduct';
import CustomerOrderList from './pages/CustomerOrderList';
import UserOrderList from './pages/UserOrderList';




function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/homepage" element={<HomePage/>} />
        <Route exact path="/adminLoginPage" element={<AdminLoginPage/>} />
        <Route exact path="/adminRegisterPage" element={<AdminRegisterPage/>} />
        <Route exact path="/userLoginPage" element={<UserLoginPage/>} />
        <Route exact path="/userRegisterPage" element={<UserRegisterPage/>} />
        <Route exact path="/adminDashboard" element={<AdminDashboard/>} />
        <Route exact path="/userDashboard" element={<UserDashboard/>} />
        <Route exact path="/productPage" element={<ProductPage/>} />
        <Route exact path="/createnewProduct" element={<CreateNewProduct/>} />
        <Route exact path="/customerOrderList" element={<CustomerOrderList/>} />
        <Route exact path="/userOrderList" element={<UserOrderList/>} />
    </Routes>
  );
}

export default App;