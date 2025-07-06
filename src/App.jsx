import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/navbar/navbar';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login';
import Home from './pages/homepage/homePage';
import PrivateRoute from './helper/privateRoute';
import Signup from './pages/signup/signup';
import AgriMarket from './pages/agrimarket/agriMarket';
import Profile from './pages/profile/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  const navigate = useNavigate();

  // In your App.jsx
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  // Add a logout function
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData'); // Clear user data if needed`
    setIsAuthenticated(false);
    navigate('/login');
  };

  // const handleLogin = () => {
  //   const storedAuth = localStorage.getItem('isAuthenticated');
  //   if (storedAuth === 'true') {
  //     setIsAuthenticated(true);
  //     navigate('/dashboard');
  //   }
  //   else {
  //     setIsAuthenticated(false);
  //     navigate('/login');
  //   }
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem('isAuthenticated');
  //   setIsAuthenticated(false);
  //   navigate('/');
  // };

  // Add a custom AdminRoute for role-based protection
  const AdminRoute = ({ children }) => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    return userData.role === 'admin' ? children : <Navigate to="/" />;
  };

  return (
    <div className="app">
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/about" element={<About />} />          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/agrimarket" element={<AgriMarket />} />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />

          <Route path="/admin" element={
            <PrivateRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </PrivateRoute>
          } />

          {/* <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

// // Wrap App with Router in main.jsx or here
// const AppWrapper = () => (

//   <App />

// );

// export default AppWrapper;


// import { useState } from 'react';
// import Navbar from './components/navbar/navbar';
// import Footer from './components/footer/footer';
// import Home from './pages/homepage/homePage';
// import About from './pages/about/about';
// import Contact from './pages/contact/contact';
// import Login from './pages/login/login';
// import PrivateRoute from './helper/privateRoute';
// import Dashboard from './pages/dashboard/dashboard';
// import { Route, Router, Routes } from 'react-router-dom';
// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <div className="app">
//       <Navbar />
//       <main className="main-content">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//           <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//           </Route>
//         </Routes>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default App;







// // import './App.css'
// // import HomePage from './pages/homepage/homePage.jsx'
// // import Footer from './components/footer/footer.jsx'
// // import Navbar from './components/navbar/navbar.jsx'


// // //Javascript
// // function App() {
// //   //javascript

// //   return (
// //     <div className="app">
// //       <Navbar />
// //       <HomePage />
// //       <Footer />
// //     </div>
// //   )
// // }

// // export default App
