import React, {Component, PropTypes} from 'react';

 

export default class ChildSearchResult extends Component {

   constructor(props) {    
        super(props);
    }

    render (){
      /*Renders the Props that are recieved by the Parent (SearchResult)*/
      return(
          <div>
            <div style={{marginTop: '10px' ,marginBottom:'10px'}} >
              <img  style={{float:'left', height: "50px", width: "50px" , display: 'inline', marginTop: '10px' ,marginBottom:'10px'}} src={this.props.allData.avatar_url} alt="No image" />  
              <div style={{ display: 'inline', marginLeft: '40px' ,paddingTop: '30px'}}>
              LOGIN: {this.props.login} <br/>
              </div>
              <div style={{ display: 'inline', marginLeft: '40px' }}>
              ID   : {this.props.allData.id} <br/>
              </div>
            </div>
            <br/>
            <br/>
          </div>
        )
    }
}   
