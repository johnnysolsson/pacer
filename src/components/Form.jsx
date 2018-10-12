import React, { Component } from 'react';
import TextBox from './TextBox.jsx';

class Pacer extends React.Component  {
  render(){
    return (
      <form id="pacerForm">
        
        <div className="row">
          <TextBox name="distance" placeholder="Enter distance covered" />
        </div>
        <div className="row">
          <TextBox name="time" placeholder="Enter time spent" />
        </div>
        <div className="row">
          <TextBox name="pace" placeholder="Enter pace" />
        </div>
       
      </form>
    );
  }
}

export default Pacer;