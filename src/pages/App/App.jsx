import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import Project from '../Project/Project';
import NavBar from '../../components/NavBar/NavBar';
import {NextUIProvider} from "@nextui-org/react";
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import SubTask from '../SubTask/SubTask';
import AddMembers from '../AddMembers/AddMembers';
export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main>
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <div className='min-h-screen'>
            <Routes>
              {/* Route components in here */}
              <Route path="/" element={<Project />} />
              <Route path="project/:projectId" element={<ProjectDetail />} />
              <Route path="project/:projectId/commit/:commitId" element={<SubTask />} />
              <Route path=":projectId/addMembers" element={<AddMembers />} />
            </Routes>
            </div>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
