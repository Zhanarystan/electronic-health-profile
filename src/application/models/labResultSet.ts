import { User, UserInfo } from "./user";


export interface LabResultSet {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
    labResults: LabResult[];
}

export interface LabResult {
    id: string | null;
    analysisId: string | null;
    analysisName: string | null;
    value: string | null;
    normValue: string | null;
    unit: string | null;   
    createdAt: Date | null;
    labResultSetId: string | null;
}   

export interface LabResultSetCreate {
    studentId: string | null;
    name: string | null;
    labResults: LabResultCreate[];
}

export interface LabResultCreate {
    value: string | null;
    analysisId: string | null;
}   