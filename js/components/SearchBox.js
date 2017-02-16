import React, {Component, PropTypes} from 'react';
import memoize from 'lru-memoize';

var styles={
    width: '70%',
    height: '20 px',
    alignItems: 'center',
   };



export default class SearchBox extends Component {

    /*Component that contains the Input Field. 
    The values entered in the SearchBox are sent to Parent component(App) */

   constructor(props) {    
        super(props);
        this.state = {
            name: "", //Stores the value that is typed by user
            typing :false,
            typingTimeOut :0,
            cache:[],
            sugg:[],// List of Suggestions 
        };
            this.changeName=this.changeName.bind(this);
            this.changeBySuggest=this.changeBySuggest.bind(this);
            this.sendtoParent=this.sendtoParent.bind(this);
            this.suggestions=this.suggestions.bind(this);
    }

    changeName(event) {
        /*Sets the value of 'name' when user changes the value in Search Field
          Sends value to sendToParent() when user stops typing.
        */
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

        /*Sends value to App Component.
          sets value of sugg ie., Suggestions the user get.
        */

        var self=this
         this.setState({sugg: self.suggestions(this.state.name)});

        if(this.state.sugg.length>0)
        {
            $('#select').show();
            $('#select').empty();
            $.each(this.state.sugg, function(i, p) {
                $('#select').append($('<option></option>').val(p).html(p));
            });
        }

        this.props.searching(this.state.name,"true");
    }

    suggestions(name){

        /*Function that determines what suggestions are to be given to the user for particular value*/

        var t=[];

        for(var i=0;i<this.state.cache.length;i++)
        {
            
            if(this.state.cache[i].includes(name))
            {
                t.push( this.state.cache[i].trim());
            }
        }
        this.state.cache[i]=name;
        return (t);


    }

    changeBySuggest(event){
        /*Function that rerenders the page when user selects value from suggestion drop down*/
        this.setState({name: event.target.value});
        this.sendtoParent();
    }

    render() {
        return (
            <div style={styles} >
                 <input style={styles} id="SearchBox" type="text"  placeholder="Enter the name" value={this.state.name} onChange={this.changeName} />
                 <form id="myForm">
                  <select id="select" onChange={this.changeBySuggest}>
                    <option>Choose suggestion</option>
                  </select>
                </form>
            </div>
            );
        }
}   
