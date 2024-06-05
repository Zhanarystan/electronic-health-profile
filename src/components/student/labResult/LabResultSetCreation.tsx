import React, { useRef, useState } from 'react'
import { Analysis } from '../../../application/models/analysis'
import api from '../../../application/api'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import LabResultTable from './LabResultTable'
import { LabResult, LabResultCreate, LabResultSetCreate } from '../../../application/models/labResultSet'

type AnalysisListLoaderType = {
    analysisList: Analysis[]
}

export async function analysisListLoader({ params }: any) {
    const analysisList = await api.AnalysisRequests.list()
    return { analysisList }
}


function LabResultSetCreation() {

    const navigate = useNavigate()
    const { institutionId, studentId } = useParams();

    const [labResults, setLabResults] = useState<LabResult[]>([])

    const { analysisList } = useLoaderData() as AnalysisListLoaderType
    
    const [analysis, setAnalysis] = useState<Analysis | null>(null)
    const [value, setValue] = useState<string>("")

    const [labResultSetName, setLabResultSetName] = useState<string>("")


    function handleAnalysisSelect(analysisName: string) {
        const selectedAnalysis = analysisList.find(a => a.name === analysisName)
        if (selectedAnalysis)
            setAnalysis({...selectedAnalysis})
        else
            setAnalysis(null)
    }

    function addLabResult(analysis: Analysis | null, value: string) {
        const newLabResult : LabResult = {
            id: null,
            analysisId: analysis?.id!,
            analysisName: analysis?.name!,
            value: value,
            normValue: analysis?.normValue!,
            unit: analysis?.unit!,
            createdAt: null,
            labResultSetId: null
        }
        setLabResults([...labResults, newLabResult])
        setAnalysis(null)
        setValue("")
    }

    function saveLabResults() {
        const creatingLabResults = labResults.map(lr => {
            const creatingLabResult : LabResultCreate = {
                value: lr.value,
                analysisId: lr.analysisId
            }
            return creatingLabResult
        })

        const creatingLabResultSet : LabResultSetCreate = {
            studentId: studentId!,
            name: labResultSetName,
            labResults: creatingLabResults
        } 

        api.LabResultSets.create(creatingLabResultSet)
            .then(r => navigate(`/institutions/${institutionId}/students/${studentId}/lab-results`))
            .catch(e => navigate(`/institutions/${institutionId}/students/${studentId}/lab-results`))
    }

    return (
        <>
            <div className="row">
                <div className="col-5">
                    <label>Название</label>
                    <input 
                        className="form-control" 
                        onChange={e => setLabResultSetName(e.target.value)} 
                        value={labResultSetName}
                    />
                </div>
                <div className="col-7"></div>
            </div>
            <LabResultTable labResultList={labResults} />
            <div className="row">
                <div className="col-4">
                    <label>Название анализа: </label>
                    <input className="form-control" list="analysisList" onChange={(e) => handleAnalysisSelect(e.target.value)} />
                    <datalist id="analysisList" >
                        { analysisList.map(a => <option key={a.id} value={a.name!}  />) }
                    </datalist>
                </div>
                <div className="col-4">
                    <label>Значение: </label>
                    <input className="form-control" type="text" onChange={(e) => setValue(e.target.value)} value={value} />
                    <p>{analysis !== null ? analysis.unit! : "" }</p>
                </div>
                <div className="col-4">
                    <label>Норма: </label>
                    <input className="form-control" type="text" value={analysis !== null ? analysis.normValue! : "" } disabled />
                    <p>{analysis !== null ? analysis.unit! : "" }</p>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-8"></div>
                <div className="col-4">
                    <div className="d-flex float-end">
                        { 
                            value !== "" && analysis !== null 
                                ? <button className="btn btn-primary" onClick={e => addLabResult(analysis, value)} >Добавить</button> 
                                : "" 
                        }
                        { 
                            labResults.length > 0 
                                ? <button className="btn btn-success" onClick={saveLabResults}>Отправить</button> 
                                : "" 
                        }
                    </div>
                </div>
            </div>
              
        </>
    )
}

export default LabResultSetCreation