import React, { useState } from 'react';
import NavBar from './NavBar';
import './App.css';
import GenerateBets from './GenerateBets';
import About from './About';
import Results from './Results';

function App() {
  const [activeTab, setActiveTab] = useState('Generate Bets');
  const [results, setResults] = useState([]);
  const [lifetimeStats, setLifetimeStats] = useState({})
  const [bets, setBets] = useState([]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Generate Bets':
        return <GenerateBets bets={bets} setBets={setBets} />;
      case 'Results':
        return <Results
          results={results}
          setResults={setResults}
          lifetimeStats={lifetimeStats}
          setLifetimeStats={setLifetimeStats} />;
      case 'About':
        return <About />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="App">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
