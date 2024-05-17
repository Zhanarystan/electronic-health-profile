export interface User {
    token: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    birthDate: Date | null;
    gender: number | null;
    iin: string | null;

    institutionId: string | null;
    roles:string[];
}

export interface UserFormValues {
    username: string;
    password: string;
}
