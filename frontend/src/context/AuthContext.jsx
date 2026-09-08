import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import {authApi} from '../lib/api';
const AuthContext=createContext(null);
export function AuthProvider({children}){
 const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('sams_user'))||null}catch{return null}});
 const [loading,setLoading]=useState(Boolean(localStorage.getItem('sams_token')));
 useEffect(()=>{if(!localStorage.getItem('sams_token')){setLoading(false);return} authApi.me().then(r=>{setUser(r.data.user);localStorage.setItem('sams_user',JSON.stringify(r.data.user))}).catch(()=>{localStorage.removeItem('sams_token');localStorage.removeItem('sams_user');setUser(null)}).finally(()=>setLoading(false))},[]);
 const login=async credentials=>{const r=await authApi.login(credentials);localStorage.setItem('sams_token',r.data.data.token);localStorage.setItem('sams_user',JSON.stringify(r.data.data.user));setUser(r.data.data.user);return r.data.data.user};
 const register=async payload=>{const r=await authApi.register(payload);localStorage.setItem('sams_token',r.data.data.token);localStorage.setItem('sams_user',JSON.stringify(r.data.data.user));setUser(r.data.data.user);return r.data.data.user};
 const logout=()=>{localStorage.removeItem('sams_token');localStorage.removeItem('sams_user');setUser(null)};
 return <AuthContext.Provider value={useMemo(()=>({user,loading,login,register,logout}),[user,loading])}>{children}</AuthContext.Provider>
}
export const useAuth=()=>useContext(AuthContext);
