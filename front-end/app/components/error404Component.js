/**
 * Created by vdhong on 1/17/2017.
 */

import React from 'react'
class Error404 extends React.Component {
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
                          <a href="/">  <img src="/assets/logo.png" className="dp-error logo-img "/></a>
                        </div>
                        <div className="row col-xs-24 center">
                            <h2> Oops,Page not found! </h2>
                        </div>
                        <div className="row col-xs-24">
                            <p className="center font-size-title ">The page you were looking for doesn't exist</p>
                        </div>

                        <div className=" row col-xs-24">

                            <div className="center">
                                <a href="/"> <button className=" btn-error btn-error-something"> Back to home page </button></a>
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

export default Error404;