import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { toast } from 'react-toastify';
import { Loader } from '../components';
import { useAuth } from '../hooks/AuthHook';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const { userId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const res = await fetchUserProfile(userId);

      if (res.success) {
        setUser(res.data.user);
      } else {
        toast.error(res.message);
        navigate('/');
      }

      setLoading(false);
    };

    getUser();
  }, [userId, navigate]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friendships;

    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };
  const showAddFriendBtn = checkIfUserIsAFriend();

  const handleAddFriend = async () => {
    setRequestInProgress(true);

    const res = await addFriend(userId);
    if (res.success) {
      const { friendship } = res.data;

      auth.updateUserFriends(true, friendship);
      toast.success('Friend added');
    } else {
      toast.error(res.message);
    }

    setRequestInProgress(false);
  };

  const handleRemoveFriend = async () => {
    setRequestInProgress(true);

    const res = await removeFriend(userId);
    if (res.success) {
      const friendship = auth.user.friendships.filter(
        (friend) => friend.to_user._id === userId
      );

      auth.updateUserFriends(false, friendship[0]);
      toast.success('Friend removed');
    } else {
      toast.error(res.message);
    }

    setRequestInProgress(false);
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
        <div className={styles.fieldValue}> {user.email} </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}> Name </div>
        <div className={styles.fieldValue}> {user.name} </div>
      </div>

      <div className={styles.btnGrp}>
        {showAddFriendBtn ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriend}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Removing Friend...' : 'Remove Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriend}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding Friend...' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
