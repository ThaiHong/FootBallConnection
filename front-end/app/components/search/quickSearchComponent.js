/**
 * Created by dtnha on 12/30/2016.
 */
import React, {Component} from 'react'
import {APP_URL} from '../../config/appConfig'
class QuickSearch extends React.Component{

    constructor(props){
        super(props);
        this.state = {listEventSearched:this.props.listEventSearched, timeOut : null};
        this.handleOnchange = this.handleOnchange.bind(this);

    }
    componentDidMount(){
        $(document).ready(function () {
            $('#input_search').keypress(function () {
                $('.search .results').css({display:"block"});

            });

            $("body *").not("#search").mouseover(function(e){
                // do something
            }).mouseout(function(e){

            }).click(function(e){
                // do something
                $('.search .results').css({display:"none"});
                $('#input_search').val("");
            });

        })

    }
    componentWillUnmount(){
    }

    handleOnchange(e){
        var timeOut = this.state.timeOut;
        clearTimeout(timeOut);
        let value = e.target.value;
        if(value!==''){
            this.setState({timeOut : setTimeout(function() {this.props.searchEventByKeyword(value)}.bind(this), 500)});
        }else{
            $('.search .results').css({display:"none"});
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({listEventSearched:this.props.listEventSearched});
    }

    render(){
``
        var results = this.props.listEventSearched ? this.props.listEventSearched.map(event=>(

            <li key={event.id}>
                <a href={"/event/"+event.id}  className="row a-search">
                    <div className="col-xs-8 search-item">
                        <img src={(event.imageCover) ? APP_URL+event.imageCover+"/thumb" : "https://vaadin.com/documents/10187/0/vaadin+dev+day+munich+2016.png/79aa59bd-6d6b-4c9f-98c7-3bb76518f2df?t=1473849469145"} className="results-image-item-style">
                        </img>
                    </div>
                    <div className="col-xs-16 search-item">
                        <span className="results-title-text-style">{event.title}</span>
                        <br/>
                        <i className="results-location-text-style">{event.location}</i>
                    </div>

                </a>

            </li>
        )): null

        return (
                <div className="search" id="search">
                    <input id="input_search" className="input-search" type="text" name="q" placeholder="Search" onChange={ this.handleOnchange}/>

                    <ul className="results"  >
                        {
                            results
                        }
                        <li><center><a href="advanced-search.html">See more...</a></center></li>
                    </ul>
                </div>

        );
    }
}
export default QuickSearch;