import React, {Component} from "react";
import lottie from "lottie-web";
import animationData from "../../utils/animation/not-found-page.json";
import "./NotFoundAnimation.scss";

class NotFoundAnimation extends Component {
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
      <div className="wrapper-not-found">
        <div
          className="animation-wrapper"
          onMouseEnter={() => {
            this.lottieAnimation.goToAndPlay(1, false);
          }}
          onMouseLeave={() => {
            lottie.goToAndStop(1600, false);
          }}
        ></div>
      </div>
    );
  }
}

export default NotFoundAnimation;
