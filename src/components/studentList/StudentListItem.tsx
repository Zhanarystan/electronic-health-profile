import React from 'react'
import { User } from '../../application/models/user'
import { Link } from 'react-router-dom'
import { format } from 'path'
import { formatDate } from '../../application/helpers/dateHelpers'


interface Props {
    student: User
}

function StudentListItem({ student }: Props) {
    return (
        <>
            <div className="card mt-3">
                <div className="row g-0">
                      <div className="col-12">
                          <div className="card-body">
                              <h5 className="card-title">{student.lastName} {student.firstName} {student.middleName}</h5>
                              <p className="card-text">{formatDate(student.birthDate)}</p>
                              <p className="card-text"><small className="text-body-secondary">ИИН: {student.iin}</small></p>
                              <Link className="btn btn-primary" to={`${student.id}`}>Посмотреть</Link>
                          </div>
                      </div>
                </div>
            </div>
        </>
    )
}

export default StudentListItem