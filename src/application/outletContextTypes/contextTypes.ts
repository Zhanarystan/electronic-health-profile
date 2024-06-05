import { User } from "../models/user";



export type UserContextType = { user: User | null | undefined, setUser: React.Dispatch<React.SetStateAction<User | null>>  };