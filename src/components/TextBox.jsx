import React from 'react';

class TextBox extends React.Component {
    render(){
        const { name, placeholder } = this.props;
     ;
      return (
        <input type="text" className={name} placeholder={placeholder} onClick={ function(){ alert('So!?'); }} />
    );
}

}

export default TextBox;