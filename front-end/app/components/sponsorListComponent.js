/**
 * Created by XuanVinh on 1/2/2017.
 */
import React, {Component} from 'react'
import SponsorRowComponent from './sponsorRowComponent'

class SponsorListComponent extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
    }

    render(){
        return(
            <div>
                {
                    this.props.sponsors.map(
                        sponsor =><SponsorRowComponent
                            key={sponsor.id}
                            {...sponsor}
                            removeSponsor={ () => this.props.deleteSponsor(sponsor.id)}
                            editSponsor = { () => this.props.setEditSponsor(sponsor)}
                        />
                    )
                }
            </div>
        );
    }
}

export default SponsorListComponent;