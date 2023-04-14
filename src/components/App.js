import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, Login, Signup, Page404 } from '../pages';
import { Loader, Navbar } from './';

import { useAuth } from '../hooks';

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
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
