import React from 'react';
import ChartComponent from './ChartComponent';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>LegpromRF dashboard</h1>
      </header>
      <main>
        <ChartComponent />
      </main>
    </div>
  );
}

export default App;
