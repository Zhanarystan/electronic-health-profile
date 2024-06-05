import React from 'react'
import api from '../../../application/api'
import { SickNoteItem } from '../../../application/models/sickNote'
import { useLoaderData } from 'react-router-dom'
import { formatDate } from '../../../application/helpers/dateHelpers'

type SickNoteLoaderType = {
    sickNote: SickNoteItem
}

export async function sickNoteLoader({ params }: any) {
    const sickNote = await api.SickNotes.get(params.sickNoteId)
    return { sickNote }
}

function SickNoteDetail() {
    
    const { sickNote } = useLoaderData() as SickNoteLoaderType

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Справка №{sickNote.noteNumber}</h5>
                    <h5 className="card-title mt-5">{sickNote.noteTitle}</h5>
                    <h5 className="card-title mt-5">Дата выдачи:</h5>
                    <h5 className="card-title">{formatDate(sickNote.issueDate)}</h5>
                    <h5 className="card-title mt-5">студенту, учащемуся, ребенку, посещающему дошкольное учреждение:</h5>
                    <h5 className="card-title">{sickNote.student?.institutionName}</h5>
                    <h5 className="card-title mt-5">Фамили, имя, отчество:</h5>
                    <h5 className="card-title">{sickNote.student?.lastName} {sickNote.student?.firstName} {sickNote.student?.middleName}</h5>
                    <h5 className="card-title mt-5">Дата рождения (год, месяц, для детей до 1-го года - день):</h5>
                    <h5 className="card-title">{formatDate(sickNote.student?.birthDate)}</h5>
                    <h5 className="card-title mt-5">Диагноз заболевания (прочие причины отсутствия):</h5>
                    <h5 className="card-title">{sickNote.absenceReason}</h5>
                    <h5 className="card-text mt-5">Освобожден от занятий, посещений детского дошкольного учреждения</h5>
                    <h5>с {formatDate(sickNote.absenceStartDate)} по {formatDate(sickNote.absenceEndDate)}</h5>
                    {/* <h5 className="card-text mt-5">Выдано кем:</h5>
                    <h5>{sickNote.medicalStaff?.institutionName}</h5> 
                    <h5>{sickNote.medicalStaff?.positionName} {sickNote.medicalStaff?.lastName} {sickNote.medicalStaff?.firstName} {sickNote.medicalStaff?.middleName}</h5> */}
                    
                    {/* <a href="#" className="card-link mt-5">Card link</a>
                    <a href="#" className="card-link">Another link</a> */}
                </div>
            </div>
        </>
    )
}

export default SickNoteDetail