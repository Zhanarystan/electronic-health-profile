import React from 'react'
import api from '../../../application/api'
import { useLoaderData, useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { LabResultSet } from '../../../application/models/labResultSet'
import { formatDate } from '../../../application/helpers/dateHelpers'
import { UserContextType } from '../../../application/outletContextTypes/contextTypes'

type LabResultSetsLoaderType = {
    labResultSets: LabResultSet[]
}

export async function labResultSetListLoader({ params }: any) {
    const labResultSets = await api.LabResultSets.list(params.studentId)
    return { labResultSets }
}

function LabResultSetList() {

    const { labResultSets } = useLoaderData() as LabResultSetsLoaderType

    const { user } =  useOutletContext<UserContextType>()
    
    return (
        <>
            {
                user !== null && user !== undefined && user.roles.includes("medical_staff") 
                    ?
                    <div className="form-group mb-2">
                        <Link className="btn btn-success" to="">Создать результат анализа</Link>
                    </div>
                    :
                    ""
            }
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Заголовок</th>
                        <th scope="col">Дата</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {labResultSets.length === 0 ? 
                        "" :
                        labResultSets.map(lrs => 
                            <tr>
                                <th scope="row">{lrs.name}</th>
                                <td>{formatDate(lrs.createdAt)}</td>
                                <td><Link className="btn btn-secondary" to={`${lrs.id}`}>Посмотреть</Link></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default LabResultSetList;