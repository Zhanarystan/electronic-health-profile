import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { User } from './application/models/user';
import { UserContextType } from './application/outletContextTypes/contextTypes';
import api from './application/api';



function App() {
    const [user, setUser] = useState<User | null>(() => {
        const currentUser = window.localStorage.getItem("currentUser")
        if (currentUser)
            return JSON.parse(currentUser)
        return null 
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (!window.localStorage.getItem("jwt"))
            navigate("/login")
        if (!user) {
            api.Account.current()
                .then((currentUser: User) => {
                    window.localStorage.setItem("currentUser", JSON.stringify(currentUser))
                    setUser({...currentUser})
                })
                .catch(() => {
                    window.localStorage.removeItem("currentUser")
                    window.localStorage.removeItem("jwt")
                    navigate("/login")
                })
        }
    }, [window.localStorage.getItem("jwt"), window.localStorage.getItem("currentUser")])

    return (
      <>
          <Navbar user={user} setUser={setUser} />
          <Outlet context={ { user, setUser } satisfies UserContextType } />
      </>
    );
}


export default App;
