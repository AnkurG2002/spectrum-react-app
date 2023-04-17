import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../hooks/AuthHook';
import styles from '../styles/login.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      toast.warn('Please fill all the fields!');
      error = true;
    } else if (password !== confirmPassword) {
      toast.error('Please confirm the password');
      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const res = await auth.signup(name, email, password, confirmPassword);

    if (res.success) {
      setSigningUp(false);
      toast.success('User successfully registered');

      navigate('/login');
    } else {
      toast.error(res.message);
    }

    setSigningUp(false);
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Register</span>

      <div className={styles.field}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing in...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
