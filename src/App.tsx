import React from 'react';
import logo from './logo.svg';
import './App.css';
import StudentForm from './Pages/StudentForm';
import ViewDetails from './Pages/ViewDetails';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Header from './SharedComponents/Header/Header';
import ViewItem from './Pages/ViewItem';

function App() {
  return (
    <div className='app'>
      <Header/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ViewDetails/>}/>
        <Route path='/view' element={<ViewDetails/>}/>
        <Route path='/view/:id' element={<ViewItem/>}/>
        <Route path='/add' element={<StudentForm/>} />
        <Route path='/update/:id' element={<StudentForm/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
