import React from 'react'
import { DailySteps } from '../../../application/models/physicalActivity'
import { formatDate } from '../../../application/helpers/dateHelpers'

interface Props {
    dailySteps: DailySteps[]
}


function PeriodicStepsTable({ dailySteps }: Props) {

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Дата</th>
                        <th scope="col">Шаги</th>
                    </tr>
                </thead>
                <tbody>
                    {dailySteps.length === 0 ? 
                        "" :
                        dailySteps.map(pds => 
                            <tr key={pds.id}>
                                <td>{formatDate(pds.date)}</td>
                                <td>{pds.steps}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </>
    )
}

export default PeriodicStepsTable