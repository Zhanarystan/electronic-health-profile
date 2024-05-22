import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import StudentListPage, { studentsLoader } from './components/studentList/StudentListPage';
import InstitutionListPage from './components/institutionList/InstitutionListPage';
import StudentDetailPage, { studentLoader } from './components/student/StudentDetailPage';
import StudentPersonalData from './components/student/StudentPersonalData';
import SickNoteList, { sickNotesLoader } from './components/student/SickNoteList';
import LoginPage from './components/login/LoginPage';
import SickNoteDetail, { sickNoteLoader } from './components/student/SickNoteDetail';

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
              element: <InstitutionListPage />
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
