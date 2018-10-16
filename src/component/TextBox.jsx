import React from 'react';

class TextBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            readOnly: false,
            bgColor: '#434346',
            textColor: '#ffffff',
            borderColor : '#434346',
            value: this.props.defaultValue
        };
    }

    handleEdit = (e) => {
        let value = e.target.value;
        //alert(value);        
        this.setState({ value: value });
     };
 
     handleLock = (e) => {
        this.setState(prevState => ({readOnly: !prevState.readOnly}));
        
        //Toggle backgroundcolor of input
        if(this.state.bgColor === '#333336') this.setState({bgColor : '#434346'});
            else this.setState({bgColor : '#333336'});
        
        //Toggle textcolor input text
        if(this.state.textColor === '#a0a0a0') this.setState({textColor : '#e0e0e0'});
            else this.setState({textColor : '#a0a0a0'});

        //Toggle bordercolor of textBox
        if(this.state.borderColor === '#f0a080') this.setState({borderColor : '#434346'});
            else this.setState({borderColor : '#f0a080'});
    };
 

    render(){
        const { name, placeholder } = this.props;
        
        return (
            <fragment>
                <div className="textbox" style={{borderColor: this.state.borderColor}}>
                    <input 
                        type="text" 
                        className={ name } 
                        placeholder={ placeholder } 
                        title={ placeholder }
                        value={ this.state.value }
                        onChange={ this.handleEdit }
                        readOnly={ this.state.readOnly }
                        style={{backgroundColor: this.state.bgColor, color: this.state.textColor}}  
                    />
                    <div className="lock" name={ name } alt={name} title={ 'Lock ' + name } style={{backgroundColor: this.state.bgColor, color: this.state.textColor}} onClick={ this.handleLock }>X</div> 
                </div>
            </fragment>
        );
    }
}

export default TextBox;

//TODO: Make toggling style more SASSY than js