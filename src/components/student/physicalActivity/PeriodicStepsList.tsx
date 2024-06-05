import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { PeriodicDailySteps } from "../../../application/models/physicalActivity";
import api from "../../../application/api";
import { User } from "../../../application/models/user";
import { formatDate, formatDate1 } from "../../../application/helpers/dateHelpers";
import { UserContextType } from "../../../application/outletContextTypes/contextTypes";

type PeriodicDailyStepsListLoaderType = {
    periodicDailyStepsList: PeriodicDailySteps[]
}

export async function periodicDailyStepsListLoader({ params }: any) {
    const periodicDailyStepsList = await api.PhysicalActivities.groupedDailySteps(params.studentId)
    return { periodicDailyStepsList }
}

function PeriodicStepsList() {

    const { periodicDailyStepsList } = useLoaderData() as PeriodicDailyStepsListLoaderType

    const { user } =  useOutletContext<UserContextType>()

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) 
            navigate("/login")
    }, [user])

    return (
        <>
            {
                user !== null && user !== undefined && user.roles.includes("medical_staff") 
                    ?
                    <div className="form-group mb-2">
                        <Link className="btn btn-success" to="">Создать шаги</Link>
                    </div>
                    :
                    ""
            }
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Начало</th>
                        <th scope="col">Конец</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {periodicDailyStepsList.length === 0 ? 
                        "" :
                        periodicDailyStepsList.map((pds, index) => 
                            <tr key={index}>
                                <td>{formatDate(pds.startDate)}</td>
                                <td>{formatDate(pds.endDate)}</td>
                                <td><Link className="btn btn-secondary" to={`${formatDate1(pds.startDate)}/${formatDate1(pds.endDate)}`}>Посмотреть</Link></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default PeriodicStepsList