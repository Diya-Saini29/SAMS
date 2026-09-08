import {Outlet,useLocation,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import Topbar from './Topbar';
import MobileNav from './MobileNav';
export default function Layout(){const [mobile,setMobile]=useState(false);const loc=useLocation();const nav=useNavigate();return <div className="app-shell"><Topbar onMenu={()=>setMobile(true)}/><main className="main-area"><div className="page-wrap"><Outlet/></div></main>{mobile&&<div className="mobile-overlay" onClick={()=>setMobile(false)}><div className="mobile-panel" onClick={e=>e.stopPropagation()}><MobileNav onNavigate={()=>setMobile(false)}/></div></div>}</div>}
