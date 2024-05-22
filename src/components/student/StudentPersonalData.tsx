import React from 'react'
import { Student, User } from '../../application/models/user'

interface Props {
    student: User
}

function StudentPersonalData({ student }: Props) {
    return (
        <>
            <div className="row">
                <div className="col-3">
                    <img src="https://winaero.com/blog/wp-content/uploads/2017/12/User-icon-256-blue.png" className="card-img-top" height={"250px"} />
                </div>
                <div className="col-1"></div>
                <div className="col-8">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">ФИО: {`${student.lastName} ${student.firstName} ${student.middleName}`}</li>
                            <li className="list-group-item">Email: {student.email}</li>
                            <li className="list-group-item">ИИН: {student.iin}</li>
                            <li className="list-group-item">Учебное заведение: {student.institutionName}</li>
                            <li className="list-group-item">Дата рождения: {("" + student.birthDate).split("T")[0]}</li>
                            <li className="list-group-item">Пол: {student.genderName}</li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default StudentPersonalData