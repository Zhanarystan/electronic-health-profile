import React, { useEffect, useState } from "react"
import StudentListItem from "./StudentListItem";
import { User } from "../../application/models/user";
import api from "../../application/api";
import { useLoaderData } from "react-router-dom";


type StudentLoaderType = {
    students: User[]
}

export async function studentsLoader({ params }: any) {
    const students = await api.Institution.students(params.institutionId)
    return { students }
}

function StudentListPage() {

    const { students } = useLoaderData() as StudentLoaderType;

    const [filteredStudents, setFilteredStudents] = useState<User[]>(students)

    const filterStudents = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 0)
            setFilteredStudents(students)

        const lowerSearchText = e.target.value.toLowerCase();

        const filtered = students.filter(user => {
            const firstNameMatch = user.firstName?.toLowerCase().includes(lowerSearchText);
            const lastNameMatch = user.lastName?.toLowerCase().includes(lowerSearchText);
            const middleNameMatch = user.middleName?.toLowerCase().includes(lowerSearchText);
            return firstNameMatch || lastNameMatch || middleNameMatch;
        });

        setFilteredStudents(filtered)
    }

    return (
        <>
            <div className="container mt-5">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="ФИО Учащегося..." onChange={filterStudents} />
                    <button className="btn btn-success" type="button">Search</button>
                </div>
                {filteredStudents.length === 0 ? 
                    "" : 
                    filteredStudents.map(s => <StudentListItem key={s.id} student={s} />)
                }
            </div>
        </>
    );
}

export default StudentListPage