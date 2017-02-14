import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './components/SearchBox'
import SearchResult from './components/SearchResult'
import Pagination from './components/Pagination'

var page;



class App extends React.Component {

	constructor(props) {    /* Note props is passed into the constructor in order to be used */
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
		console.log(name + " in App.")
		this.setState({active: false})
		$('#loading-image').show();
		 $.ajax({
	      url: 'https://api.github.com/search/users?q='+name,
	      dataType: 'json',
	      cache: false,
	       complete: function(){
       		 $('#loading-image').hide();
   		  },
	      success: function(data) {
	       
	         $('#loading-image').hide();
	         this.setState({userList:data.items,total:data.total_count});
	         page=1;
	         this.state.pageList=[];
	         for(var i=(page-1)*this.state.entries,j=0;i<Math.min(page*this.state.entries,data.total_count);i++,j++)
			{
				this.state.pageList[j]=this.state.userList[i];
				
			}

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
			console.log(i+ " "+ j);
			this.state.pageList[j]=this.state.userList[i];
		}

		this.setState({rerender:true})
		console.log(this.state.pageList);
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
		this.setState({entries : e.target.value})
	}

  render(){
  	if(this.state.active===true)
  	{
    return (
      <div>
      <SearchBox searching={this.findName}/>
      <input type="text"  placeholder='Enter the no of entries.'  onChange={this.changeEntries} />
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
	      <div id="loading-image">loading....</div>
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
	      <div id="loading-image" >loading....</div>
	      <SearchResult List={this.state.pageList}/>
	    
	      </div>
	      );
		}
		else if(this.state.total>page*this.state.entries)
		{
		 return (
	      <div>
	      <SearchBox searching={this.findName}/>
	      <div id="loading-image" >loading....</div>
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
	      <div id="loading-image" >loading....</div>
	      <SearchResult List={this.state.pageList}/>

	      <input type="button" onClick={this.prevPage} value="Pre"/>

	      </div>
	      );
		}
	}
	}
}
ReactDOM.render(<App />, document.getElementById('content'));
	