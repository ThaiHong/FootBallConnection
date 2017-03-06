import React from 'react'
import {Link} from 'react-router';
import HeaderContainer from '../containers/headerContainer';
import Footer from './footer';
const Main = React.createClass({

    componentWillMount(){
        // $.blockUI(loading);
        // $(document).ready(function(){
        //     $.unblockUI();
        // });
    },

    render() {
        return (
            <div>
                <HeaderContainer/>
                    {this.props.children}
                <Footer/>
            </div>
        );
    }
});

export default Main;
