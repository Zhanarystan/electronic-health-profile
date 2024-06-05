import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import StudentListPage, { studentsLoader } from './components/studentList/StudentListPage';
import InstitutionListPage, { institutionListLoader } from './components/institutionList/InstitutionListPage';
import StudentDetailPage, { studentLoader } from './components/student/StudentDetailPage';
import StudentPersonalData from './components/student/StudentPersonalData';
import SickNoteList, { sickNotesLoader } from './components/student/sickNote/SickNoteList';
import LoginPage from './components/login/LoginPage';
import SickNoteDetail, { sickNoteLoader } from './components/student/sickNote/SickNoteDetail';
import LabResultList, { labResultSetListLoader } from './components/student/labResult/LabResultSetList';
import LabResultSetList from './components/student/labResult/LabResultSetList';
import LabResultSetDetail, { labResultSetLoader } from './components/student/labResult/LabResultSetDetail';
import AppointmentDetail, { appointmentLoader } from './components/student/appointment/AppointmentDetail';
import AppointmentList, { appointmentListLoader } from './components/student/appointment/AppointmentList';
import MedicalData, { medicalDataLoader } from './components/student/medicalData/MedicalData';
import CreateAppointment from './components/student/appointment/AppointmentCreation';
import PeriodicStepsList, { periodicDailyStepsListLoader } from './components/student/physicalActivity/PeriodicStepsList';
import PeriodicDailyStepsDetail, { periodicDailyStepsLoader } from './components/student/physicalActivity/PeriodicStepsDetail';
import LabResultSetCreate, { analysisListLoader } from './components/student/labResult/LabResultSetCreation';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
          {
              path: "",
              element: <h2>WELCOME PAGE</h2>
          },
          {
            path: "login",
            element: <LoginPage />
          },
          {
              path: "institutions",
              element: <InstitutionListPage />,
              loader: institutionListLoader,
          },
          {
              path: "institutions/:institutionId/students",
              element: <StudentListPage />,
              loader: studentsLoader
          },
          {
              path: "institutions/:instituteId/students/:studentId",
              element: <StudentDetailPage />,
              loader: studentLoader,
              children: [
                    {
                        path: "sick-notes",
                        element: <SickNoteList />,
                        loader: sickNotesLoader
                    },
                    {
                        path: "sick-notes/:sickNoteId",
                        element: <SickNoteDetail />,
                        loader: sickNoteLoader
                    },
                    {
                        path: "lab-results",
                        element: <LabResultSetList />,
                        loader: labResultSetListLoader
                    },
                    {
                        path: "lab-results/create",
                        element: <LabResultSetCreate />,
                        loader: analysisListLoader
                    },
                    {
                        path: "lab-results/:labResultSetId",
                        element: <LabResultSetDetail />,
                        loader: labResultSetLoader
                    },
                    {
                        path: "appointments",
                        element: <AppointmentList />,
                        loader: appointmentListLoader
                    },
                    {
                        path: "appointments/create",
                        element: <CreateAppointment />,
                        loader: appointmentListLoader
                    },
                    {
                        path: "appointments/:appointmentId",
                        element: <AppointmentDetail />,
                        loader: appointmentLoader
                    },
                    {
                        path: "medical-data",
                        element: <MedicalData />,
                        loader: medicalDataLoader
                    },
                    {
                        path: "physical-activity",
                        element: <PeriodicStepsList />,
                        loader: periodicDailyStepsListLoader
                    },
                    {
                        path: "physical-activity/:startDate/:endDate",
                        element: <PeriodicDailyStepsDetail />,
                        loader: periodicDailyStepsLoader
                    }
              ]
          },
          {
              path: "profile",
              element: <h1>Profile</h1>
          },
      ]
    },
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
