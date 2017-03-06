import React from 'react';
import { Form , Control, actions} from 'react-redux-form';
import { browserHistory } from 'react-router';
import validator from 'validator';
import {userLogined, userNotLogined} from '../actions/userLoginedAction';
import {getMyInfo} from '../api/userAPI';
import {notification} from '../config/appConfig'

class SignUpComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {errorMessage: ""};
    }

    handleSubmit(val) {
      const {signUpAccountFunction, dispatch} = this.props;
      let account = {
          fullName : val.fullName.trim(),
          email : val.email.trim(),
          password : val.password.trim()
      };

        $.blockUI(loading);

        signUpAccountFunction(account, (response) => {
            $.unblockUI();

            let data = response.data;
            if(data.status && data.status == 422){
              this.setState({errorMessage: "Your Email Already Exist !"});
            }
            else if(data.status && data.status == 401){
              dispatch(userNotLogined());
            }else{
              let token = data.token;
              localStorage.setItem('token', token);
              this.setState({errorMessage: ""});
              $('#signInSignUpForm').modal('hide');
              dispatch(actions.reset('AppForm.signUpAccount'));
              getMyInfo(token, (res)=> {dispatch(userLogined(res));});
            }
      }, (error) =>{
            $.unblockUI();
            notification("warning", "Something Wrong",'');
      });

    }

    componentWillMount(){
      const {dispatch} =  this.props;
      dispatch(actions.reset('AppForm.signUpAccount'));
    }

    render() {
        const {validation} = this.props;
        return (
          <div>
            <Form model="AppForm.signUpAccount" onSubmit={value => this.handleSubmit(value)} >

              <div className="form-group">
                <div className="input-group">
                   <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                   <Control type="text" model="AppForm.signUpAccount.fullName" updateOn="change"  placeholder="FullName" className="form-control no-border-radius" validateOn="change" value={this.props.signUpAccount.fullName}
                   validators={{minLength: (value) => value.trim().length > 0,
                                maxLength: (value) => value.trim().length < 20}}/>
                   { !validation.fullName.touched ? null :
                    validation.fullName.valid ? <span className="input-group-addon"><i className="text-success glyphicon glyphicon-ok"></i></span> :
                    <span className="input-group-addon"   ><i className="text-danger glyphicon glyphicon-remove"></i></span>
                   }
                </div>
              </div>

              <div className="form-group">
                  <div className="input-group">
                        <span className="input-group-addon" ><i className="glyphicon glyphicon-envelope"></i></span>
                        <Control type="text" model="AppForm.signUpAccount.email" updateOn="change"  placeholder="Email Address" className="form-control no-border-radius" validateOn="change" value={this.props.signUpAccount.email}
                        validators={{minLength: (value) => value.trim().length > 0,
                                isEmail: (value) => validator.isEmail(value.trim())}}/>
                        { !validation.email.touched ? null :
                         validation.email.valid ? <span className="input-group-addon"   ><i className="text-success glyphicon glyphicon-ok"></i></span> :
                         <span className="input-group-addon"   ><i className="text-danger glyphicon glyphicon-remove"></i></span>
                        }
                  </div>
                  <span style={{color :'red'}}>{this.state.errorMessage}</span>
              </div>

              <div className="form-group">
                  <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                      <Control type="password" model="AppForm.signUpAccount.password" updateOn="change"  placeholder="Password" className="form-control no-border-radius" validateOn="change" value={this.props.signUpAccount.password}
                      validators={{minLength: (value) => value.trim().length > 6}}/>
                      { !validation.password.touched ? null :
                       validation.password.valid ? <span className="input-group-addon"><i className="text-success glyphicon glyphicon-ok"></i></span> :
                       <span className="input-group-addon"   ><i className="text-danger glyphicon glyphicon-remove"></i></span>
                      }
                  </div>
              </div>

              <div className="form-group">
                  <div className="input-group">
                       <span className="input-group-addon" ><i className="glyphicon glyphicon-pencil"></i></span>
                       <Control type="password" model="AppForm.signUpAccount.rePassword" updateOn="change"  placeholder="Confirm Password" className="form-control no-border-radius" validateOn="change" value={this.props.signUpAccount.rePassword}
                       validators={{minLength: (value) => value.trim().length > 6}}/>
                       { !validation.rePassword.touched ? null :
                        validation.rePassword.valid && (this.props.signUpAccount.password.trim() === this.props.signUpAccount.rePassword.trim()) ? <span className="input-group-addon"><i className="text-success glyphicon glyphicon-ok"></i></span> :
                        <span className="input-group-addon"   ><i className="text-danger glyphicon glyphicon-remove"></i></span>
                       }
                  </div>
              </div>
              <div>
                    <div className="no-border-radius">
                        {(validation.$form.valid || !validation.$form.touched) ?
                            <button  className="button-sign" type="submit" > Sign up </button> :
                            <button disabled className="button-sign" type="submit"> Sign up </button>}
                    </div>
               </div>
            </Form>
          </div>
        );
    }
}
export default SignUpComponent
