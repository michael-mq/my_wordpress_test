import React, {PropTypes, Component} from "react";
import ReactDOM from "react-dom";

/**
 * Adapted from https://github.com/svenanders/react-stickydiv
 * Modified and converted to ES6
 */
class StickyContainer extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    offsetTop: 0,
    className: "",
    zIndex: 1
  }

  state = {
    fixed: false
  }

  static anchoredClassName = "anchored";
  static sidebarContainerClassName = "secondary";
  static tagsContainerClassName = "list-module";

  render() {
    let defaultStyle = {
      display: "block",
      position: "relative",
      zIndex: this.props.zIndex,
      transform: "translate3d(0px,0px,0px)"
    };

    if (this.state.fixed) {
      Object.assign(defaultStyle, { position: "fixed", top: this.props.offsetTop });
    }

    return (
      <div className={this.props.className} style={defaultStyle}>
        {this.props.children}
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("scroll", e => this.onScroll(e), false);
    window.addEventListener("resize", e => this.handleResize(e));
  }

  componentWillUnMount() {
    window.removeEventListener("scroll", e => this.onScroll(e), false);
    window.removeEventListener("resize", e => this.handleResize(e));
  }

  handleResize() {
    this.checkPositions();
  }

  onScroll() {
    this.checkPositions();
  }

  checkPositions() {
    const parentContainer = ReactDOM.findDOMNode(this).parentNode;
    const sidebarContainer = document.getElementsByClassName(StickyContainer.sidebarContainerClassName)[0];
    const tagsContainer = document.getElementsByClassName(StickyContainer.tagsContainerClassName)[0];
    const topScrollPadding = 60;
    const bottomScrollPadding = 80;

    if (sidebarContainer && tagsContainer) {

      const topScrollBoundary = tagsContainer.offsetTop + tagsContainer.offsetHeight + topScrollPadding;
      const bottomScrollBoundary = sidebarContainer.offsetTop + sidebarContainer.offsetHeight - (parentContainer.offsetHeight - bottomScrollPadding);

      if (window.scrollY > topScrollBoundary && window.scrollY < bottomScrollBoundary) {
        this.removeAnchoredClass(parentContainer);
        this.setState({fixed: true});
      } else if(window.scrollY > bottomScrollBoundary) {
        this.addAnchoredClass(parentContainer);
        this.setState({fixed: false});
      } else {
        this.removeAnchoredClass(parentContainer);
        this.setState({fixed: false});
      }
    }
  }

  removeAnchoredClass(parentContainer) {
    parentContainer.className = parentContainer.className.replace(StickyContainer.anchoredClassName,"");
  }

  addAnchoredClass(parentContainer) {
    parentContainer.className = `${parentContainer.className.replace(StickyContainer.anchoredClassName,"").trim()} ${StickyContainer.anchoredClassName}`;
  }
}

StickyContainer.propTypes = {
  offsetTop: PropTypes.number,
  zIndex: PropTypes.number,
  className: PropTypes.string
}

export default StickyContainer;
