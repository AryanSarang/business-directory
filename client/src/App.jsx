import { Route, Routes, BrowserRouter } from 'react-router-dom';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Header from './components/Header';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import BusinessConsultancy from './pages/BusinessConsultancy';
import Featured from './pages/Featured';
import AlreadyLogin from './components/AlreadyLogin';
import Footer from './components/Footer';
import ApplyConsultant from './pages/ApplyConsultant';
import Users from './pages/Admin/Users';
import Consultants from './pages/Admin/Consultants';
import AllConsultations from './pages/Admin/AllConsultations';
import AdminRoute from './components/AdminRoute';
import AllConsultants from './pages/AllConsultants';
import Consultant from './pages/Consultant';
import ScrollToTop from './Miscellaneous/ScrollToTop';
import WriteABlog from './pages/WriteABlog';
import AllBlogs from './pages/AllBlogs';
import Blog from './pages/Blog';
import AdminAllBlogs from './pages/Admin/AllBlogs.admin';

export default function App() {
  return <BrowserRouter>
    <ScrollToTop />
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />

      <Route element={<AlreadyLogin />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/about" element={<About />} />
      <Route path="/allconsultants" element={<AllConsultants />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/featured" element={<Featured />} />
      <Route path="/businessconsultancy" element={<BusinessConsultancy />} />
      <Route path='/consultant/:consultantId' element={<Consultant />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/consultants" element={<Consultants />} />
        <Route path="/admin/consultations" element={<AllConsultations />} />
        <Route path="/admin/blogs" element={<AdminAllBlogs />} />
      </Route>

      <Route path="/applyconsultant" element={<ApplyConsultant />} />
      <Route path="/writeablog" element={<WriteABlog />} />
      <Route path="/allblogs" element={<AllBlogs />} />
      <Route path='/blog/:blogUrl' element={<Blog />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

    </Routes>
    <Footer />
  </BrowserRouter>
}
