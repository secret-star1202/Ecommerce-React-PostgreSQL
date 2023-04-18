import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Cart from './pages/cart/Cart';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import Product from './pages/product/Product';
import Profile from './pages/profile/Profile';
import Blog from './pages/blog/Blog';
import About from './pages/about/About';
import NotFound from './pages/not-found/NotFound';
import Category from './pages/category/Category';
import Footer from './components/footer/Footer';
import Register from './pages/user-forms/register/Register';
import Login from './pages/user-forms/login/Login';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route path="" element={<Home />} />
            <Route path=":category">
              <Route path="" element={<Category />} />
              <Route path=":name" element={<Product />} />
            </Route>
          </Route>
          <Route path="/shop">
            <Route path="" element={<Shop />} />
            <Route path=":category">
              <Route path="" element={<Category />} />
              <Route path=":name" element={<Product />} />
            </Route>
          </Route>
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
