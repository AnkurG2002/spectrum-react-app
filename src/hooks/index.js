import { useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import { AuthContext } from '../providers/AuthProvider';
import {
  editProfile,
  fetchUserFriends,
  register,
  login as userLogin,
} from '../api';
import {
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '../utils';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwt_decode(userToken);
        const res = await fetchUserFriends();

        let friendships = [];
        if (res.success) {
          friendships = res.data.friends;
        }

        setUser({
          ...user,
          friendships,
        });
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    const res = await userLogin(email, password);

    if (res.success) {
      setUser(res.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        res.data.token ? res.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: res.message,
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const res = await register(name, email, password, confirmPassword);

    if (res.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: res.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  const updateUser = async (userId, name, password, confirmPassword) => {
    const res = await editProfile(userId, name, password, confirmPassword);

    if (res.success) {
      setUser(res.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        res.data.token ? res.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: res.message,
      };
    }
  };

  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({
        ...user,
        friendships: [...user.friendships, friend],
      });
    } else {
      const newFriends = user.friendships.filter(
        (f) => f.to_user._id !== friend.to_user._id
      );

      setUser({
        ...user,
        friendships: newFriends,
      });
    }
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateUser,
    updateUserFriends,
  };
};
