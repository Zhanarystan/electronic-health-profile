import React from 'react'
import { InstitutionItem } from '../../application/models/institution';
import { Link } from 'react-router-dom';

interface Props {
    institution: InstitutionItem | null;
}

function InstitutionListItem({institution} : Props) {
    return (
        <>
            <div className="card mt-3">
                <div className="card-body">
                    <h5 className="card-title">{institution?.name}</h5>
                    <p className="card-text">{institution?.city?.name} {institution?.address}</p>
                    <Link to={`${institution?.id}/students`} className="btn btn-primary">Посмотреть</Link>
                </div>
            </div>
        </>
    )
}

export default InstitutionListItem;