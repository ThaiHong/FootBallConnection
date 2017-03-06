/**
 * Created by dtnha on 12/30/2016.
 */
import React from 'react'
import {connect} from 'react-redux'

import {searchEventByKeyword} from '../actions/searchAction'
import QuickSearch from '../components/search/quickSearchComponent'

const mapStateToQuickSearchProps = (state, ownProps) => {
    return {
        listEventSearched: state.listEventSearched
    };
}

const mapDispatchToQuickSearchProps = (dispatch, ownProps) => {
    return {
        searchEventByKeyword: (keyword) => searchEventByKeyword(keyword)
    }
}

const QuickSearchContainer = connect(
    mapStateToQuickSearchProps,
    mapDispatchToQuickSearchProps
)(QuickSearch)

export default QuickSearchContainer