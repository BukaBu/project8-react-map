import React, { Component } from "react";

class LocationItem extends Component {
  render() {
    return (
      <li
        tabIndex="0"
        onKeyPress={this.props.openInfoWindow.bind(
          this,
          this.props.listItem.marker
        )}
        onClick={this.props.openInfoWindow.bind(
          this,
          this.props.listItem.marker
        )}
      >
        {this.props.listItem.name}
      </li>
    );
  }
}

export default LocationItem;
