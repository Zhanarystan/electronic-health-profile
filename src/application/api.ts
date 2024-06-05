import axios, { AxiosError, AxiosResponse } from "axios";
import { User, UserFormValues } from "./models/user";
import { InstitutionItem } from "./models/institution";
import { SickNoteCreate, SickNoteItem } from "./models/sickNote";
import { LabResult, LabResultSet, LabResultSetCreate } from "./models/labResultSet";
import { Appointment, AppointmentCreate } from "./models/appointment";
import { StudentMedicalData } from "./models/medicalData";
import { PeriodicDailySteps } from "./models/physicalActivity";
import { Analysis } from "./models/analysis";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}
axios.defaults.baseURL = 'http://localhost:5133/api';
axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('jwt')
    if(token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})
axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
});
const responseBody = <T>(response: AxiosResponse) => response.data;
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}



const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
}
const Institution = {
    educationalInstitutions: () => requests.get<InstitutionItem[]>('/institution?type=educational'),
    medicalInstitutions: () => requests.get<InstitutionItem[]>('/institution?type=medical'),
    students: (institutionId: string | null) => requests.get<User[]>(`/institution/${institutionId}/students`),
}
const UserRequests = {
    get: (id: string) => requests.get<User>(`/user/${id}`),
}
const SickNotes = {
    create: (dto: SickNoteCreate) => requests.post<SickNoteItem>(`/sick-note`, dto),
    list: (id: string) => requests.get<SickNoteItem[]>(`/sick-note/student/${id}`),
    get: (id: string) => requests.get<SickNoteItem>(`/sick-note/${id}`)
}

const LabResultSets = {
    create: (dto: LabResultSetCreate) => requests.post<LabResult>(`/lab-result`, dto),
    list: (studentId: string) => requests.get<LabResultSet[]>(`/lab-result/student/${studentId}`),
    get: (id: string) => requests.get<LabResultSet>(`/lab-result/${id}`),
}

const Appointments = {
    create: (dto: AppointmentCreate) => requests.post<Appointment>(`/appointment`, dto),
    list: (studentId: string) => requests.get<Appointment[]>(`/appointment/student/${studentId}`),
    get: (id: string) => requests.get<Appointment>(`/appointment/${id}`),
}

const MedicalDataRequests = {
    get: (studentId: string) => requests.get<StudentMedicalData>(`/medical-data/${studentId}`),
}

const PhysicalActivities = {
    groupedDailySteps: (studentId: string) => requests.get<PeriodicDailySteps[]>(`/physical-activity/grouped-daily-steps/${studentId}`),
    groupedDailyStepsForPeriod: (studentId: string, startDate: string, endDate: string) => requests.get<PeriodicDailySteps>(`/physical-activity/daily-steps/${studentId}?startDate=${startDate}&endDate=${endDate}`),
}

const AnalysisRequests = {
    list: () => requests.get<Analysis[]>("/analysis"),
}

const api = {
    Account,
    Institution,
    UserRequests,
    SickNotes,
    LabResultSets,
    Appointments,
    MedicalDataRequests,
    PhysicalActivities,
    AnalysisRequests
}
export default api;

