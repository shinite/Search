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
            sugg:[],
        };
        this.changeName=this.changeName.bind(this);
        this.changeBySuggest=this.changeBySuggest.bind(this);
        this.sendtoParent=this.sendtoParent.bind(this);
        this.suggestions=this.suggestions.bind(this);
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
