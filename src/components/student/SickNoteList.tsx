import React from 'react'
import { SickNoteItem } from '../../application/models/sickNote'
import api from '../../application/api'
import { useLoaderData } from 'react-router-dom'
import { Link } from 'react-router-dom'

type SickNotesLoaderType = {
    sickNotes: SickNoteItem[]
}

export async function sickNotesLoader({ params }: any) {
    const sickNotes = await api.UserRequests.sickNotes(params.studentId)
    return { sickNotes }
}

function SickNoteList() {

    const { sickNotes } = useLoaderData() as SickNotesLoaderType

    return (
        <>
            <div className="form-group mb-2">
                <Link className="btn btn-success" to="">Создать справку</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Заголовок</th>
                    <th scope="col">Выдано кем</th>
                    <th scope="col">Выдано когда</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {sickNotes.length === 0 ? 
                        "" :
                        sickNotes.map(sn => 
                            <tr>
                                <th scope="row">{sn.noteNumber}</th>
                                <td>{sn.medicalStaff?.lastName} {sn.medicalStaff?.firstName} {sn.medicalStaff?.middleName}</td>
                                <td>{("" + sn.issueDate).split("T")[0]}</td>
                                <td><Link className="btn btn-secondary" to={`${sn.id}`}>Посмотреть</Link></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default SickNoteList;