import './App.css'

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import InterestCat from "./components/InterestCat.jsx";
import EventSchedule from "./components/EventSchedule.jsx";
import Profile from "./components/Profile.jsx"
import NavBar from "./components/NavBar"
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import SignupForm from './components/SignupForm'
import SigninForm from './components/SigninForm'
import Questionnaire from './components/Questionare.jsx';
import * as authService from './service/authService.js'
import * as questionnaireService from './service/questionnaireService.js'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [currentQuest, setCurrentQuest] = useState('673cb25ecc8510987ffd5d7b')

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  }

  const getCurrentQuest = () => {
    if (!currentQuest) {
      return null
    }
    const quest = questionnaireService.getCurrent(currentQuest)
    console.log(quest)
    return quest
  }

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout}/>
      <Routes>
        {user ? (
          <Route path="/" element={<Dashboard user={user} />} />
        ) : (
          <Route path="/" element={<Landing />} />
        )}

        <Route path='/signup' element={<SignupForm setUser={setUser}/>} /> 
        <Route path='/signin' element={<SigninForm setUser={setUser}/>} /> 
        <Route path='/questionnaire' element={<Questionnaire getCurrentQuest={getCurrentQuest} />}/>
      </Routes>
    </>
  );
}

export default App
