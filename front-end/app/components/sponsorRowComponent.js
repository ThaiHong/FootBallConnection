/**
 * Created by XuanVinh on 1/2/2017.
 */
import React, {Component} from 'react'

class SponsorRowComponent extends Component{
    constructor(props){
        super(props);

        // this.handleDeletechange = this.handleDeletechange.bind(this);
        // this.handEditchange = this.handEditchange.bind(this);
    }





    render(){
        var link = (this.props.image)?"data:image/png;base64," + window.atob(this.props.image):"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1000px-Google_%22G%22_Logo.svg.png"

        return(
            <div className="row sponsor" >
                <div className="col-sm-4 sponsor-line">
                    <img className="sponsor-item" src={link}></img>
                </div>

                <div className="col-sm-2 sponsor-line sponsor-info">
                    {this.props.sponsorName}
                </div>
                <div className="col-sm-4 sponsor-line sponsor-info">
                    {this.props.location}
                </div>
                <div className="col-sm-10 sponsor-line sponsor-info">
                    {this.props.description}
                </div>
                <div onClick={this.props.removeSponsor} className="col-sm-2 sponsor-line sponsor-info sponsor-delete-button">
                    Delete
                </div>
                <div onClick={this.props.editSponsor} className="col-sm-2 sponsor-line sponsor-info sponsor-delete-button">
                    Edit
                </div>
            </div>
        );
    }
}

export default SponsorRowComponent;