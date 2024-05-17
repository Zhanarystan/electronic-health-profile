import axios, { AxiosError, AxiosResponse } from "axios";
import { User, UserFormValues } from "./models/user";
import { InstitutionItem } from "./models/institution";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('jwt')
    if(token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
});

// axios.interceptors.response.use(async response => {    
//     await sleep(1000);
//     const pagination = response.headers['pagination'];

//     if(pagination){
//         response.data = new PaginatedResult(response.data, JSON.parse(pagination));
//         return response as AxiosResponse<PaginatedResult<any>>;
//     }

//     return response;
// }, (error: AxiosError) => {
//     const {data, status, config} = error.response!;

//     switch(status) {
//         case 400:
//             if(typeof data === 'string') {
//                 toast.error(data);
//             }
//             if(config.method === 'get' && data.errors.hasOwnProperty('id')){
//                 history.push('/not-found');
//             }
//             if(data.errors) {
//                 const modalStateErrors = [];
//                 for(const key in data.errors) {
//                     if(data.errors[key]) {
//                         modalStateErrors.push(data.errors[key]);
//                     }
//                 }
//                 throw modalStateErrors.flat();
//             }
//             else{
//                 toast.error(data); 
//             }
//             break;
//         case 401:
//             toast.error('unauthorized');
//             break;
//         case 404:
//             history.push('/not-found');
//             break;
//         case 500:
//             store.commonStore.setServerError(data);
//             history.push('/server-error');
//             break;
// }

//     return Promise.reject(error);
// })

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
    educationalInstitutions: () => requests.get<InstitutionItem[]>('/institution/educational'),
}


const api = {
    Account,
    Institution
}

export default api;