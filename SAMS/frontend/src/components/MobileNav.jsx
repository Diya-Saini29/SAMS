import {NavLink} from 'react-router-dom';
import {LayoutDashboard,Plane,BriefcaseBusiness,Users,UserRound,Bus,BarChart3,Settings} from 'lucide-react';
const items=[['/dashboard','Dashboard',LayoutDashboard],['/flights','Flights',Plane],['/luggage','Luggage',BriefcaseBusiness],['/visitors','Visitors',Users],['/staff','Staff',UserRound],['/transportation','Transportation',Bus],['/reports','Reports',BarChart3],['/settings','Settings',Settings]];
export default function MobileNav({onNavigate}){return <nav className="mobile-nav">{items.map(([to,label,Icon])=><NavLink onClick={onNavigate} key={to} to={to} className={({isActive})=>`nav-link ${isActive?'active':''}`}><Icon size={21}/>{label}</NavLink>)}</nav>}
