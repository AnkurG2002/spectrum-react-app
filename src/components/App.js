import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { Home, Login, Signup, Settings, UserProfile, Page404 } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

function PrivateRoute() {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          <Route element={<PrivateRoute />}>
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/user/:userId" element={<UserProfile />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
