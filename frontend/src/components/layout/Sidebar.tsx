import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <Link href="/">
          <h1 className="sidebar-logo">Evolution of Todo</h1>
        </Link>

        <nav className="sidebar-nav">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" legacyBehavior>
                <a className="sidebar-link">Dashboard</a>
              </Link>
              <div className="sidebar-user-info">
                Welcome, {user?.email}
              </div>
              <button onClick={handleLogout} className="sidebar-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" legacyBehavior>
                <a className="sidebar-link">Sign In</a>
              </Link>
              <Link href="/signup" legacyBehavior>
                <a className="sidebar-link">Sign Up</a>
              </Link>
            </>
          )}
        </nav>
      </div>

      <style jsx>{`
        .sidebar {
          width: 280px;
          min-width: 280px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.2);
          z-index: 999;
          display: flex;
          flex-direction: column;
          padding: 20px 0;
        }

        .sidebar-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0 15px;
        }

        .sidebar-logo {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          margin: 0 0 30px 0;
          padding: 0 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .sidebar-logo:hover {
          transform: scale(1.05);
          text-decoration: none;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 15px;
          flex: 1;
        }

        .sidebar-link {
          display: block;
          color: white;
          padding: 12px 16px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          text-align: center;
        }

        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(5px);
        }

        .sidebar-user-info {
          color: white;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          font-weight: 500;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.15);
          margin: 10px 0;
        }

        .sidebar-logout-btn {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
          text-align: center;
        }

        .sidebar-logout-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(5px);
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 70px;
            min-width: 70px;
          }

          .sidebar-logo {
            font-size: 1rem;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            white-space: nowrap;
            margin: 10px 0;
          }

          .sidebar-link,
          .sidebar-user-info,
          .sidebar-logout-btn {
            padding: 15px 8px;
            font-size: 0.8rem;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            white-space: nowrap;
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;