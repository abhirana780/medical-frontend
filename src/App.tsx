import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import Login from './pages/Auth/Login';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import UserDashboard from './pages/Dashboard/UserDashboard';
import Profile from './pages/Dashboard/Profile';
import UserOrders from './pages/Dashboard/UserOrders';
import OrderDetails from './pages/Dashboard/OrderDetails';
import Addresses from './pages/Dashboard/Addresses';
import Wishlist from './pages/Dashboard/Wishlist';
import Cancellation from './pages/Dashboard/Cancellation';
import MedicalHistory from './pages/Dashboard/MedicalHistory';
import Notifications from './pages/Dashboard/Notifications';
import Settings from './pages/Dashboard/Settings';

import Register from './pages/Auth/Register';
import Services from './pages/Services';
import UploadPrescription from './pages/Services/UploadPrescription';
import Inquiry from './pages/Inquiry';
import ReviewProduct from './pages/ReviewProduct';
import NotFound from './pages/Errors/NotFound';
import ServerError from './pages/Errors/ServerError';

import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import Products from './pages/Admin/Products';
import ProductForm from './pages/Admin/ProductForm';
import AdminOrders from './pages/Admin/Orders';
import Users from './pages/Admin/Users';
import Prescriptions from './pages/Admin/Prescriptions';
import Inquiries from './pages/Admin/Inquiries';
import Coupons from './pages/Admin/Coupons';

import SavedCards from './pages/Dashboard/SavedCards';
import ShippingPolicy from './pages/ShippingPolicy';
import Returns from './pages/Returns';
import FAQ from './pages/FAQ';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Header />}
      <main className={!isAdminRoute ? "main-content" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/faq" element={<FAQ />} />

          <Route path="/services" element={<Services />} />
          <Route path="/upload-prescription" element={<UploadPrescription />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/review-product" element={<ReviewProduct />} />

          {/* Error Pages */}
          <Route path="/404" element={<NotFound />} />
          <Route path="/500" element={<ServerError />} />

          {/* Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<UserDashboard />}>
              <Route path="profile" element={<Profile />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="orders/:id" element={<OrderDetails />} />
              <Route path="medical-history" element={<MedicalHistory />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="cancellation" element={<Cancellation />} />
              <Route path="cards" element={<SavedCards />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="products/add" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<Users />} />
              <Route path="prescriptions" element={<Prescriptions />} />
              <Route path="inquiries" element={<Inquiries />} />
              <Route path="coupons" element={<Coupons />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
