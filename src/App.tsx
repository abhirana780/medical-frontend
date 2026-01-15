import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
import ChatBot from './components/ChatBot';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ScrollToTop from './components/ScrollToTop';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext'; // Will create this next

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/Catalog'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));

// Static Pages
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Doctors = lazy(() => import('./pages/Doctors'));
const Services = lazy(() => import('./pages/Services'));
const UploadPrescription = lazy(() => import('./pages/Services/UploadPrescription'));
const Inquiry = lazy(() => import('./pages/Inquiry'));
const TrackOrder = lazy(() => import('./pages/TrackOrder'));
const ReviewProduct = lazy(() => import('./pages/ReviewProduct'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const Returns = lazy(() => import('./pages/Returns'));
const FAQ = lazy(() => import('./pages/FAQ'));

// Error Pages
const NotFound = lazy(() => import('./pages/Errors/NotFound'));
const ServerError = lazy(() => import('./pages/Errors/ServerError'));

// Dashboard Pages
const UserDashboard = lazy(() => import('./pages/Dashboard/UserDashboard'));
const Profile = lazy(() => import('./pages/Dashboard/Profile'));
const UserOrders = lazy(() => import('./pages/Dashboard/UserOrders'));
const OrderDetails = lazy(() => import('./pages/Dashboard/OrderDetails'));
const MedicalHistory = lazy(() => import('./pages/Dashboard/MedicalHistory'));
const Addresses = lazy(() => import('./pages/Dashboard/Addresses'));
const Wishlist = lazy(() => import('./pages/Dashboard/Wishlist'));
const Cancellation = lazy(() => import('./pages/Dashboard/Cancellation'));
const SavedCards = lazy(() => import('./pages/Dashboard/SavedCards'));
const Notifications = lazy(() => import('./pages/Dashboard/Notifications'));
const UserReviews = lazy(() => import('./pages/Dashboard/UserReviews'));
const Settings = lazy(() => import('./pages/Dashboard/Settings'));

// Admin Pages
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminReviews = lazy(() => import('./pages/Admin/Reviews'));
const Products = lazy(() => import('./pages/Admin/Products'));
const ProductForm = lazy(() => import('./pages/Admin/ProductForm'));
const AdminOrders = lazy(() => import('./pages/Admin/Orders'));
const Users = lazy(() => import('./pages/Admin/Users'));
const BulkInventory = lazy(() => import('./pages/Admin/BulkInventory'));
const Prescriptions = lazy(() => import('./pages/Admin/Prescriptions'));
const Inquiries = lazy(() => import('./pages/Admin/Inquiries'));
const Coupons = lazy(() => import('./pages/Admin/Coupons'));

// Feature Pages
const ComparePage = lazy(() => import('./pages/Compare'));


import CompareBar from './components/CompareBar';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Header />}
      <main className={!isAdminRoute ? "main-content" : ""}>
        <Suspense fallback={<div className="section container text-center"><Loading /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/compare" element={<ComparePage />} />
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
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/review-product" element={<ReviewProduct />} />

            {/* Error Pages */}
            <Route path="/404" element={<NotFound />} />
            <Route path="/500" element={<ServerError />} />

            {/* Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<UserDashboard />}>
                <Route index element={<Navigate to="profile" replace />} />
                <Route path="profile" element={<Profile />} />
                <Route path="orders" element={<UserOrders />} />
                <Route path="orders/:id" element={<OrderDetails />} />
                <Route path="medical-history" element={<MedicalHistory />} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="cancellation" element={<Cancellation />} />
                <Route path="cards" element={<SavedCards />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="reviews" element={<UserReviews />} />
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
                <Route path="inventory" element={<BulkInventory />} />
                <Route path="prescriptions" element={<Prescriptions />} />
                <Route path="inquiries" element={<Inquiries />} />
                <Route path="reviews" element={<AdminReviews />} />
                <Route path="coupons" element={<Coupons />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </main>
      <CompareBar />
      {!isAdminRoute && <Footer />}
      <ChatBot />
    </div>
  );
};



function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <CompareProvider>
            <Router>
              <ScrollToTop />
              <Toaster position="top-center" reverseOrder={false} />
              <AppContent />
            </Router>
          </CompareProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
