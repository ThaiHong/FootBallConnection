/**
 * Created by hvthien on 1/3/2017.
 */

$("#selectboxevent").select2({
    placeholder: "Categories"
});


var map;
var pos;

google.maps.event.addDomListener(window, 'load', initMaps);
function initMaps() {
    map = new google.maps.Map(document.getElementById('quickcreatemap'), {
        center: {lat: 16.04095, lng: 108.22052699999995},
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var myMarker = new google.maps.Marker({
        position: new google.maps.LatLng(16, 108),
        draggable: true
    });
    myMarker.setMap(map);

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var latlng = new google.maps.LatLng(pos.lat, pos.lng);
            myMarker.setPosition(latlng);
            map.setCenter({
                lat: position.coords.latitude + 0.002,
                lng: position.coords.longitude - 0.005
            });
//                    document.getElementById('current').innerHTML = '<p>Your Location: Current Lat: ' + pos.lat + ' Current Lng: ' + pos.lng + '</p>';
            $('#longitude').val(pos.lng);
            $('#latitude').val(pos.lat);
        }, function () {
        });
    } else {
        // Browser doesn't support Geolocation
    }

    google.maps.event.addListener(myMarker, 'dragend', function (evt) {
//                document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
//                $('#quickcreatelocation').val("Position: ("+evt.latLng.lat()+","+evt.latLng.lng()+")")
        getAddress(evt.latLng.lat(), evt.latLng.lng());
    });

    google.maps.event.addListener(myMarker, 'dragstart', function (evt) {
//                document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
    });


    var input = document.getElementById('quickcreatelocation');
    var searchBox = new google.maps.places.SearchBox(input);

    var input2 = document.getElementById('detailcreatelocation');
    var searchBox2 = new google.maps.places.SearchBox(input2);

    searchBox.addListener('places_changed', function () {

        $('#longitude').val("");
        $('#latitude').val("");
        console.log("hehehe");
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }

        $('#longitude').val(places[0].geometry.location.lng()).change();
        $('#latitude').val(places[0].geometry.location.lat()).change();
        $('#quickcreatelocation').trigger('change');

        var pos = {
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng()
        };

        var latlng = new google.maps.LatLng(pos.lat, pos.lng);
        myMarker.setPosition(latlng);

        map.setCenter({
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng()
        });

        myMarker.setPosition(latlng);

        console.log(places[0]);

    });

    searchBox2.addListener('places_changed', function () {

        $('#longitude').val("");
        $('#latitude').val("");
        console.log("hehehe");
        var places = searchBox2.getPlaces();
        if (places.length == 0) {
            return;
        }

        $('#longitude').val(places[0].geometry.location.lng()).change();
        $('#latitude').val(places[0].geometry.location.lat()).change();
        $('#addsponsor').trigger('change');

        var pos = {
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng()
        };

        var latlng = new google.maps.LatLng(pos.lat, pos.lng);
        myMarker.setPosition(latlng);

        map.setCenter({
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng()
        });

        myMarker.setPosition(latlng);

        console.log(places[0]);

    });
}

function getAddress(latitude, longitude) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0];
                    console.log(address);
                    $('#quickcreatelocation').val(address.formatted_address);
                    $('#longitude').val(longitude).change();
                    $('#latitude').val(latitude).change();
                    resolve(address);
                }
                else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
};

$('#changelocationlink').on('shown.bs.collapse', function () {
    google.maps.event.trigger(map, "resize");
});
