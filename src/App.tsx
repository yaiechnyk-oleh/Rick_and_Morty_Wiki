import React, {useState} from 'react';
import './App.css';
import Header from "./Header/Header";
import Dashboard from "./Dashbord/Dashbord";

function App() {

  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  return (
    <main className="App">
    <Header setFilter={setFilter} setSort={setSort}/>
    <Dashboard />
    </main>
  );
}

export default App;
