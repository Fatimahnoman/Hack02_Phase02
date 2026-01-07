import React from 'react';
import Layout from '../components/layout/Layout';
import Link from 'next/link';

const HomePage = () => {
  return (
    <Layout>
      <div className="container">
        <div className="hero">
          <h1 className="evolution-text">Evolution of Todo</h1>
          <p><strong>Welcome To Our Task Manager</strong></p>
          <div className="cta-buttons">
            <Link href="/signin" legacyBehavior><a className="auth-link signin-link">Sign In</a></Link>
            <span className="link-separator"> | </span>
            <Link href="/signup" legacyBehavior><a className="auth-link signup-link">Sign Up</a></Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hero {
          text-align: center;
          padding: 80px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          background: linear-gradient(135deg, #f0f4f8 0%, #c9e0f3 100%);
          border-radius: 20px;
          margin: 20px;
          box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%);
          pointer-events: none;
        }

        .evolution-text {
          font-size: 2.5rem;
          margin: 20px 0 25px 0;
          color: #2b6cb0;
          text-decoration: underline;
          text-decoration-color: #000;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          letter-spacing: 1px;
          position: relative;
          z-index: 2;
        }

        .hero p {
          font-size: 1.3rem;
          color: #2d3748;
          margin-bottom: 35px;
          font-weight: 500;
          position: relative;
          z-index: 2;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .auth-link {
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          display: inline-block;
          border: 2px solid transparent;
        }

        .signin-link {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .signup-link {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        }

        .auth-link:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .link-separator {
          color: #718096;
          font-weight: 600;
          margin: 0 10px;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 60px 15px;
            margin: 15px;
          }

          .evolution-text {
            font-size: 2rem;
          }

          .hero p {
            font-size: 1.1rem;
          }

          .cta-buttons {
            flex-direction: column;
            gap: 15px;
            width: 100%;
          }

          .auth-link {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </Layout>
  );
};

export default HomePage;