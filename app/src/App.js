import React, { useEffect, useState } from 'react';
import Sidebar from './Components/Sidebar';
import Calendar from './Components/Calendar';
import './App.css';

export default function App() {

  const [Months, setMonths] = useState([]);
  const options = { year: 'numeric', month: 'long' };

  useEffect(() => {
    fetch("http://test.movilbox.co:888/test_mbox/test.php?metodo=periodos")
      .then(response => response.json())
      .then(data => {
        setMonths(data)
      });
  }, []);

  const [selectedDate, setSelectedDate] = useState(0)

  const _setDate = (e) => {
    if(e.target.id === "<"){

      selectedDate === 0 ? setSelectedDate(0) : setSelectedDate(selectedDate-1);

    } else {
      selectedDate === Months.length-1 ? setSelectedDate(Months.length-1) : setSelectedDate(selectedDate+1);
    }
  }

  return (
    <div className='app-container'>
      <Sidebar />
      <div>
        <div className='select-date'>
          <button className='modify-date' id='<' onClick={(e)=>_setDate(e)}>{ '<' }</button>
          <div className='info-date'>{ Months.length > 0 ? new Date(Months[selectedDate].anio, Months[selectedDate].mes-1, 1).toLocaleDateString('es-CO', options).toUpperCase() : ''}</div>
          <button className='modify-date' id='>' onClick={(e)=>_setDate(e)}>{ '>' }</button>
        </div>
        {
          Months.length > 0 &&
          <Calendar year={Months[selectedDate].anio} month={Months[selectedDate].mes} />
        }
      </div>
    </div>
  );
}

