import React from 'react';
import Sidebar from './Components/Sidebar';
import Calendar from './Components/Calendar';
import './App.css';

export default function App() {
  return (
    <div className='app-container'>
      <Sidebar/>
      <Calendar/>
    </div>
  );
}

