import React from 'react';
import './NavBar.css';

function NavBar({ activeTab, setActiveTab }) {
  return (
    <header>
      <nav>
        <ul className="tabs">
          <li
            className={activeTab === 'Generate Bets' ? 'active' : ''}
            onClick={() => setActiveTab('Generate Bets')}
          >
            Generate Bets
          </li>
          <li
            className={activeTab === 'Results' ? 'active' : ''}
            onClick={() => setActiveTab('Results')}
          >
            Results
          </li>
          <li
            className={activeTab === 'About' ? 'active' : ''}
            onClick={() => setActiveTab('About')}
          >
            About
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
