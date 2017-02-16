import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './components/SearchBox'
import SearchResult from './components/SearchResult'

var page; // Stores value of current Page

var styles={
	width: '100px',
	height: '10px',
};

/* This component has two children : SearchBox and SearchResult*/

class App extends React.Component {

	constructor(props) {    
        super(props);
        this.state = {
        	active: true, //To rerender when loading has to be displayed.
            fullList: [],//Stores the entire Json array 
            total:"", // Stores Total No. of Records that are there for a particular value
            entries: 5, // No. of records user wishes to see in curent page
            pageList:[], // List of records that will be displayed in current Page
            rerender:"", // To rerender when user Clicks on Next or Prev Button 
        };

        this.findName=this.findName.bind(this);
        this.changeEntries=this.changeEntries.bind(this);
        this.nextPage=this.nextPage.bind(this);
        this.prevPage=this.prevPage.bind(this);
   		}

	findName(name){

		/*Function that makes the ajax request to GITHUB Search API. 
		  It recieves a 'name' from SearchBox which is used to get json from the API.
		  If the request is successful the required states are set and page is rerendered.
		 */
		
		this.setState({active: false})
		$('#loading-image').show();
		$('#traverse').hide();
		$('#error').hide();
	    $.ajax({
	      url: 'https://api.github.com/search/users?q='+name+'&per_page=100',
	      dataType: 'json',
	      cache: false,
	       complete: function(){
       		$('#loading-image').hide();
       		$('#traverse').show();
   		  },
	      success: function(data) {
	        $('#loading-image').hide();
	        $('#traverse').show();
	        this.setState({ fullList:data.items,total:data.total_count });
	      
	        if(this.state.fullList.length==0)
	        {
	         	$('#error').show();
	        }
	        else
	        {
	         	$('#error').hide();

	        }
	        page=1;
	        this.state.pageList=[];
	        for(var i=(page-1)*this.state.entries,j=0;i<Math.min(page*this.state.entries,data.total_count);i++,j++)
			{
				this.state.pageList[j]=this.state.fullList[i];
			
			}
			this.setState({rerender:true})

	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.state.url, status, err.toString());
	        $('#loading-image').hide();
	        $('#traverse').show();
	      }.bind(this)
		});	
	}

	nextPage(){

		/* function to select what elements are to be displayed when we click the next Button*/

		page++;
 	
		for(var i=(page-1)*this.state.entries,j=0;i<Math.min(page*this.state.entries,this.state.total);i++,j++)
		{	
			this.state.pageList[j]=this.state.fullList[i];
		}

		this.setState({rerender:true})
	}

	prevPage(){

		/* function to select what elements are to be displayed when we click the prev Button*/
		page--;
		
		for(var i=(page-1)*this.state.entries,j=0;i<Math.min(page*this.state.entries,this.state.total);i++,j++)
		{
			this.state.pageList[j]=this.state.fullList[i];

		}

		this.setState({rerender:true})
	}

	changeEntries(e){

		/*Sets the value of Entries ie., the No. of Records user wishes to see in current Page*/
		
		page = 1;
	        this.state.pageList=[];
	        for(var i=(page-1)*e.target.value,j=0;i<Math.min(page*e.target.value,this.state.total);i++,j++)
			{
				this.state.pageList[j]=this.state.fullList	[i];
				
			}
		this.setState({entries : e.target.value});

	}

	render(){

	  	if(this.state.active===true)
	  	{
	   	 return (
		      <div>	
			      <SearchBox searching={this.findName}/>
			      Enter the no of entries you wish to see :
			      <input type="text"  style = {styles} onChange={this.changeEntries} />
			      <SearchResult List={this.state.pageList}/>
		      </div>
	    	);
		 }
		else
		{
		if(page==1 && this.state.total>page*this.state.entries)
		{
		 return (
		      <div>
			      <SearchBox searching={this.findName}/>
			        Enter the no of entries you wish to see :
		     		<input type="text"  style = {styles} onChange={this.changeEntries} />
			      <div id="loading-image">loading....</div>
			      <br/>
			       <div id="error">User Not Found</div>
			      <SearchResult List={this.state.pageList}/>
			      <input id="traverse" type="button" onClick={this.nextPage} value="Next"/>

		      </div>
		    );
		}
		else if(page==1 && this.state.total<=page*this.state.entries)
		{
		 return (
		      <div>
			      <SearchBox searching={this.findName}/>
			       Enter the no of entries you wish to see :
		     	  <input type="text"  style = {styles} onChange={this.changeEntries} />
			      <div id="loading-image" >loading....</div>
			      <br/>
			      <div id="error">User Not Found</div>
			      <SearchResult List={this.state.pageList}/>
		      </div>
		    );
		}
		else if(this.state.total>page*this.state.entries)
		{
		 return (
		      <div>
			      <SearchBox searching={this.findName}/>
			       Enter the no of entries you wish to see :
		     	  <input type="text"  style = {styles} onChange={this.changeEntries} />
			      <div id="loading-image" >loading....</div>
			      <br/>
			      <div id="error">User Not Found</div>
			      <SearchResult List={this.state.pageList}/>
			       <input  id="traverse" type="button" onClick={this.prevPage} value="Pre"/>
			      <input type="button"  id="traverse" onClick={this.nextPage} value="Next"/>
		      </div>
		    );
		}
		else 
		{
		 return (
		      <div>
			      <SearchBox searching={this.findName}/>
			       Enter the no of entries you wish to see :
		     	  <input type="text"  style = {styles} onChange={this.changeEntries} />
			      <div id="loading-image" >loading....</div>
			      <br/>
			      <div id="error">User Not Found</div>

			      <SearchResult List={this.state.pageList}/>

			      <input type="button" id="traverse" onClick={this.prevPage} value="Pre"/>
		      </div>
		    );
		}
		}
	}
}
ReactDOM.render(<App />, document.getElementById('content'));
	