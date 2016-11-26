import React, {Component} from "react";
import {UUID} from "../utilities"
import StickyContainer from "./sticky.container.component";

class Advertorial extends Component {
  constructor(props) {
    super(props);
    this.container = props.container;
    this.visibility = props.visibility;
    this.display = props.display;
    this.config = props.config;
    this.params = props.params;
    this.advertorialService = props.advertorialService;
    this.id = `advert-${UUID.generate()}`;
    this.sticky = props.sticky;
    this.offsetTop = props.offsetTop;
  }

  insertAdvert() {
    var params = {
      config: this.config,
      params: this.params,
      container: document.getElementById(this.id)
    };

    if (this.container) {
      if (this.visibility === "hidden" || this.display === "none") {
        return;
      }
      this.advertorialService.createAd(params);
    }
  }

  componentDidMount() {
    this.insertAdvert();
  }

  render() {
    if (this.sticky) {
      return (
        <StickyContainer offsetTop={this.offsetTop}>
          <div id={this.id}></div>
        </StickyContainer>
      )
    } else {
      return <div id={this.id}></div>
    }
  }
}

Advertorial.defaultProps = {
  sticky: false
}

export default Advertorial;
