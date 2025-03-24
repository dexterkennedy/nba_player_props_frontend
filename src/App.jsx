import React, { useState } from 'react';
import NavBar from './NavBar';
import './App.css';
import GenerateBets from './GenerateBets';
import About from './About';
import Results from './Results';

function App() {
  const [activeTab, setActiveTab] = useState('Generate Bets');
  const [results, setResults] = useState([]);
  const [lifetimeStats, setLifetimeStats] = useState({});
  const [bets, setBets] = useState([]);

  return (
    <div className="App">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        <div style={{ display: activeTab === 'Generate Bets' ? 'block' : 'none' }}>
          <GenerateBets bets={bets} setBets={setBets} />
        </div>
        <div style={{ display: activeTab === 'Results' ? 'block' : 'none' }}>
          <Results
            results={results}
            setResults={setResults}
            lifetimeStats={lifetimeStats}
            setLifetimeStats={setLifetimeStats}
          />
        </div>
        <div style={{ display: activeTab === 'About' ? 'block' : 'none' }}>
          <About />
        </div>
      </main>
    </div>
  );
}

export default App;
