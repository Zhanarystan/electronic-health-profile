import React from 'react'
import api from '../../../application/api'
import { useLoaderData } from 'react-router-dom'
import { LabResultSet } from '../../../application/models/labResultSet'
import LabResultTable from './LabResultTable'

type LabResultSetLoaderType = {
    labResultSet: LabResultSet
}

export async function labResultSetLoader({ params }: any) {
    const labResultSet = await api.LabResultSets.get(params.labResultSetId)
    return { labResultSet }
}

function LabResultSetDetail() {
    
    const { labResultSet } = useLoaderData() as LabResultSetLoaderType

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{labResultSet.name}</h5>
                    <LabResultTable labResultList={labResultSet.labResults} />
                </div>
            </div>
        </>
    )
}

export default LabResultSetDetail