import React from 'react'
import InstitutionListItem from './InstitutionListItem';

function InstitutionListPage() {
    return (
        <>
            <div className="container mt-5">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Название учебного заведения..." />
                    <button className="btn btn-success" type="button">Search</button>
                </div>
                <InstitutionListItem />
                <InstitutionListItem />
                <InstitutionListItem />
            </div>
        </>
        
    )
}

export default InstitutionListPage;