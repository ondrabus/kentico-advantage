import React from "react"
import styled from "styled-components"
import * as style from '../styles'
import AzureSearch from 'azure-search'
import ContentZone from './content-zone'
import Jumbotron from "../components/jumbotron"

const SearchResultsContainer = styled.div`
    form
    {
        color: ${style.palette.jumbotron_content_heading_foreground};
        line-height: 1.1em;
        font-weight: 300;
        padding: 10px 20px;
        display: flex;
        align-items: baseline;
    }

    form label
    {
        font-size: 2em;
        white-space: nowrap;
        padding-right: 10px;
    }

    form input[type=text]
    {
        font-weight: bold;
        display: inline-block;
        border: 0;
        border-bottom: 2px solid #9196cd;
        padding: 0 0 0 10px;
        background: transparent;
        font-size: 2em;
        color: #fff;
        font-family: 'Source Sans Pro', sans-serif;
        min-width: 0;
        width: 100%;
        
        transition: all 0.3s;
        -webkit-transition: all 0.3s;
    }
    form input:focus
    {
        outline: none;
        border-color: #fff;
    }

    ${style.media.sm`
        form label, form input[type=text]
        {
            font-size: 3.2em;
        }
    `}

    a h2
    {
        color: ${style.palette.a_foreground};
    }
    a:hover
    {
        text-decoration: none;
    }
    a:hover h2
    {
        color: ${style.palette.a_hover_foreground};
    }

`;

class SearchResults extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            query: this.props.searchQuery,
            results: [],
            searching: this.props.searchQuery !== null
        };
        this.performSearch = this.performSearch.bind(this);
        this.processSearchResults = this.processSearchResults.bind(this);
    }

    componentDidMount(){
        if (this.state.query)
        {
            this.performSearch(null);
        }
    }

    performSearch = (event) => {
        if (event)
        {
            event.preventDefault();
        }

        var client = AzureSearch({
            url: 'https://kentico-advantage.search.windows.net',
            key: '7140BE1173CB92C78644B3962E4EE57F'
        });
        client.search('kentico-advantage-search-index', {search: this.searchInput.value}, this.processSearchResults);
    }

    processSearchResults = (err, results) => {
        this.setState((state) => ({
            query: state.query,
            results: results,
            searching: false
        }));
    }

    render(){
        var searchResults = this.state.results.map((item) => 
        <ContentZone key={item.id}>
            <a href={'/' + item.url} title={item.title}><h2>{item.title}</h2></a>
            <div dangerouslySetInnerHTML={{__html: item.teaser }}></div>
        </ContentZone>        
        );
        var noResults = (
            <ContentZone>
                <h2>Your search yielded no results</h2>
                <p>Please check if your spelling is correct.</p>
            </ContentZone>
        );
        var searching = (
            <ContentZone>
                <h2>Searching for '{this.state.query}'...</h2>
                <p>Please give us a moment to find what you are looking for.</p>
            </ContentZone>
        );

        return (
            <SearchResultsContainer>
                <Jumbotron
                    className="jumbotron-content-page violet">
                    <form onSubmit={this.performSearch}>
                        <label htmlFor="query">Results for:</label>
                        <input type="text" name="query" ref={(input) => { this.searchInput = input; }} defaultValue={this.state.query} />
                    </form>
                </Jumbotron>
                
                {this.state.searching ? 
                    searching
                    : searchResults.length > 0 ?
                        searchResults
                        : noResults }
            </SearchResultsContainer>)
    }
}

export default SearchResults