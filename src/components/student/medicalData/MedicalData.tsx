import React, { useState } from 'react'
import api from '../../../application/api'
import { StudentMedicalData } from '../../../application/models/medicalData'
import { useLoaderData } from 'react-router-dom'

type MedicalDataLoaderType = {
    medicalData: StudentMedicalData
}

export async function medicalDataLoader({ params }: any) {
    const medicalData = await api.MedicalDataRequests.get(params.studentId)
    return { medicalData }
}

function MedicalData() {

    const { medicalData } = useLoaderData() as MedicalDataLoaderType

    const [BMI, setBMI] = useState<number | null>(() => {
        if (medicalData === null)
            return null
        return Math.round(medicalData.weight! / (medicalData.height! * medicalData.height!)) 
    })

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-5">
                            <div className="row mb-3">
                                <label className="col-3">Вес (кг):</label>
                                <div className="col-1"></div>
                                <div className="col-8">
                                    <input className="form-control" type="text" disabled value={medicalData.weight!} id="student-weight"/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-3">Рост (см):</label>
                                <div className="col-1"></div>
                                <div className="col-8">
                                    <input className="form-control" type="text" disabled value={medicalData.height!} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-3">Группа крови:</label>
                                <div className="col-1"></div>
                                <div className="col-8">
                                    <input className="form-control" type="text" disabled value={medicalData.bloodType!} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-3">Индекс масса и тела:</label>
                                <div className="col-1"></div>
                                <div className="col-8">
                                    <input className="form-control" type="text" disabled value={BMI !== null ? BMI : ""} />
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </>
    )
}

export default MedicalData