import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar';
import { Outlet } from 'react-router-dom';
import api from './application/api';
import { User } from './application/models/user';
import { UserContextType } from './application/outletContextTypes/contextTypes';



function App() {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
    
    }, [user])
    return (
      <>
          <Navbar user={user} setUser={setUser} />
          <Outlet context={{ user, setUser } satisfies UserContextType} />
      </>
    );
}


export default App;
