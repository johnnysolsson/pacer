import React from 'react';
import Form  from './component/Form';
import calculate from './logic/calculate.js';
import './sass/App.scss';

class App extends React.Component {
  
  handleClick = textboxName => {
    calculate(this.state, textboxName);
  }

  render() {
    return (
      <div className="component-app">
        <div className="container">
          <div className="row">

            <div className="col-sm-4 col-md-4">
            </div>            

            <div className="col-sm-4 col-md-4">
              <h1>Pacer</h1>
              
              <Form clickHandler={this.handleClick} />

              <p>
                Populate any two input fields to calculate the third. 
              </p>
              <p>
                Doubleclick or -tap to lock textbox. 
              </p>              
            </div>

            <div className="col-sm-4 col-md-4">
            </div> 

          </div>
        </div>
      </div>
    );
  }
}

export default App;