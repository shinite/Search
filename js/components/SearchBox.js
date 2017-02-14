import React, {Component, PropTypes} from 'react';

  var styles={
        width: '70%',
        height: '2  0px',
        alignItems: 'center',
       };

export default class SearchBox extends Component {

   constructor(props) {    /* Note props is passed into the constructor in order to be used */
        super(props);
        this.state = {
            name: "", 
            typing :false,
            typingTimeOut :0,
        };
        this.changeName=this.changeName.bind(this);
        this.sendtoParent=this.sendtoParent.bind(this);
    }

    changeName(event) {
        const self=this;

        if(self.state.typingTimeOut)
        {
            clearTimeout(typingTimeOut);
        }

        self.setState({ 
            name: event.target.value,
            typing:false,
            typing: setTimeout(function(){ 
                self.sendtoParent(self.state.name)},1000)
        }); 
        console.log(this.state.name); 
    }

    sendtoParent(){
        this.props.searching(this.state.name,"true");
    }


   
    render() {



        return (
            <div style={styles} >
            
                 <input style={styles} id="SearchBox" type="text"  placeholder='Enter the name'  onChange={this.changeName} />
                
            </div>
        );
    }
}   
