import React, {Component} from "react";
import lottie from "lottie-web";
import animationData from "../../utils/animation/data-analysis.json";
import "./NotData.scss";

class NotData extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.lottieAnimation = lottie.loadAnimation({
      container: document.querySelector(".animation-wrapper"),
      renderer: "svg",
      loop: 1,
      autoplay: true,
      animationData: animationData,
    });
  }

  render() {
    return (
      <div className="wrapper-not-data">
        <div
          className="animation-wrapper"
          onMouseEnter={() => {
            this.lottieAnimation.goToAndPlay(1, false);
          }}
          onMouseLeave={() => {
            lottie.goToAndStop(1600, false);
          }}
        ></div>
        <h4 className="not-data-payment">
          "{this.props.name}" has no payment history
        </h4>
      </div>
    );
  }
}

export default NotData;
