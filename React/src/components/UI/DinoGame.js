import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import dinosaur from "../../assets/dinosaur.png";
import dinosaurRun1 from "../../assets/dinosaur_run1.png";
import dinosaurRun2 from "../../assets/dinosaur_run2.png";
import "./styles.css";


class DinoGame extends React.Component {
  constructor(props) {
    super(props);
    this.dinoRunImages = [dinosaurRun1, dinosaurRun2];
    this.state = {
      button: props.button,
      runningImageIndex: 0,
    };

    this.interval;

    this.changeRunningImage = this.changeRunningImage.bind(this);
  }

  moveDino(n) {
    const w = this.dinoRef.clientWidth - 80;
    const b = (w / 2);

    if (n === 1) {
      let a = 0;
      let i = 0;
      let s = 1.1;
      let o = 0;
      let r;
      let d;
      let l;

      this.interval = setInterval(() => {
        i++;

        if (Number.isInteger(i/10)) {
          s += 0.075;
        }

        a += s;
        o = b + a;
        d = (Math.floor(o / w) % 2 === 0 ? 1 : -1);
        r = d === -1 ? (w - o % w) : (o % w);

        l = r;

        this.setState((ps) => ({
          ...ps,
          styles: {
            ...ps.styles,
            left: l,
            "WebkitTransform": `scaleX(${d})`,
            "transform": `scaleX(${d})`,
          },
        }));
      }, 10);
    } else {
      clearInterval(this.interval);
      this.setState((ps) => ({
        ...ps,
        styles: {
          ...ps.styles,
          left: b,
          "WebkitTransform": "scaleX(1)",
          "transform": "scaleX(1)",
        },
      }));
    }
  }

  componentWillReceiveProps(np) {
    if (np.button !== this.state.button) {
      this.setState((ps) => ({
        ...ps,
        button: np.button,
      }), () => {
        this.moveDino(this.state.button.reading.value);
      });
    }
  }

  componentDidMount() {
    this.timeout = setTimeout(
      this.changeRunningImage,
      100
    );

    this.setState({
      left: (this.dinoRef.clientWidth / 2) - 40,
      display: "block",
    });
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  changeRunningImage() {
    this.setState(function({runningImageIndex}) {
      const nextrunningImageIndex = ++runningImageIndex % this.dinoRunImages.length;

      return {runningImageIndex: nextrunningImageIndex};
    }, function() {
      this.timeout = setTimeout(
        this.changeRunningImage,
        100
      );
    });
  }


  render() {
    return (
      <div className="dinoGame" ref={(i) => {this.dinoRef = i;}}>
        {
          (
            <img style={this.state.styles} src={(this.state.button.reading.value === 1 ? this.dinoRunImages[this.state.runningImageIndex] : dinosaur)} alt="dinosaur"/>)
        }
      </div>
    );
  }
}

DinoGame.propTypes = {
  button: PropTypes.object,
};

export default DinoGame;
