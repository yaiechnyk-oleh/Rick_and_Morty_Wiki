import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./Header/Header";
import Dashboard from "./Dashboard/Dashbord";

function App() {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      setFilter('');
      setSort('');
      setReset(false);
    }
  }, [reset]);

  return (
      <main className="App">
        <Header setFilter={setFilter} setSort={setSort} setReset={setReset} />
        <Dashboard filter={filter} sort={sort} reset={reset} />
      </main>
  );
}

export default App;