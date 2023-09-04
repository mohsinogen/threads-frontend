import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import React,{ PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../config/FirebaseConfig';
import { Redirect } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import UserData from '../models/user.model';
interface AuthProps {
  userData?: UserData | null,
  updateUserData: (data:UserData)=> void ;
  user?: User | null;
  initialized?: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthProps>({
  logout:()=>{
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve();
      },1000)
    })
  },
  updateUserData:()=> {
    /*  */
  },
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
     if(user){
      fetchUserProfileData(user?.uid);
     }
      setUser(user);
      setInitialized(true);
    });
  }, []);

  const fetchUserProfileData =async(uid:string)=>{
    const userDocRef = doc(FIREBASE_DB, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      console.log('Profile data', userDocSnap.data());
      const data = userDocSnap.data();

      setUserData({
        email: data.email,
        followers: data.followers,
        following: data.following,
        name: data.name,
        uid: uid,
        bio: data.bio,
        link: data.link,
        profile: data.profile
      });
    } else {
      console.log('User data not found');
    }
  }

  const updateUserData=(data:UserData)=>{
    setUserData(data);
  }

  const value = {
    user,
    userData,
    updateUserData,
    initialized,
    logout: () => signOut(FIREBASE_AUTH),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthenticatedRoute = ({ children }: any) => {
  const { user, initialized } = useAuth();

  if (!initialized) {
    return;
  }

  return user ? children : <Redirect to="/login" />;
};
