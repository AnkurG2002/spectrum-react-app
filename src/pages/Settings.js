import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Settings = () => {
  const auth = useAuth();

  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [edit, setEdit] = useState(false);
  const [save, setSave] = useState(false);

  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  };

  const updateProfile = async () => {
    setSave(true);

    let error = false;
    if (!name || !password || !confirmPassword) {
      toast.warn('Please fill all the fields!');
      error = true;
    } else if (password !== confirmPassword) {
      toast.error('Please confirm the password');
      error = true;
    }

    if (error) {
      return setSave(false);
    }

    const res = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    if (res.success) {
      setEdit(false);
      clearForm();
      toast.success('Profile Update successfully');
    } else {
      toast.error(res.message);
    }

    setSave(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://img.icons8.com/external-mixed-line-solid-yogi-aprelliyanto/256/external-user-essential-element-mixed-line-solid-yogi-aprelliyanto.png"
          alt="user"
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}> Email </div>
        <div className={styles.fieldValue}> {auth.user?.email} </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}> Name </div>
        {edit ? (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}> {auth.user?.name} </div>
        )}
      </div>

      {edit && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}> Password </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}> Confirm Password </div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {edit ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={save}
            >
              {save ? 'Saving Changes...' : 'Save Profile'}
            </button>
            <button
              className={`button ${styles.goBack}`}
              onClick={(e) => setEdit(false)}
            >
              Go Back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={(e) => setEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
