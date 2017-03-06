/**
 * Created by vdhong on 1/17/2017.
 */

import React from 'react'
import {dispatch} from '../store';
import {actions} from 'react-redux-form';
class ErrorSomethingwrong extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="row background-event-manage no-padding profile-body">
                <div className="col-xs-2">

                </div>

                <div className="col-xs-20 col-md-24 profile-body form-error">
                    <div className="container form-speaker padding-top-10">
                        <div className="row col-xs-24">
                         <a href="/"> <img src="/assets/logo.png" className="dp-error logo-img "/></a>
                        </div>
                        <div className="row col-xs-24 center">
                            <h2>Some thing went wrong ! </h2>
                        </div>
                        <div className="row col-xs-24">
                            <p className="center font-size-title ">  An unexpected eror has occurred</p>
                        </div>

                        <div className=" row col-xs-24">

                            <div className="center">
                                <a href="/"> <button className=" btn-error btn-error-something btn-size-error"> Back to home page </button></a>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="col-xs-2">

                </div>

            </div>
        );
    }
}

export default ErrorSomethingwrong;