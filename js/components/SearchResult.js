import React, {Component, PropTypes} from 'react';
import ChildSearchResult from './ChildSearchResult'


/* This component has one Child : ChildSearchResult*/


export default class SearchResult extends Component {

   constructor(props) {    
        super(props); 
    }

    render (){
     /*Maps values of List so that they can be sent one by one to Child component */ 
    var ListUsers = this.props.List.map(function(arr) {
     return (
       <div style={{ display: 'block'}}>
       <ChildSearchResult allData={arr} login={arr.login} key={arr.id} />
       </div>
           );
         }.bind(this));
     return (
           <div className="ListUsers">
             {ListUsers}
           </div>
         );
      }
}   
