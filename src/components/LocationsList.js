import React, { Component } from "react";
import LocationItem from "./LocationItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class LocationList extends Component {
  state = {
    locations: "",
    query: "",
    showLocations: true
  };

  //search for locations method based on user input
  filterLocations = e => {
    const query = e.target.value.toLowerCase();
    const { markers } = this.props;
    const locations = this.props.locations.filter(element =>
      element.name.toLowerCase().includes(query)
    );

    markers.forEach(marker => {
      marker.setVisible(false);
    });

    locations.forEach(function(location) {
      location.marker.setVisible(true);
    });

    this.setState({
      locations: locations,
      query: query
    });
  };

  componentWillMount() {
    this.setState({
      locations: this.props.locations
    });
  }

  //show and hide locations list

  toggleLocationsList = () => {
    this.state.showLocations
      ? this.setState({ showLocations: false })
      : this.setState({ showLocations: true });
  };

  render() {
    var locationlist = this.state.locations.map((listItem, index) => {
      return (
        <LocationItem
          key={index}
          openInfoWindow={this.props.openInfoWindow}
          listItem={listItem}
        />
      );
    }, this);
    return (
      <div className="list">
        <div className="search-button">
          <button
            onClick={this.toggleLocationsList}
            aria-label="show or hide locations"
          >
            <FontAwesomeIcon icon={faBars} size="2x" />
          </button>
          <input
            role="search"
            aria-label="search restaurants"
            type="text"
            placeholder="Search"
            value={this.state.query}
            onChange={this.filterLocations}
          />
        </div>
        <ul>{this.state.showLocations && locationlist}</ul>
      </div>
    );
  }
}

export default LocationList;
