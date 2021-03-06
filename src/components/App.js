import React, {useState, useEffect} from 'react';
import {decimalToTime, getToday, isNumber, timeToDecimal} from './math';
import History from './History';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faLongArrowAltLeft, faRulerHorizontal, faSave, faShoePrints, faUndo } from '@fortawesome/free-solid-svg-icons';

const Form = () => {
  // Set individual defaults
  const resetDistance = {name: 'distance', disabled: false, unit: 'km', value: null};
  const resetTime = {name: 'time', disabled: false, unit: 'h:m', value: null};
  const resetPace = {name: 'pace', disabled: false, unit: 'km/h', value: null};

  // Initiate states
  const [distance, setDistance] = useState(resetDistance);
  const [time, setTime] = useState(resetTime);
  const [pace, setPace] = useState(resetPace);
  const [picker, setPicker] = useState('picker');
  const [nextId, setNextId] = useState(0);
  const [showSaveButton, setShowSaveButton] = useState(false);

  // Reset all
  const handleReset = (e) => {
    e.preventDefault();
    setDistance(resetDistance);
    setTime(resetTime);
    setPace(resetPace);
    setShowSaveButton(false);
  };

  // Make setState reachable from child component
  const updateObj = (e, obj, nId) => {
    e.preventDefault();
    setDistance({...distance, value: obj.distance});
    setTime({...time, value: obj.time});
    setPace({...pace, value: obj.pace});
    setNextId(nId);
  };

  // FIXME: Should this be a real component?
  const inputField = (props, disabled) => {
    return (
      <div className='input'>
        <input 
          id={props.name}
          size="20"
          type={!disabled ? 'number' : 'text'}
          maxLength="20"
          step="0.1"
          name={props.name} 
          title={'Enter ' + props.name} 
          placeholder={!disabled ? props.name : ''} 
          disabled={disabled}
          value={props.value || ''} 
          onChange={(e) => handleChange(e, props)}/>
        <label> {props.unit}</label>
      </div>
    );
  }; 

  // Handle state change of an input; validate value
  const handleChange = (e, props) => {
    e.preventDefault();
    const val = e.currentTarget.value;
    if(isNumber(val)){
      switch (props.name) {
        case 'distance':
          setDistance({...distance, value: val});
          break;
        case 'time':
          setTime({...time, value: val});
          break;
        case 'pace':
          setPace({...pace, value: val});
          break;
      }
    }
  };

  // Handle submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (picker) {
      case 'distance':
        setDistance({...distance, value: (timeToDecimal(time.value) / pace.value).toFixed(2)});
        break;
      case 'time':
        // setTime({...time, value: decimalToTime((pace.value / distance.value)).toFixed(2)});
        setTime({...time, value: decimalToTime((distance.value / pace.value)).toFixed(2)});
        break;
      case 'pace':
        setPace({...pace, value: (distance.value / timeToDecimal(time.value).toFixed(2))});
        break;
    }
  };

  useEffect(() => {
    if(distance.value && distance.value != null) {
      if(pace.value != null && time.value != null) {
        setShowSaveButton(true);
      }
    }
  }, [distance.value, pace.value, time.value, setShowSaveButton]);

  useEffect(() => {
    if(pace.value && pace.value != null) {
      if(distance.value != null && time.value != null) {
        setShowSaveButton(true);
      }
    }
  }, [pace.value, distance.value, time.value, setShowSaveButton]);

  // Handle save event
  const handleSave = async (e, obj) => {
    e.preventDefault();
    let response = '';
    const presentDate = getToday();
    const data = {id: nextId, date: presentDate, distance: obj.distance.value, time: obj.time.value, pace: obj.pace.value};
    const url = 'http://localhost:4242/history';
    try{
      response = await fetch(url, {
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      });
    }catch (error){
      console.error('Oh my! Got an error: ', error.message);
    }
    const result = await response.json();
    alert('Entry saved with today\'s date\n' + result);
  };

  // Handle the event
  const calcPicker = (e, pickedForm) => {
    e.preventDefault();
    setPicker(pickedForm);
  };

  // Ready chosen form for rendering
  const showPicker = () => {
    let outputForm = '';
    const alwaysShow = (
      <div className="buttons">
        <button title="Go back" onClick={(e) => calcPicker(e, 'picker')}><FontAwesomeIcon icon={faLongArrowAltLeft} /></button>
        <button title="Reset entries" onClick={(e) => handleReset(e)}><FontAwesomeIcon icon={faUndo} /></button>
        <button title="Submit and calculate" onClick={(e) => handleSubmit(e)}><FontAwesomeIcon icon={faCheck} /></button>
        {showSaveButton ? <button title="Save this entry" className="save" onClick={(e) => handleSave(e, {nextId, distance, time, pace})}><FontAwesomeIcon icon={faSave} /></button> : ''}
      </div>
    );
    switch (picker) {
      case 'distance':
        outputForm = 
          (
            <>
              <h2>Distance</h2>
              <p>Enter time and pace</p>
              {inputField(time)}
              {inputField(pace)}
              {inputField(distance, true)}
              {alwaysShow}
            </>
          );
        break;
      case 'time':
        outputForm =
          (  
            <>
              <h2>Time</h2>
              <p>Enter distance and pace</p>
              {inputField(distance)}
              {inputField(pace)}
              {inputField(time, true)}
              {alwaysShow}
            </>
          );
        break;
      case 'pace':
        outputForm =
          ( 
            <>
              <h2>Pace</h2>
              <p>Enter distance and time</p>
              {inputField(distance)}
              {inputField(time)}
              {inputField(pace, true)}
              {alwaysShow}
            </>
          );
        break;
      case 'picker':
        outputForm =
          (
            <>
              <h2>Picker</h2>
              <p>Choose what to calculate</p>
              <button title="Calculate distance" onClick={(e) => calcPicker(e, 'distance')}><FontAwesomeIcon icon={faRulerHorizontal}/></button>
              <button title="Calculate time" onClick={(e) => calcPicker(e, 'time')}><FontAwesomeIcon icon={faClock} /></button>
              <button title="Calculate pace" onClick={(e) => calcPicker(e, 'pace')}><FontAwesomeIcon icon={faShoePrints} /></button>
            </>
          );
        break;
    }
    return outputForm;
  };

  // Render the form
  return (
    <div className='grid-container'>
      <div className='grid-item'></div>
      <div className='grid-item'>
        <form >
          <div className='left'>
            {showPicker()}
          </div>
        </form>
      </div>
      <div className='grid-item'>
        <div className='right'>
          <History handleUpdate={updateObj.bind([this, this])} />
        </div>
      </div>
      <div className='grid-item'></div>
    </div>
  );
};

// Main component
export function App() {
  return <Form />;
}
