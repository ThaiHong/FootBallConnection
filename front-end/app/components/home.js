/**
 * Created by pvdinh on 12/19/2016.
 */
import React from 'react'
import AlertFormSignUpButton from './alertFormSignUpButton'
class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div>
            <AlertFormSignUpButton />
          </div>
        )
    }
}
export default Home;
