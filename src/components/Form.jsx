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
          <div className="textBoxTitle">Distance</div>
            <TextBox 
              name="distance" 
              placeholder="Enter distance covered" 
              clickHandler={this.handleClick} />
          </div>
        <div className="row">
          <div className="textBoxTitle">Time spent</div>       
            <TextBox name="time" placeholder="Enter time spent" />
        </div>
        <div className="row">
        <div className="textBoxTitle">Pace</div>
          <TextBox name="pace" placeholder="Enter pace" />
        </div>
      </form>
    );
  }
}

export default Form;