import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  MapPin,
  Wheat,
  ClipboardList,
  FileText,
  BarChart3,
  LogOut,
  Leaf,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/farmers', label: 'Farmers', icon: Users },
  { path: '/lands', label: 'Land Areas', icon: MapPin },
  { path: '/commodities', label: 'Commodities', icon: Wheat },
  { path: '/transactions/new', label: 'New Transaction', icon: ClipboardList },
  { path: '/transactions', label: 'Transactions', icon: FileText },
  { path: '/reports', label: 'Reports', icon: BarChart3 },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const isActiveLink = (path: string) => {
    if (path === '/transactions') {
      return location.pathname === '/transactions' || 
        (location.pathname.startsWith('/transactions/') && !location.pathname.includes('/new'));
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col z-50"
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
            <Leaf className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold text-sidebar-foreground">
              HarvestHub
            </h1>
            <p className="text-xs text-sidebar-foreground/60">Farm Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = isActiveLink(item.path);
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-harvest-gold rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sm font-semibold text-sidebar-foreground">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              {user?.email || 'user@example.com'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
