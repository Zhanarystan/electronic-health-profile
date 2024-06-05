import React, { useEffect, useState } from 'react'
import api from '../../../application/api'
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { LabResultSet } from '../../../application/models/labResultSet'
import { formatDate } from '../../../application/helpers/dateHelpers'
import { Appointment } from '../../../application/models/appointment'
import { UserContextType } from '../../../application/outletContextTypes/contextTypes'
import { User } from '../../../application/models/user'

type AppointmentsLoaderType = {
    appointments: Appointment[]
}

export async function appointmentListLoader({ params }: any) {
    const appointments = await api.Appointments.list(params.studentId)
    return { appointments }
}

function AppointmentList() {

    const { appointments } = useLoaderData() as AppointmentsLoaderType

    
    const { user } =  useOutletContext<UserContextType>()

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) 
            navigate("/login")
    }, [user])

    return (
        <>
            {
                 user !== null && user !== undefined && user.roles.includes("medical_staff")
                    ?
                    <div className="form-group mb-2">
                        <Link className="btn btn-success" to="create">Создать прием</Link>
                    </div> 
                    :
                    ""
            }
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Заголовок</th>
                        <th scope="col">Врач</th>
                        <th scope="col">Дата</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length === 0 ? 
                        "" :
                        appointments.map(a => 
                            <tr>
                                <th scope="row">{a.title}</th>
                                <td>{a.medicalStaff?.lastName} {a.medicalStaff?.firstName} {a.medicalStaff?.middleName}</td>
                                <td>{formatDate(a.conductedDate)}</td>
                                <td><Link className="btn btn-secondary" to={`${a.id}`}>Посмотреть</Link></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default AppointmentList;