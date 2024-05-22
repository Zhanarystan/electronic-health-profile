import { User } from "../models/user";

// export type SetUserContextType = { setUser: React.Dispatch<React.SetStateAction<User | null>> };
export type UserContextType = { user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>>  };