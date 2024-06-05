import React from 'react'
import { LabResult } from '../../../application/models/labResultSet'
import { formatDate } from '../../../application/helpers/dateHelpers'

interface Props {
    labResultList: LabResult[]
}

function LabResultTable({ labResultList }: Props) {

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Название</th>
                        <th scope="col">Значение</th>
                        <th scope="col">Норма</th>
                        <th scope="col">Дата</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {labResultList.length === 0 ? 
                        "" :
                        labResultList.map(lr => 
                            <tr>
                                <th scope="row">{lr.analysisName}</th>
                                <td>{lr.value + " " + lr.unit}</td>
                                <td>{lr.normValue + " " + lr.unit}</td>
                                <td>{lr.createdAt !== null ? formatDate(lr.createdAt) : ""}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default LabResultTable