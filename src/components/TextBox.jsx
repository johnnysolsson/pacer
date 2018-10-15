import React from 'react';

class TextBox extends React.Component {

    handleClick = textboxName => {
        this.props.clickHandler(textboxName);
    }

    render(){
        const { name, placeholder } = this.props;
        return (
            <input type="text" className={name} placeholder={placeholder} title={placeholder} />
        );
    }
}

export default TextBox;