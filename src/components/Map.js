import React from "react";
import LocationsList from "./LocationsList";

class Map extends React.Component {
  state = {
    map: "",
    infowindow: "",
    markers: []
  };

  componentDidMount() {
    const googleKey = "AIzaSyDYWjv26zjkocDwCuQAHHaVsa5bOut7BxI";
    window.initMap = this.initMap;

    // asynchronously load the Google Maps script
    loadMapJS(
      `https://maps.googleapis.com/maps/api/js?key=${googleKey}&callback=initMap`
    );
    // handle error, when google map failed to load
    window.gm_authFailure = () => {
      alert("Sorry! Google maps failed to load!");
    };
  }

  initMap = () => {
    var self = this;
    const myMap = document.getElementById("map");
    const map = new window.google.maps.Map(myMap, {
      center: { lat: 50.06465, lng: 19.94498 },
      zoom: 14,
      mapTypeControl: false,
      gestureHandling: "cooperative"
    });

    let InfoWindow = new window.google.maps.InfoWindow();

    this.setState({
      map: map,
      infowindow: InfoWindow
    });

    const locations = [];
    this.props.mylocations.forEach(location => {
      let marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(location.lat, location.lng),
        animation: window.google.maps.Animation.DROP,
        map: map
      });

      this.state.markers.push(marker);

      marker.addListener("click", function() {
        self.openInfoWindow(marker);
      });

      location.marker = marker;
      locations.push(location);
    });
    this.setState({
      locations
    });
  };

  openInfoWindow = marker => {
    this.state.infowindow.open(this.state.map, marker);

    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 500);
    }
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -50);
    this.getMarkerInfo(marker);
  };

  //fetch data from foursquare API to display in infowindow
  getMarkerInfo = marker => {
    const self = this;
    const key = "GKWR0DS2BDTO4VTFGZRK0MJ3U1XGVZ2PR4O5GEX1H0RN5KLZ";
    const secret = "N22JO0OEGJMV3Y0AL5GFOP1NAUO0B4VZ5YYYDJ3IL3GAFYST";
    var url = `https://api.foursquare.com/v2/venues/search?client_id=${key}&client_secret=${secret}&v=20180323&ll=${marker
      .getPosition()
      .lat()},
      ${marker.getPosition().lng()}&limit=1`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const location_data = data.response.venues[0];
        const name = `<span class="info-name"><a href="https://foursquare.com/v/${
          location_data.id
        }" target="_blank"> ${location_data.name}</a></span><br>`;
        const address = `<div class="address">Address:
          ${location_data.location.formattedAddress[0]}<br>
          ${location_data.location.formattedAddress[1]}<br>
          ${location_data.location.formattedAddress[2]}<br></div>`;
        self.state.infowindow.setContent(name + address);
      })
      .catch(function(error) {
        alert("Sorry data can't be loaded " + error);
      });
  };

  render() {
    return (
      <div className="wrapper">
        <LocationsList
          key="1"
          locations={this.props.mylocations}
          openInfoWindow={this.openInfoWindow}
          markers={this.state.markers}
        />
        <div
          id="map"
          aria-label="Map with locations"
          tabIndex="0"
          role="application"
        />
      </div>
    );
  }
}

export default Map;

function loadMapJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = function() {
    document.write("Google Maps can't be loaded");
  };
  ref.parentNode.insertBefore(script, ref);
}
