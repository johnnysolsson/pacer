import React from 'react';

class TextBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            readOnly: false,
            value: this.props.defaultValue
        };
    }

    handleEdit = (e) => {
        let value = e.target.value;
        //alert(value);        
        this.setState({ value: value });
     };
 
     handleLock = (e) => {
        let value = e.target.previousElementSibling.className;
        this.setState(prevState => ({readOnly: !prevState.readOnly}));
        alert(value + ' is locked!');
        //console.log(e.target.previousElementSibling.className);
        };
 

    render(){
        const { name, placeholder } = this.props;
        
        return (
            <fragment>
                <div className="textbox">
                    <input 
                        type="text" 
                        className={ name } 
                        placeholder={ placeholder } 
                        title={ placeholder }
                        value={ this.state.value }
                        onChange={ this.handleEdit }
                        readOnly={ this.state.readOnly } 
                    />
                    <div className="lock" name={ name } alt={name} title={ 'Lock ' + name } onClick={ this.handleLock }>X</div> 
                </div>
            </fragment>
        );
    }
}

export default TextBox;