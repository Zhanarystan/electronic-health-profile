import React, { useEffect, useState } from 'react'
import { UserContextType } from '../../../application/outletContextTypes/contextTypes'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { AppointmentCreate } from '../../../application/models/appointment'
import api from '../../../application/api'
import { User } from '../../../application/models/user'


function AppointmentCreation() {

    const [title, setTitle] = useState<string>("")
    const [notes, setNotes] = useState<string>("")
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const currentUser = window.localStorage.getItem("currentUser")
        if (currentUser) {
            const parsedUser = JSON.parse(currentUser)
            setUser({...parsedUser})
        }
    }, [user])

    const { institutionId, studentId } = useParams();

    const navigate = useNavigate()

    const submit = () => {
        if (user === null || user === undefined)
            return
        const dto : AppointmentCreate = {
            title: title, 
            notes: notes,
            medicalStaffId: user.id,
            studentId: studentId!
        }

        api.Appointments.create(dto).then(e => {
            navigate(`/institutions/${institutionId}/students/${studentId}/appointments`)
        })
    } 

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row mb-3">
                        <label className="col-3">Заголовок:</label>
                        <div className="col-9">
                            <input className="form-control" type="text" onChange={e => setTitle(e.target.value)} value={title}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-3">Примечания:</label>
                        <div className="col-9">
                            <textarea className="form-control" rows={3} onChange={e => setNotes(e.target.value)} value={notes}></textarea>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-3"></div>
                        <div className="col-9">
                            <button className="btn btn-success" onClick={submit}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppointmentCreation