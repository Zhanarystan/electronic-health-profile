import { User } from "./user";

export interface Appointment {
    id: string | null;
    title: string | null;
    notes: string | null;
    medicalStaff: User | null;
    student: User | null;
    conductedDate: Date | null;
}

export interface AppointmentCreate {
    title: string | null;
    notes: string | null;
    medicalStaffId: string | null;
    studentId: string | null;
}