import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="logo-area">
        <i className="fas fa-seedling logo" />
        <span>Intelligent Investment</span>
      </div>
      <ul className="nav-area">
        <li className="nav-item">
          <i className="fas fa-user" />
          <i className="fas fa-caret-down" />
        </li>
        <li className="nav-item">
          <i className="fas fa-globe-asia" />
          <i className="fas fa-caret-down" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
