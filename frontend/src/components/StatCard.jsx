import {TrendingUp} from 'lucide-react';
export default function StatCard({icon:Icon,label,value,note,kind,children}){return <div className={`stat-card ${kind}`}><div className="stat-top"><div className="stat-label"><Icon size={30}/><span>{label}</span></div>{children}</div><div className="stat-value">{value}</div><div className="stat-note"><TrendingUp size={17}/><span>{note}</span></div></div>}
