// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { setAuthReady, setCredentials, logOut } from '@/features/auth/authSlice';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Agar Firebase se user milta hai, Redux update karo
        firebaseUser.getIdToken().then((token) => {
          dispatch(
            setCredentials({
              data: {
                token,
                uid: firebaseUser.uid,
                email: firebaseUser.email,
              },
            })
          );
        });
      } else {
        dispatch(logOut());
      }
      dispatch(setAuthReady()); // auth initialized
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { user, isLoading };
}
