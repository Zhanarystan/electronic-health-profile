import api from "../api"
import { User } from "../models/user"


const getCurrentUser = () => {
    return api.Account.current()
            .then((cu: User) => window.localStorage.setItem("currentUser", JSON.stringify(cu)))
            .catch(() => {
                window.localStorage.removeItem("currentUser")
                window.localStorage.removeItem("jwt")
            })
}