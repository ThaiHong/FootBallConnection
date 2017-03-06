/**
 * Created by ltphuc on 12/23/2016.
 */
import React, {Component} from 'react'
import SponsorItem from './sponsorItem'

class Sponsor extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <div className="col-md-24 event-detail-sponsor">
                <div className="container event-detail-sponsor-body">
                    <h3 className="event-detail-content-title">Sponsor</h3>
                    <div className="col-sm-24 col-md-24" style={{marginTop: 30}}>
                        <section id="sponsor">
                            {
                                this.props.sponsors.map((sponsor, i) =>
                                    <SponsorItem key={i} image={sponsor.image} sponsorName={sponsor.sponsorName}
                                                 location={sponsor.location} description={sponsor.description}
                                                 id={sponsor.id}/>
                                )
                            }
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sponsor