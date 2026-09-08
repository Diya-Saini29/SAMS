import {Routes,Route,Navigate,useLocation} from 'react-router-dom';
import {AuthProvider,useAuth} from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Flights from './pages/Flights';
import Luggage from './pages/Luggage';
import Visitors from './pages/Visitors';
import Staff from './pages/Staff';
import Transportation from './pages/Transportation';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
function Guard({children}){const {user,loading}=useAuth();const loc=useLocation();if(loading)return <div className="loading-screen">Loading SAMS…</div>;return user?children:<Navigate to="/login" replace state={{from:loc}}/>}
export default function App(){return <AuthProvider><Routes><Route path="/login" element={<Login/>}/><Route element={<Guard><Layout/></Guard>}><Route index element={<Navigate to="/dashboard" replace/>}/><Route path="dashboard" element={<Dashboard/>}/><Route path="flights" element={<Flights/>}/><Route path="luggage" element={<Luggage/>}/><Route path="visitors" element={<Visitors/>}/><Route path="staff" element={<Staff/>}/><Route path="transportation" element={<Transportation/>}/><Route path="reports" element={<Reports/>}/><Route path="settings" element={<Settings/>}/></Route><Route path="*" element={<Navigate to="/dashboard" replace/>}/></Routes></AuthProvider>}
