import { useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

import styles from '../styles/login.module.css';
import { useAuth } from '../hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoggingIn(true);

    if (!email || !password) {
      toast.warn('Please enter both email and password !');
    } else {
      const res = await auth.login(email, password);

      if (res.success) {
        toast.success('Successfully logged in');
      } else {
        toast.error(res.message);
      }
    }

    setLoggingIn(false);
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Loggin in...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default Login;
