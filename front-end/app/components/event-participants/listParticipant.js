/**
 * Created by hvthien on 1/9/2017.
 */
import React, {Component} from 'react'
import {getEnrollmentsByEventId, getEnrollmentsByEventIdRange} from '../../actions/enrollmentAction'
import {getEnrollmentsByUserEvent} from '../../api/enrollmentAPI'
import {searchEnrollmentsByKeywordAndEventId} from '../../actions/searchAction'
import {getEventTitle} from '../../api/eventApi'

class ListParticipant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            data : [],
            isLoaded: false,
            start : 0,
            num: 10,
            numParticipants: 0,
            numCheckIns: 0
        };

        var self=this;
        database.ref('events/'+this.props.params.eventId).once('value').then(function(snapshot){
            self.setState({data:snapshot.val()});
        });
    }

    componentWillMount() {
        getEnrollmentsByEventId(this.props.params.eventId);
        var self = this;
        // getEnrollmentsByEventIdRange(this.props.params.eventId, 0, 10);
        getEventTitle(this.props.params.eventId, (title) => {
            self.setState({title: title})
        });
    }

    componentDidMount(){
        var comp = this;

        $('#list-participant tbody').on('change', 'input[type="checkbox"][name="checkin"]', function(){
            var userId = $(this).attr("id");
            if($(this).is(":checked")){
                database.ref("events/"+comp.props.params.eventId+"/"+userId+"/check").set(1);
                comp.setState({numCheckIns: comp.state.numCheckIns+1});
            }
            else{
                database.ref("events/"+comp.props.params.eventId+"/"+userId+"/check").set(0);
                comp.setState({numCheckIns: comp.state.numCheckIns-1});
            }
        });

        $('#list-participant tbody').on('change', 'input[type="checkbox"][name="confirm"]', function(){
            var userId = $(this).attr("id");
            if($(this).is(":checked")){
                database.ref("events/"+comp.props.params.eventId+"/"+userId+"/confirm").set(1);
            }
            else{
                database.ref("events/"+comp.props.params.eventId+"/"+userId+"/confirm").set(0);
            }
        });
    }

    render() {
        var enrollments = this.props.enrollments;
        var eventId = this.props.params.eventId;
        var table;
        var self = this;

        if (!this.state.isLoaded && enrollments && enrollments.length > 0) {
            this.state.isLoaded = true;
            table = $('#list-participant').DataTable({
                "scrollX": "100%",
                // "aLengthMenu": [
                //     [10, 25, 50, 100, -1],
                //     [10, 100, 200, "All"]
                // ],
                "aoColumns": [
                    {"width": "20%"},
                    {"width": "20%"},
                    {"width": "14%"},
                    {"width": "10%"},
                    {"width": "20%"},
                    {"width": "8%", "className": "dt-center"},
                    {"width": "8%", "className": "dt-center"}
                ],
                "fixedColumns": {
                    "leftColumns": 0,
                    "rightColumns": 2
                }
                // "dom": 'lBfrtip',
                // "buttons": [
                //     'pdfHtml5'
                // ]
            });

            if (table.data().count() == 0) {
                enrollments.forEach((enrollment) => {
                    var checkedin = enrollment.checkIn==1 ? "checked" : "";

                    database.ref("events/" + eventId + "/" + enrollment.user.id + "/check").on('value', function (data) {
                        let checkInStatus = $('input[name="checkin"][id="' + enrollment.user.id + '"]');

                        if (data.val() == 1) {
                            if(!checkInStatus.is(":checked")){
                                self.state.numCheckIns += 1;
                                checkInStatus.prop('checked', true);
                            }
                        }
                        else {
                            if(checkInStatus.is(":checked")){
                                self.state.numCheckIns -= 1;
                                checkInStatus.prop('checked', false);
                            }
                        }
                    })

                    var confirm = enrollment.confirm==1 ? "checked" : "";

                    database.ref("events/" + eventId + "/" + enrollment.user.id + "/confirm").on('value', function (data) {
                        let checkInStatus = $('input[name="confirm"][id="' + enrollment.user.id + '"]');

                        if (data.val() == 1) {
                            checkInStatus.prop('checked', true);
                        }
                        else {
                            checkInStatus.prop('checked', false);
                        }
                    })

                    var authorizationCode = enrollment.authorizationCode ? enrollment.authorizationCode : "";
                    var fullName = enrollment.user.fullName ? enrollment.user.fullName : "";
                    var email = enrollment.user.email ? enrollment.user.email : "";
                    var rangeAge = enrollment.user.rangeAge ? enrollment.user.rangeAge : "";
                    var phone = enrollment.user.phone ? enrollment.user.phone : ""

                    this.state.numParticipants+=1;
                    if(enrollment.checkIn==1){
                        this.state.numCheckIns+=1;
                    }

                    table.row.add([
                        fullName,
                        email,
                        rangeAge,
                        phone,
                        authorizationCode,
                        '<div class="pretty primary smooth"><input type="checkbox" name="confirm" id="' + enrollment.user.id + '" ' + confirm + '><label><i class="fa fa-check"></i></label><span id="cf'+enrollment.user.id+'"></span></div>',
                        '<div class="pretty success smooth"><input type="checkbox" name="checkin" id="' + enrollment.user.id + '" ' + checkedin + '><label><i class="fa fa-check"></i></label><span id="ci'+enrollment.user.id+'"></span></div>'
                    ]).draw();
                })
            }

            // var pdfButton = $(".dt-buttons").detach();
            // $("#buttons").append(pdfButton);
            // var excelBtn = $("#excel-export").detach();
            // pdfButton.append(excelBtn);

            database.ref('events/' + this.props.params.eventId).on('child_added', function (snapshot) {
                console.log("da them moi hehe");
                var key = snapshot.key;
                // console.log("Name", snapshot.val().fullName);
                // console.log("Name", snapshot.val().code);
                // console.log("Name", snapshot.val().phone);
                // console.log("Name", snapshot.val().email);
                // console.log("Name", snapshot.val().rangeAge);

                var existed = false;
                for (var i = 0; i < enrollments.length; i++) {
                    if (enrollments[i].user.id == key) {
                        existed = true;
                    }
                }

                if ($('#' + key).length > 0) {
                    existed = true;
                }

                if (!existed) {
                    getEnrollmentsByUserEvent(eventId, key, (enrollment) => {
                        var checkedin = enrollment.checkIn ? "checked" : "";
                        database.ref("events/" + eventId + "/" + enrollment.user.id + "/check").on('value', function (data) {
                            let checkInStatus = $('input[name="checkin"][id="' + enrollment.user.id + '"]');

                            if (data.val() == 1) {
                                checkInStatus.prop('checked', true);
                            }
                            else {
                                checkInStatus.prop('checked', false);
                            }
                        })
                        var confirm = enrollment.confirm ? "checked" : "";
                        database.ref("events/" + eventId + "/" + enrollment.user.id + "/confirm").on('value', function (data) {
                            let checkInStatus = $('input[name="confirm"][id="' + enrollment.user.id + '"]');

                            if (data.val() == 1) {
                                checkInStatus.prop('checked', true);
                            }
                            else {
                                checkInStatus.prop('checked', false);
                            }
                        })

                        var authorizationCode = enrollment.authorizationCode ? enrollment.authorizationCode : "";
                        var fullName = enrollment.user.fullName ? enrollment.user.fullName : "";
                        var email = enrollment.user.email ? enrollment.user.email : "";
                        var rangeAge = enrollment.user.rangeAge ? enrollment.user.rangeAge : "";
                        var phone = enrollment.user.phone ? enrollment.user.phone : ""

                        table.row.add([
                            fullName,
                            email,
                            rangeAge,
                            phone,
                            authorizationCode,
                            '<div class="pretty primary smooth"><input type="checkbox" name="confirm" id="' + enrollment.user.id + '" ' + confirm + '><label><i class="fa fa-check"></i></label><span id="cf'+enrollment.user.id+'"></span></div>',
                            '<div class="pretty success smooth"><input type="checkbox" name="checkin" id="' + enrollment.user.id + '" ' + checkedin + '><label><i class="fa fa-check"></i></label><span id="ci'+enrollment.user.id+'"></span></div>'
                        ]).draw();
                    })

                    // if (table.data().count() < 10){
                    // getEnrollmentsByUserEvent(eventId, key, (enrollment) => {
                    //     var checkedin = snapshot.val().check == 1 ? "checked" : "";
                    //     database.ref("events/" + eventId + "/" + key + "/check").on('value', function (data) {
                    //         let checkInStatus = $('input[name="checkin"][id="' + key + '"]');
                    //
                    //         if (data.val() == 1) {
                    //             if(!checkInStatus.is(":checked")){
                    //                 self.state.numCheckIns += 1;
                    //                 checkInStatus.prop('checked', true);
                    //             }
                    //         }
                    //         else {
                    //             if(checkInStatus.is(":checked")){
                    //                 self.state.numCheckIns -= 1;
                    //                 checkInStatus.prop('checked', false);
                    //             }
                    //         }
                    //     })
                    //     var confirm = snapshot.val().confirm == 1 ? "checked" : "";
                    //     database.ref("events/" + eventId + "/" + key + "/confirm").on('value', function (data) {
                    //         let checkInStatus = $('input[name="confirm"][id="' + key + '"]');
                    //
                    //         if (data.val() == 1) {
                    //             checkInStatus.prop('checked', true);
                    //         }
                    //         else {
                    //             checkInStatus.prop('checked', false);
                    //         }
                    //     })
                    //
                    //     self.state.numParticipants += 1;
                    //     if (snapshot.val().confirm == 1) {
                    //         self.state.numCheckIns += 1;
                    //     }
                    //
                    //     var authorizationCode = snapshot.val().code ? snapshot.val().code : "";
                    //     var fullName = snapshot.val().fullName ? snapshot.val().fullName : "";
                    //     var email = snapshot.val().email ? snapshot.val().email : "";
                    //     var rangeAge = snapshot.val().rangeAge ? snapshot.val().rangeAge : "";
                    //     var phone = snapshot.val().phone ? snapshot.val().phone : ""
                    //
                    //     table.row.add([
                    //         fullName,
                    //         email,
                    //         rangeAge,
                    //         phone,
                    //         authorizationCode,
                    //         '<div class="pretty primary smooth"><input type="checkbox" name="confirm" id="' + key + '" ' + confirm + '><label><i class="fa fa-check"></i></label><span id="cf'+key+'"></span></div>',
                    //         '<div class="pretty success smooth"><input type="checkbox" name="checkin" id="' + key + '" ' + checkedin + '><label><i class="fa fa-check"></i></label><span id="ci'+key+'"></span></div>'
                    //     ]).draw();
                    // })
                }

            });

            $('.dataTables_filter input').keyup(function (e) {
                var keyword = e.target.value;
                console.log(e.target.value);
                console.log($('.dataTables_empty'));
                if ($('.dataTables_empty').length) {
                    // $('.dataTables_empty').html("<img src='http://www.opcpharma.com/templates/opcpharma/images/loading.gif' height='20px' width='20px'/>");
                    // var eventId = comp.props.params.eventId;
                    searchEnrollmentsByKeywordAndEventId(keyword, eventId);
                }
            })
        }

        // if(this.state.isLoaded){
            // table = $('#list-participant').dataTable();
            // if(enrollments) {
            //     enrollments.forEach((enrollment) => {
            //         var existed = false;
            //
            //         if ($('#' + enrollment.user.id).length > 0) {
            //             existed = true;
            //         }
            //
            //         if (!existed) {
            //             var checkedin = enrollment.checkIn ? "checked" : "";
            //             database.ref("events/" + eventId + "/" + enrollment.user.id + "/check").on('value', function (data) {
            //                 let checkInStatus = $('input[name="checkin"][id="' + enrollment.user.id + '"]');
            //
            //                 if (data.val() == 1) {
            //                     checkInStatus.prop('checked', true);
            //                 }
            //                 else {
            //                     checkInStatus.prop('checked', false);
            //                 }
            //             })
            //             var confirm = enrollment.confirm ? "checked" : "";
            //             database.ref("events/" + eventId + "/" + enrollment.user.id + "/confirm").on('value', function (data) {
            //                 let checkInStatus = $('input[name="confirm"][id="' + enrollment.user.id + '"]');
            //
            //                 if (data.val() == 1) {
            //                     checkInStatus.prop('checked', true);
            //                 }
            //                 else {
            //                     checkInStatus.prop('checked', false);
            //                 }
            //             })
            //
            //             var authorizationCode = enrollment.authorizationCode ? enrollment.authorizationCode : "";
            //
            //             table.row.add([
            //                 enrollment.user.fullName,
            //                 enrollment.user.email,
            //                 enrollment.user.rangeAge,
            //                 enrollment.user.phone,
            //                 authorizationCode,
            //                 '<div class="pretty primary smooth"><input type="checkbox" name="confirm" id="' + enrollment.user.id + '" ' + confirm + '><label><i class="fa fa-check"></i></label></div>',
            //                 '<div class="pretty success smooth"><input type="checkbox" name="checkin" id="' + enrollment.user.id + '" ' + checkedin + '><label><i class="fa fa-check"></i></label></div>'
            //             ]).draw();
            //         }
            //     });
            // }
            //
            // if ($('.dataTables_empty').length) {
            //     $('.dataTables_empty').html("Not found!");
            // }
        // }

        var linkExcel = "/api/downloads/excellist/" + eventId;
        var linkPDF = "/api/downloads/pdflist/" + eventId;

        return (
            <div className="list-participant-body">
                <div className="col-md-2 col-lg-4">
                </div>
                <div className="col-md-20 col-lg-16 list-participant-content">
                    <div className="col-sm-16 col-md-16 col-lg-8 list-participant-title">
                        <div className="ticket-title">{this.state.title &&
                            this.state.title
                        } -  Participants</div>

                    </div>
                    <div className="col-xs-24 col-sm-8 col-md-8 col-lg-8 list-participant-title pull-right">
                        <div className="back-to-my-event pull-right">
                            <a href="/my-event">
                            <i className="glyphicon glyphicon-arrow-left"> </i> Back to my events
                            </a>
                        </div>
                    </div>

                    {/*<div className="row">*/}
                        {/*<div className="col-md-24">*/}
                            {/*<strong>Number of Participants: {this.state.numParticipants}</strong>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-24">*/}
                            {/*<strong>Number of Check-in: {this.state.numCheckIns}</strong>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    <div className="list-participant-table">
                        <table id="list-participant" className="table table-responsive table-list"
                               cellSpacing="0"
                               width="100%">
                            <thead>
                            <tr>
                                <th>Full name</th>
                                <th>Email</th>
                                <th>Range Age</th>
                                <th>Phone</th>
                                <th>Authentication Code</th>
                                <th>Confirm</th>
                                <th>Check in</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>Full name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Phone</th>
                                <th>Authentication Code</th>
                                <th>Confirm</th>
                                <th>Check in</th>
                            </tr>
                            </tfoot>
                            <tbody>
                            </tbody>
                        </table>
                        <div id="buttons" className="row export-buttons ">
                            <a href={linkPDF} target="blank" id="pdf-export" className="dt-button buttons-pdf buttons-html5">PDF</a>
                            <a href={linkExcel} target="blank" id="excel-export" className="dt-button buttons-excel buttons-html5">Excel</a>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default ListParticipant;
