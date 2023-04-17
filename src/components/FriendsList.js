import styles from '../styles/home.module.css';
import { useAuth } from '../hooks/AuthHook';
import { Link } from 'react-router-dom';

const FriendsList = () => {
  const auth = useAuth();
  const { friendships = [] } = auth.user;

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>

      {friendships && friendships.length === 0 && (
        <div className={styles.noFriends}> No Friends </div>
      )}

      {friendships &&
        friendships.map((friend) => (
          <div key={`friend-${friend._id}`}>
            <Link
              className={styles.friendsItem}
              to={`/user/${friend.to_user._id}`}
            >
              <div className={styles.friendsImg}>
                <img
                  src="https://img.icons8.com/external-mixed-line-solid-yogi-aprelliyanto/256/external-user-essential-element-mixed-line-solid-yogi-aprelliyanto.png"
                  alt="friend"
                />
              </div>

              <div className={styles.friendsName}> {friend.to_user.name} </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendsList;
