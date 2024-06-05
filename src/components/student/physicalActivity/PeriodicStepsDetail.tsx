import React, { useEffect, useState } from "react";
import api from "../../../application/api";
import { PeriodicDailySteps } from "../../../application/models/physicalActivity";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { User } from "../../../application/models/user";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import PeriodicStepsTable from "./PeriodicStepsTable";
import { formatDate } from "../../../application/helpers/dateHelpers";
import { UserContextType } from "../../../application/outletContextTypes/contextTypes";

type PeriodicDailyStepsLoaderType = {
    periodicDailySteps: PeriodicDailySteps
}

export async function periodicDailyStepsLoader({ params }: any) {
    const periodicDailySteps = await api.PhysicalActivities
                                        .groupedDailyStepsForPeriod(
                                            params.studentId, 
                                            params.startDate, 
                                            params.endDate)
    console.log("dailysteplist: " + periodicDailySteps.dailyStepsList)
    return { periodicDailySteps }
}

function PeriodicDailyStepsDetail() {

    const navigate = useNavigate()

    const { user } =  useOutletContext<UserContextType>()
    
    const { periodicDailySteps } = useLoaderData() as PeriodicDailyStepsLoaderType

    const [averageSteps, setAverageSteps] = useState<number | null>(() => {
        if (periodicDailySteps === null || periodicDailySteps.dailySteps.length === 0)
            return null
        let sum = 0
        for (let i = 0; i < periodicDailySteps.dailySteps.length; i++)
            sum += periodicDailySteps.dailySteps[i].steps!
        return Math.round(sum / periodicDailySteps.dailySteps.length)
    })

    
    useEffect(() => {
        if (!user)
            navigate("/login")
    }, [user])

    return (
        <>  
            <div className="row mt-5">
                <div className="col-3">
                    {
                        averageSteps === null ? "" 
                        : 
                        <>
                            <label>Среднее количество шагов</label>
                            <input className="form-control" type="text" value={averageSteps} disabled/>
                        </>
                    }
                </div>
                <div className="col-9"></div>
            </div>
            <div className="row mt-5">
                <div className="col-4">
                    <PeriodicStepsTable dailySteps={periodicDailySteps.dailySteps} />
                </div>
                <div className="col-8">
                    <LineChart
                        width={700}
                        height={400}
                        data={periodicDailySteps.dailySteps}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="date"
                            tickFormatter={(date) => formatDate(date)}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="steps" stroke="#82ca9d" />
                    </LineChart>
                </div>
            </div>
        </>
    )

}

export default PeriodicDailyStepsDetail