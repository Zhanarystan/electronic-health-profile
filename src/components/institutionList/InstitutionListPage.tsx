import React, { useEffect, useState } from 'react'
import InstitutionListItem from './InstitutionListItem';
import { InstitutionItem } from '../../application/models/institution';
import api from '../../application/api';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import { User } from '../../application/models/user';
import { UserContextType } from '../../application/outletContextTypes/contextTypes';


type InstitutionsLoaderType = {
    institutions: InstitutionItem[]
}

export async function institutionListLoader({ params }: any) {
    const institutions = await api.Institution.educationalInstitutions()
    return { institutions }
}

function InstitutionListPage() {

    const { user } =  useOutletContext<UserContextType>()
    
    const { institutions } = useLoaderData() as InstitutionsLoaderType

    const navigate = useNavigate()

    useEffect(() => {
        if (!user)
            navigate("/login")
    }, [user])

    return (
        <>
            <div className="container mt-5">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Название учебного заведения..." />
                    <button className="btn btn-success" type="button">Search</button>
                </div>

                {institutions.length === 0 ? 
                    "" : 
                    institutions.map(i => 
                        <InstitutionListItem key={i.id} institution={i}/>
                    )}
            </div>
        </>
        
    )
}

export default InstitutionListPage;