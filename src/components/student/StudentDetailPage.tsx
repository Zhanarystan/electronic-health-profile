import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom';
import StudentPersonalData from './StudentPersonalData';
import { Link } from 'react-router-dom';
import api from '../../application/api';
import { User } from '../../application/models/user';


// function StudentDetailPage() {

//     return (
//         <>
//             <div className="container mt-5">
//                 <StudentPersonalData/>
//                 <div className="row mt-5">
//                     <div className="col-3">
//                         <div className="list-group">
//                             <button type="button" className="list-group-item list-group-item-action active"  aria-current="true">
//                                 Персональные данные
//                             </button>
//                             <button type="button" className="list-group-item list-group-item-action">Справки</button>
//                             <button type="button" className="list-group-item list-group-item-action">Диагнозы</button>
//                             <button type="button" className="list-group-item list-group-item-action">Результаты анализов</button>
//                             <button type="button" className="list-group-item list-group-item-action" disabled>  Спортивные показатели</button>
//                         </div>
//                     </div>
//                     <div className="col-9">
//                         <Outlet />
//                     </div>
//                 </div>
//             </div>
            
//         </>
//     );
// }

type StudentLoaderType = {
    student: User
}

export async function studentLoader({ params }: any) {
    const student = await api.UserRequests.get(params.studentId)
    return { student }
}

function StudentDetailPage() {
    
    const { student } = useLoaderData() as StudentLoaderType

    return (
        <>
            <div className="container mt-5">
                <StudentPersonalData student={student} />
                <div className="card mt-5">
                    <div className="card-header">
                        <ul className="nav nav-pills card-header-pills">
                            <li className="nav-item">
                                <Link className="nav-link active" to="sick-notes">Справки</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="diagnosis">Диагнозы</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="test-results">Результаты анализов</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="sport-indicators">Спортивные показатели</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <Outlet />
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default StudentDetailPage