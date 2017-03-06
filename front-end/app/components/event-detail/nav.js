/**
 * Created by ltphuc on 12/23/2016.
 */
import React, {Component} from 'react'

class Nav extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <nav className="navbar navbar-default event-detail-nav">
                <div className="container">
                    <ul className="nav navbar-nav">
                        <li>
                            <a className="page-scroll event-detail-nav-title" href="#intro"
                               title="Introduce">Introduce</a>
                        </li>
                        <li>
                            <a className="page-scroll event-detail-nav-title" href="#topic" title="Topic">Topic</a>
                        </li>

                        <li>
                            <a className="page-scroll event-detail-nav-title" href="#sponsor"
                               title="Sponsor">Sponsor</a>
                        </li>
                        <li>
                            <a className="page-scroll event-detail-nav-title" href="#other"
                               title="Other">Other</a>
                        </li>

                    </ul>
                </div>
            </nav>
        )
    }
}

export default Nav