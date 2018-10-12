import React from 'react';

const TextBox = props => {
    return (
        <input type="text" className={ props.name } placeholder={ props.placeholder } />
    );
};


/*
class Input extends React.Component  {
    render(){
      return (
          <input type="text" className="pace" placeholder="Input pace"></input>
      );
    }
  }
*/
export default TextBox;