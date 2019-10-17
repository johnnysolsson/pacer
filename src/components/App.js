import React, {useState} from 'react';
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

  // Reset all
  const handleReset = (e) => {
    e.preventDefault();
    setDistance(resetDistance);
    setTime(resetTime);
    setPace(resetPace);
  };

  // Make setState reachable from child component
  const updateObj = (e, obj) => {
    e.preventDefault();
    setDistance({...time, value: obj.distance});
    setTime({...time, value: obj.time});
    setPace({...time, value: obj.pace});
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
        default:
          break;
      }
    }
  };

  // Handle submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (picker) {
      case 'distance':
        setDistance({...distance, value: (time.value / pace.value).toFixed(2)});
        break;
      case 'time':
        setTime({...time, value: (distance.value / pace.value).toFixed(2)});
        break;
      case 'pace':
        setPace({...pace, value: (distance.value / time.value).toFixed(2)});
        break;
    }
  };

  // TODO: Make the save function work 
  // Handle save event
  const handleSave = (e) => {
    e.preventDefault(); 
    alert('Entry saved with today\'s date');
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
        <button onClick={(e) => calcPicker(e, 'picker')}><FontAwesomeIcon icon={faLongArrowAltLeft} /> Back</button>
        <button onClick={(e) => handleReset(e)}><FontAwesomeIcon icon={faUndo} /> Reset</button>
        <button onClick={(e) => handleSubmit(e)}><FontAwesomeIcon icon={faCheck} /> Submit</button>
        <button className="save" onClick={(e) => handleSave(e)}><FontAwesomeIcon icon={faSave} /> Save</button>
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
              <button onClick={(e) => calcPicker(e, 'distance')} title="Calculate distance"><FontAwesomeIcon icon={faRulerHorizontal} /> Distance</button>
              <button onClick={(e) => calcPicker(e, 'time')} title="Calculate time"><FontAwesomeIcon icon={faClock} /> Time</button>
              <button onClick={(e) => calcPicker(e, 'pace')} title="Calculate pace"><FontAwesomeIcon icon={faShoePrints} /> Pace</button>
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
          <History handleToUpdate={updateObj.bind(this)} />
        </div>
      </div>
      <div className='grid-item'></div>
    </div>
  );
};

// Validate input to be number
const isNumber = (validateMe) => {
  return !isNaN(validateMe) || validateMe == null ? Number(validateMe) : false;
};

// Main component
export function App() {
  return <Form />;
}
