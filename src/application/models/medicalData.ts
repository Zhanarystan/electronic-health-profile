import { User } from "./user";

export interface StudentMedicalData {
    id: string | null;
    student: User | null;
    weight: number | null;
    height: number | null;
    bloodType: string | null;
};