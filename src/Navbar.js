import React from 'react';

const Navbar = () => {
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '1rem'
  };

  const logoStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.5rem'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '1rem'
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem'
  };

  return (
    <nav style={navbarStyle}>
      <a href="/" style={logoStyle}>BiasViz</a>
      <div style={navLinksStyle}>
        <a href="/" style={linkStyle}>Home Page</a>
        <a href="/Page1" style={linkStyle}>Change the prompt</a>
      </div>
    </nav>
  );
};

export default Navbar;
