import React from 'react';
import './App.css';
import InstitutionListPage from './components/institutionList/InstitutionListPage';
import Navbar from './components/layouts/Navbar';

function App() {
  return (
    <>
      <Navbar/>
      <InstitutionListPage/>
    </>
    
  );
}

export default App;
