/**
 * Created by hvthien on 1/17/2017.
 */
import React, {Component} from 'react'

class Maps extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        var eventDetail = this.props.eventDetail;
        var latitude = eventDetail.latitude;
        var longitude = eventDetail.longitude;
        var address = eventDetail.address;
        var location = eventDetail.location;
        var title = eventDetail.title;

        var label1 = title;
        var pos = {
            lat: latitude,
            lng: longitude
        }
        google.maps.event.addDomListener(window, 'load',
        function initMaps() {
            var label = label1;
            var map = new google.maps.Map(document.getElementById('map-content'), {
                center: {lat: parseFloat(pos.lat), lng: parseFloat(pos.lng)},
                zoom: 16,
                // mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var myMarker1 = new google.maps.Marker({
                position: new google.maps.LatLng(pos.lat, pos.lng),
                draggable: false
            })

            var latlng = new google.maps.LatLng(pos.lat, pos.lng);
            myMarker1.setPosition(latlng);
            myMarker1.setMap(map);

            var contentString = '<div class="event-detail-map-info-window">' +
                '<div class="map-title">' + label + '</div>' +
                '<div>' +
                '<p><b>Address: ' + address + '</b></p>' +
                '<p>Location: ' + location + '</p>' +
                '</div>' +
                '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            infowindow.open(map, myMarker1);
            google.maps.event.addListener(map, 'click', function () {
                infowindow.close();
            });

            myMarker1.addListener('click', function () {
                infowindow.open(map, myMarker1);
            });
        });
    }

    render() {
        var mapStyle = {
            minHeight: 700,
            width: "100%",
            padding: 0,
        }
        return (
            <div id="map-content" style={mapStyle}></div>
        )
    }
}

export default Maps