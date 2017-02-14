import React, {Component, PropTypes} from 'react';
import ChildSearchResult from './ChildSearchResult'

var current_page = 1;
var records_per_page = 5;

export default class SearchResult extends Component {

   constructor(props) {    /* Note props is passed into the constructor in order to be used */
        super(props);
      
    }

    prevPage()
    {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    }

    nextPage()
    {
        if (current_page < numPages()) {
            current_page++;
            changePage(current_page);
        }
    }

    changePage(page)
    {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        var listing_table = document.getElementById("listingTable");
        var page_span = document.getElementById("page");
     
        // Validate page
        if (page < 1) page = 1;
        if (page > numPages()) page = numPages();

        listing_table.innerHTML = "";

        for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
            listing_table.innerHTML += this.props.objJson[i].adName + "<br>";
        }
        page_span.innerHTML = page;

        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }

        if (page == numPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }
    }

    numPages()
    {
        return Math.ceil(this.props.objJson.length / records_per_page);
    }


    render (){
    
     return (
        <div id="listingTable">
        <a href={this.prevPage} id="btn_prev">Prev</a>
        <a href={this.nextPage} id="btn_next">Next</a>
                page: <span id="page"></span>
       </div>
     );
   }
}   
