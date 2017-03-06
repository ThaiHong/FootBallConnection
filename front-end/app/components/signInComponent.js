/**
 * Created by ltphuc on 12/20/2016.
 */
import React, {Component} from 'react'
import AlertForgotPassword from './alertForgotPasswordLink';

class SignInComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: $('#emailLogin').val()!=''?$('#emailLogin').val():'',
            password: '',
            message: ''
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        const set = (val) => this.setState(val);
        $('#emailLogin').change(function () {
            var email = $('#emailLogin').val();
            set({email: email});
        });

    }

    handleEmailChange(event) {
        var email = event.target.value;
        var password = this.state.password;
        this.setState({email: email, password: password, message: this.state.message});
    }

    handlePasswordChange(event) {
        var password = event.target.value;
        var email = this.state.email;
        this.setState({email: email, password: password, message: this.state.message});
    }

    handleSubmit(event) {

        event.preventDefault();

        var password = this.state.password.trim();
        var email = this.state.email.trim();

        if (email && password) {
            this.props.loginWithSystemAccount({email: email, password: password});
            this.setState({email: email, password: password, message: this.state.message});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({message: nextProps.auth.message.message});
        console.log(this.state.message);
    }


    render() {

        var linkStyle = {
            textAlign: "right",
            marginBottom: 20,
            paddingRight: 0,
            fontSize: 13,
            fontWeight: 600
        }

        var responseMessage = this.state.message ? (
            <div className="alert alert-danger" style={{marginBottom: 20}}>{this.state.message}</div>) : ''

        return (
            <div>
                <div>
                    <form>
                        {responseMessage}
                        <div id="success_forgot"></div>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon no-border-radius"><i
                                    className="glyphicon glyphicon-envelope"></i></span>
                                <input type="email" className="form-control no-border-radius" id="emailLogin"
                                    placeholder="Enter your email" required="required"
                                    value={this.state.email} onChange={this.handleEmailChange}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon no-border-radius"><i
                                    className="glyphicon glyphicon-lock"></i></span>
                                <input type="password" className="form-control no-border-radius" id="pwd"
                                    placeholder="Enter your password" required="required"
                                    value={this.state.password} onChange={this.handlePasswordChange}
                                   />
                            </div>
                        </div>

                        <div className="checkbox">
                            <label className="col-md-6">
                                <input type="checkbox"/> Remember Me?
                            </label>
                            <label className="col-md-6 col-md-offset-11" style={linkStyle}>
                            <AlertForgotPassword/>

                            </label>
                        </div>

                        <div className="form-group">
                            <input className="button-sign no-border-radius" type="submit"
                                value="Sign in" onClick={this.handleSubmit}/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignInComponent;
