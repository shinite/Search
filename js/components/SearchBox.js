import React, {Component, PropTypes} from 'react';
import memoize from 'lru-memoize';

  var styles={
        width: '70%',
        height: '20 px',
        alignItems: 'center',
       };

export default class SearchBox extends Component {

   constructor(props) {    
        super(props);
        this.state = {
            name: "", 
            typing :false,
            typingTimeOut :0,
            cache:[],
        };
        this.changeName=this.changeName.bind(this);
        this.sendtoParent=this.sendtoParent.bind(this);
    }

    changeName(event) {
       const self=this;

        if(self.typingTimeOut)
        {
            clearTimeout(self.typingTimeOut);
        }

        self.typingTimeOut = setTimeout(function(){ 
                self.sendtoParent(self.state.name)},1000);
        
        self.setState({ 
            name: event.target.value,
            typing:false,
            
        }); 

        
    }

    sendtoParent(){
        
        this.suggestions(this.state.name)
        this.props.searching(this.state.name,"true");
    }

    suggestions(name){


        for(var i=0;i<this.state.cache.length;i++)
        {
            if(this.state.cache[i]==name)
            {
                return name
            }
                
        }
        this.state.cache[i]=name;

        console.log(this.state.cache);

    }


   
    render() {

        return (
            <div style={styles} >
            
                 <input style={styles} id="SearchBox" type="text"  placeholder='Enter the name'  onChange={this.changeName} />
                
            </div>
        );
    }
}   
