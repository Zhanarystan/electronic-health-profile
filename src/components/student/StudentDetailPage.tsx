import React, { useEffect } from 'react'
import { Outlet, useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import StudentPersonalData from './StudentPersonalData';
import { Link } from 'react-router-dom';
import api from '../../application/api';
import { User } from '../../application/models/user';
import { UserContextType } from '../../application/outletContextTypes/contextTypes';


type StudentLoaderType = {
    student: User
}
export async function studentLoader({ params }: any) {
    const student = await api.UserRequests.get(params.studentId)
    return { student }
}
function StudentDetailPage() {
    const { student } = useLoaderData() as StudentLoaderType

    const navigate = useNavigate()

    const { user, setUser } =  useOutletContext<UserContextType>()

    useEffect(() => {
        if (!user)
            navigate("/login")
    }, [user])

    return (
        <>
            <div className="container mt-5">        
                <StudentPersonalData student={student} />
                <div className="card mt-5">
                    <div className="card-header">
                        <ul className="nav nav-pills card-header-pills">
                            <li className="nav-item">
                                <Link className="nav-link" to="medical-data">Медицинские данные</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="sick-notes">Справки</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="appointments">Приемы</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="lab-results">Результаты анализов</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="physical-activity">Физическая активность</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <Outlet context={ { user, setUser } satisfies UserContextType } />
                    </div>
                </div>
            </div>   
        </>
    );
}
export default StudentDetailPage
