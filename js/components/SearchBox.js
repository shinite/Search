import React, {Component, PropTypes} from 'react';

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
            <div id="SearchBox">
                 <input type="text"  placeholder='Enter first name of patient you wish to Search.'  onChange={this.changeName} />
                
            </div>
        );
    }
}   
