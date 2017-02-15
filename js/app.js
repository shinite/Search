import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './components/SearchBox'
import SearchResult from './components/SearchResult'
import Pagination from './components/Pagination'

var page;

var styles={
	width: '100px',
	height: '10px',
};



class App extends React.Component {

	constructor(props) {    
        super(props);
        this.state = {
        	active: true,
            userList: [],
            total:"",
            entries: 5,
            pageList:[],
            rerender:"",
        };

        this.findName=this.findName.bind(this);
         this.changeEntries=this.changeEntries.bind(this);
          this.nextPage=this.nextPage.bind(this);
           this.prevPage=this.prevPage.bind(this);
    }

	
	
	findName(name){
		
		this.setState({active: false})
		$('#loading-image').show();
		$('#error').hide();
		 $.ajax({
	      url: 'https://api.github.com/search/users?q='+name,
	      dataType: 'json',
	      cache: false,
	       complete: function(){
       		 $('#loading-image').hide();
   		  },
	      success: function(data) {
	       
	         $('#loading-image').hide();
	         this.setState({ userList:data.items,total:data.total_count });
	        

	         if(this.state.userList.length==0)
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
				this.state.pageList[j]=this.state.userList[i];
				
			}
			this.setState({rerender:true})

	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.state.url, status, err.toString());
	         $('#loading-image').hide();
	      }.bind(this)
		});
	}

	nextPage(){
		page++;
 	

		for(var i=(page-1)*this.state.entries,j=0;i<Math.min(page*this.state.entries,this.state.total);i++,j++)
		{
			
			this.state.pageList[j]=this.state.userList[i];
		}

		this.setState({rerender:true})
	}

	prevPage(){
		page--;
		
		for(var i=(page-1)*this.state.entries,j=0;i<Math.min(page*this.state.entries,this.state.total);i++,j++)
		{
			this.state.pageList[j]=this.state.userList[i];

		}

		this.setState({rerender:true})
	}

	changeEntries(e){
		
		 page = 1;
	         this.state.pageList=[];
	         for(var i=(page-1)*e.target.value,j=0;i<Math.min(page*e.target.value,this.state.total);i++,j++)
			{
				this.state.pageList[j]=this.state.userList[i];
				
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
	      <input type="button" onClick={this.nextPage} value="Next"/>

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
	       <input type="button" onClick={this.prevPage} value="Pre"/>
	      <input type="button" onClick={this.nextPage} value="Next"/>

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

	      <input type="button" onClick={this.prevPage} value="Pre"/>

	      </div>
	      );
		}
	}
	}
}
ReactDOM.render(<App />, document.getElementById('content'));
	