import React, {Component, PropTypes} from 'react';
import ChildSearchResult from './ChildSearchResult'


export default class SearchResult extends Component {

   constructor(props) {    /* Note props is passed into the constructor in order to be used */
        super(props); 
    }

    render (){
        
      
    var ListUsers = this.props.List.map(function(arr) {
     return (
       <div style={{ display: 'block'}}>
       <ChildSearchResult allData={arr} login={arr.login} key={arr.id} />
       </div>
     );
   }.bind(this)
 );
   return (
         <div className="ListUsers">
           {ListUsers}
         </div>
       );
    }
}   
