import React from 'react';
import TextBox from './TextBox.jsx';

class Form extends React.Component  {
  
  handleClick = textboxName => {
    this.props.clickHandler(textboxName);
  }

  render(){
    return (
      <form id="component-textbox-form">        
        <div className="row">
          <h3>Distance</h3>
            <TextBox 
              name="Distance" placeholder="Enter distance covered" 
            />
          </div>
        <div className="row">
          <h3>Time</h3>       
            <TextBox name="Time" placeholder="Enter time spent" />
        </div>
        <div className="row">
        <h3>Speed</h3>
          <TextBox name="Pace" placeholder="Enter speed" />
        </div>
      </form>
    );
  }
}

export default Form;

//TODO: Make array of textboxes