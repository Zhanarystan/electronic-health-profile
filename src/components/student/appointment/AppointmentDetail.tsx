import React from 'react'
import api from '../../../application/api'
import { SickNoteItem } from '../../../application/models/sickNote'
import { useLoaderData } from 'react-router-dom'
import { formatDate } from '../../../application/helpers/dateHelpers'
import { LabResultSet } from '../../../application/models/labResultSet'
import { Appointment } from '../../../application/models/appointment'

type AppointmentLoaderType = {
    appointment: Appointment
}

export async function appointmentLoader({ params }: any) {
    const appointment = await api.Appointments.get(params.appointmentId)
    return { appointment }
}

function AppointmentDetail() {
    
    const { appointment } = useLoaderData() as AppointmentLoaderType

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{appointment.medicalStaff?.positionName}</h5>
                    <h5 className="card-title">{appointment.medicalStaff?.lastName} {appointment.medicalStaff?.firstName} {appointment.medicalStaff?.middleName}</h5>
                    <p>{appointment.notes}</p>
                </div>
            </div>
        </>
    )
}

export default AppointmentDetail