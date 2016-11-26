import React, {Component} from "react";

class ReadMoreButton extends Component {
  constructor(props) {
    super(props);
    this.analyticsService = props.analyticsService;
  }

  componentWillMount() {
    this.setState({ expanded: false });
  }

  toggleContent() {
    let postContentElement = document.getElementsByClassName("post-content")[0];

    if (postContentElement) {
      postContentElement.classList.add("post-content--js-read-full");
    }

    this.setState({ expanded: true });
  }

  sendReadMoreClickedEvent() {
    this.analyticsService.sendReadMoreClickedEvent(
      Date.now(),
      performance.timing.domComplete,
      performance.timing.navigationStart);
  }

  render() {
    if(this.state.expanded) {
      return null;
    }

    return (
      <div>
        <button onClick={ () => { this.toggleContent(); this.sendReadMoreClickedEvent(); } } className="post-content__toggle">Read More</button>
      </div>
    );
  }
}

export default ReadMoreButton;
