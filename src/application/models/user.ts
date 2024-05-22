export interface User {
    id: string | null;
    token: string | null;
    username: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    iin: string | null;
    birthDate: Date | null;
    gender: number | null;
    genderName: string | null;
    institutionId: string | null;
    institutionName: string | null;
    positionId: string | null;
    positionName: string | null;
    roles: string[];
}

export interface UserFormValues {
    username: string;
    password: string;
}


export interface Student {
    username: string | null;
    email: string | null
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    birthDate: Date | null;
    gender: string | null;
    iin: string | null;
    institution: string | null;
}

export interface UserInfo {
    id: string | null;
    username: string | null;
    email: string | null
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    birthDate: Date | null;
    gender: string | null;
    iin: string | null;
    institution: string | null; 
    position: string | null;
} 