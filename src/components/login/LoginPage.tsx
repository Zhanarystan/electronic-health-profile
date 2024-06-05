import React, { useState } from 'react'
import './loginPage.css'
import api from '../../application/api';
import { User, UserFormValues } from '../../application/models/user';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { UserContextType } from '../../application/outletContextTypes/contextTypes';

function LoginPage() {

    const [username, setUsername] = useState<string>('' as string)
    const [password, setPassword] = useState<string>('' as string)

    const { setUser } =  useOutletContext<UserContextType>()

    const navigate = useNavigate()
    
    const submit = async () => {
        const userValues : UserFormValues = {
            username,
            password
        }

        const user: User = await api.Account.login(userValues)
        
        if (user.token) {
            console.log("jwt " + user.token)
            window.localStorage.setItem("jwt", user.token)
            window.localStorage.setItem("currentUser", JSON.stringify(user))
            setUser({...user})
            navigate("/")
        }
        else
            window.localStorage.removeItem("jwt")
    }
 
    return (
        <div id="cus-grid">
            <div className="row" >
                <div className="col-4"></div>
                <div className="col-4">
                    <h4>Вход в систему</h4>
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="Введите логин..." 
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input 
                            className="form-control"
                            type="password"
                            name=""
                            placeholder="Введите пароль..."
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-4">
                        <button className="btn btn-primary" onClick={submit}>Login</button>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    )
}

export default LoginPage