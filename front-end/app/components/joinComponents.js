import React, {Component} from 'react'
import FormGroup from './FormGroup'
import FormGroupSelect from './FormGroupSelect'

class JoinComponent extends Component {
    constructor(props) {
        super(props);

        const attr = {
            value: '',
            touched: false,
            valid: false
        }

        this.state = {
            constRange: [
                {id: 0, typeName: "-Select Your Age-"},
                {id:1, typeName: "Under 18 "},
                {id:2, typeName: "18 - 25"},
                {id:3, typeName: "25 - 35"},
                {id:4, typeName: "Over 35"}
                ],
            name: attr,
            email: attr,
            phone: attr,
            age: {
                value: '',
                touched: false,
                valid: false
            },
            job: attr,
            eventId: 0
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleJobChange = this.handleJobChange.bind(this);
        this.validateJoinEventForm = this.validateJoinEventForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const set = (val) => this.setState(val);
        const constRange = this.state.constRange;
         $('#joinEventAge').change(function () {
            var ageId = $('#joinEventAge').val();

            // var valid = cats.length > 0 ? true : false;
             if(ageId>0) {
                 set({age: {value: constRange[ageId].typeName, touched: true, valid: true}});
             }
             else{
                 set({age: {value: '', touched: true, valid: false}});
             }
            console.log(constRange[ageId].typeName);
        });

    }

    handleAgeChange(event){

    }

    handleNameChange(event) {
        var name = event.value;
        var valid = name ? true : false;
        this.setState({name: {value: name, touched: true, valid: valid}})
        console.log(name);
    }

    handleEmailChange(event) {
        var email = event.value;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = re.test(email) ? true : false;
        this.setState({email: {value: email, touched: true, valid: valid}})
        console.log(email);

    }

    handlePhoneChange(event) {
        var phone = event.value;
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        var valid = re.test(phone) ? true : false;
        this.setState({phone: {value: phone, touched: true, valid: valid}})
        console.log(phone);
    }

    handleJobChange(event) {
        var job = event.value;
        var valid = job ? true : false;
        this.setState({job: {value: job, touched: true, valid: valid}})
        console.log(this.props.eventId);

    }

    validateJoinEventForm(){
        if(this.state.name.valid && this.state.email.valid && this.state.phone.valid && this.state.job.valid && this.state.age.valid){
            return true;
        }
        else {
            return false;
        }
    }

    handleSubmit(e) {
        // e.preventDefault();

        console.log(this.props.eventId);
        var ignoreJoin = $('#rememberjoin').is(":checked");

        const user = {
            id: this.props.user.id,
            // userName: '',
            fullName: this.state.name.value,
            email: this.state.email.value,
            phone: this.state.phone.value,
            rangeAge: this.state.age.value,
            job: this.state.job.value,
            ignoreJoin: ignoreJoin
        }
        // console.log($('#rememberjoin').is(":checked"))

        if(this.validateJoinEventForm()){
            this.props.updateUser(user);
            $.blockUI(loading);
            this.props.becomeParticipant(this.props.eventId, user.id);
            $('#joinEvent').modal('toggle');
            $.unblockUI();
        }

        else{
            this.setState({name: {value: this.state.name.value, touched: true, valid: this.state.name.valid}});
            this.setState({email: {value: this.state.email.value, touched: true, valid: this.state.email.valid}});
            this.setState({phone: {value: this.state.phone.value, touched: true, valid: this.state.phone.valid}});
            this.setState({age: {value: this.state.age.value, touched: true, valid: this.state.age.valid}});
            this.setState({job: {value: this.state.job.value, touched: true, valid: this.state.job.valid}});
        }

    }

    componentWillReceiveProps(nextProps) {
        // console.log("hello1111")
        // console.log(nextProps);
        if(nextProps.userLogined) {
            if (nextProps.user.fullName) {
                this.setState({name: {value: nextProps.user.fullName, touched: true, valid: true}});
            }
            if (nextProps.user.email) {
                this.setState({email: {value: nextProps.user.email, touched: true, valid: true}});
                this.state.email.valid ? $('#email-join-event').prop("disabled", true) : $('#email-join-event').prop("disabled", false);
            }
            if (nextProps.user.phone) {
                this.setState({phone: {value: nextProps.user.phone, touched: true, valid: true}});
            }
            if (nextProps.user.job) {
                this.setState({job: {value: nextProps.user.job, touched: true, valid: true}});
            }
            if (nextProps.user.rangeAge) {
                this.state.constRange.forEach((range) => {
                    if (range.typeName == nextProps.user.rangeAge) {
                        this.setState({age: {value: nextProps.user.rangeAge, touched: true, valid: true}});
                        $('#joinEventAge').val(range.id);
                        console.log(range.id);
                    }
                })
            }
        }
        else{
            const attr = {
                value: '',
                touched: false,
                valid: false
            };
            this.setState({name: attr, email: attr, phone: attr, job: attr, age: attr});
            $('#joinEventAge').val(0);
        }
        // this.setState({message: nextProps.auth.message.message});
        // console.log(this.state.message);
    }

    render() {

        return (
            <div >
                <div className="modal fade" id="joinEvent" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title form-title">Yes, I'll Be There</h4>
                            </div>
                            <div className="modal-body quickCreate">
                                    <form className="quick-create">
                                        <input type="hidden" value={this.props.eventId} />
                                        <FormGroup
                                            type="text"
                                            iconClass="glyphicon glyphicon-pencil"
                                            onChange={this.handleNameChange}
                                            placeholder="Full Name"
                                            id="name"
                                            value={this.state.name}
                                        />
                                        <FormGroupSelect
                                            iconClass="glyphicon glyphicon-calendar"
                                            id="joinEventAge"
                                            value={this.state.age}
                                            values={this.state.constRange}
                                        />
                                        <FormGroup
                                            type="email"
                                            iconClass="glyphicon glyphicon-envelope"
                                            onChange={this.handleEmailChange}
                                            placeholder="Email"
                                            id="email-join-event"
                                            value={this.state.email}
                                        />
                                        <FormGroup
                                            type="text"
                                            iconClass="glyphicon glyphicon-earphone"
                                            onChange={this.handlePhoneChange}
                                            placeholder="Phone number"
                                            id="phone"
                                            value={this.state.phone}
                                        />
                                        <FormGroup
                                            type="text"
                                            iconClass="glyphicon glyphicon-briefcase"
                                            onChange={this.handleJobChange}
                                            placeholder="Job"
                                            id="Job"
                                            value={this.state.job}
                                        />

                                            <input className="btn btn-join btn-lg btn-block " type="button"
                                                   onClick={this.handleSubmit}
                                                   value="Join Event"/>
                                    </form>
                                <div style={{textAlign:"center"}}>
                                    <input type="checkbox" id="rememberjoin"/>
                                     Don't show this popup again
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );

    }

}
export default JoinComponent;
