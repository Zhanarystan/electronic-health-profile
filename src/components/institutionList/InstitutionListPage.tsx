import React, { useEffect, useState } from 'react'
import InstitutionListItem from './InstitutionListItem';
import { InstitutionItem } from '../../application/models/institution';
import api from '../../application/api';

function InstitutionListPage() {

    const [institutions, setInstitutions] = useState<InstitutionItem[]>([])

    useEffect(() => {
        api.Institution.educationalInstitutions()
                .then((list: InstitutionItem[]) =>
                    setInstitutions(list))
    }, [])

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