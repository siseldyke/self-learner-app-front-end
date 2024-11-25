import './App.css'

import { useEffect, useState } from 'react';
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
import QuestionnaireForm from './components/QuestionnaireForm.jsx';
import QuestionnaireDetail from './components/QuestionnaireDetail.jsx'
import * as authService from './service/authService.js'
import * as questionnaireService from './service/questionnaireService.js'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [currentQuest, setCurrentQuest] = useState('673cb25ecc8510987ffd5d7b')

  const [userFitnessPoints, setUserFitnessPoints] = useState()
  const [userVideoGamesPoints, setUserVideoGamesPoints] = useState()
  const [userBoardGamesPoints, setUserBoardGamesPoints] = useState()
  const [userMusicInsPoints, setUserMusicInsPoints] = useState()

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  }
  
  const addPoints = () => {
    useEffect(() => {
      setUserFitnessPoints(user.fitnessPoints)
      setUserBoardGamesPoints(user.boardGamePoints)
      setUserVideoGamesPoints(user.videoGamePoints)
      setUserMusicInsPoints(user.musicInsPoints)
    })
  }

  const getCurrentQuest = () => {
    if (!currentQuest) {
      return null
    }
    const quest = questionnaireService.getCurrent(currentQuest)
    return quest
  }

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout}/>
      <Routes>
        {user ? (
          <Route path="/" element={<Dashboard user={user} userFitnessPoints={userFitnessPoints} userVideoGamesPoints={userVideoGamesPoints} userBoardGamesPoints={userBoardGamesPoints} userMusicInsPoints={userMusicInsPoints}/>} />
          
        ) : (
          <Route path="/" element={<Landing />} />
        )}

        <Route path='/signup' element={<SignupForm setUser={setUser} user={user} addPoints={addPoints}/>} /> 
        <Route path='/signin' element={<SigninForm setUser={setUser} user={user} addPoints={addPoints}/>} /> 

        <Route path="/profile" element ={<Profile user={user} />}/>
        <Route path="/interestcat" element ={<InterestCat user={user}/>}/>
        <Route path="/eventschedule" element ={<EventSchedule user={user}/>}/>

        <Route path='/questionnaire/:id' element={<QuestionnaireDetail user={user} userFitnessPoints={userFitnessPoints} userVideoGamesPoints={userVideoGamesPoints} userBoardGamesPoints={userBoardGamesPoints} userMusicInsPoints={userMusicInsPoints}/>}/>
        <Route path='/questionnaire' element={<Questionnaire user={user} />}/>
        <Route path='/questionnaire-form' element={<QuestionnaireForm user={user} />} />
        <Route path='/questionnaire-form/:questionnaireId' element={<QuestionnaireForm user={user} />} />
      </Routes>
    </>
  );
}

export default App

