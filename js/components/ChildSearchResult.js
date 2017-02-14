import React, {Component, PropTypes} from 'react';


export default class ChildSearchResult extends Component {

   constructor(props) {    /* Note props is passed into the constructor in order to be used */
        super(props);
      
    }


    render (){
      return(
        <div>
        <pre>
          LOGIN: {this.props.login} <br/>
          ID   : {this.props.allData.id} <br/>
          URL  : {this.props.allData.html_url} <br/>
        </pre>
        </div>
        )
    }
}   
