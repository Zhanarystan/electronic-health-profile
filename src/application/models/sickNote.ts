import { User, UserInfo } from "./user";


export interface SickNoteItem {
    id: string | null;
    noteTitle: string | null;
    noteNumber: number | null;
    issueDate: Date | null;
    student: User | null;
    medicalStaff: User | null;
    absenceReason: string | null;
    absenceStartDate: Date | null;
    absenceEndDate: Date | null;
}

export interface SickNoteCreate {
    noteNumber: number | null;
    studentId: string | null;
    absenceReason: string | null;
    absenceStartDate: Date | null;
    absenceEndDate: Date | null;
}