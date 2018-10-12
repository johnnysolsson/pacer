import React from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form.jsx';

class App extends React.Component {
    render() {
      return (
        <div>
          <h1>Fill in!</h1>
          <Form />
          <p>
              Populate any two input fields to calculate the third. 
          </p>
        </div>
      );
    }
  }
  
  //ReactDOM.render(React.createElement(App), document.getElementById("root"));

/*
class App extends React.Component {
    render(){
        return <h1>Hello world!</h1>;
    }
}

*/
export default App;