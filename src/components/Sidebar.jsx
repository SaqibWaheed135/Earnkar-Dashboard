import { Home, ShoppingCart, Users, Settings, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Flup</h2>
            <nav>
                <ul>
                    <li><Home size={18} /> Dashboard</li>
                    <li><Link to="/withdraw"><ShoppingCart size={18} />Withdraw</Link></li>
                    <li><Users size={18} /> Customers</li>
                    <li><Settings size={18} /> Settings</li>
                </ul>
            </nav>
            <div className="bottom">
                <Moon size={16} /> Dark Mode
            </div>
        </div>
    );
}
