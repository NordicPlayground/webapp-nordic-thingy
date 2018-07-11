import React from "react";
import {Card, CardStandardCodeView} from "../Common/Common";
import {CardHeadingView, CardTapView, CardPedometerView, Card3DView} from "./MotionCards";
import "./styles.css";

class Motion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characteristics: {
        pedometer: props.characteristics.pedometer,
        tap: props.characteristics.tap,
        heading: props.characteristics.heading,
        orientation: props.characteristics.orientation,
      },
    };

    this.changeTab = props.changeTab;
    this.togglePedometer = props.togglePedometer;
    this.toggleHeading = props.toggleHeading;
    this.toggleTap = props.toggleTap;
    this.toggleOrientation = props.toggleOrientation;
  }

  componentDidMount() {
    this.props.toggleAll("on");
  }

  componentWillUnmount() {
    this.props.toggleAll("off");
  }

  componentWillReceiveProps(np) {
    if (np.characteristics.pedometer !== this.state.characteristics.pedometer) {
      this.setState((ps) => {
        return {
          ...ps,
          characteristics: {
            ...ps.characteristics,
            pedometer: np.characteristics.pedometer,
          },
        };
      });
    }

    if (np.characteristics.tap !== this.state.characteristics.tap) {
      this.setState((ps) => {
        return {
          ...ps,
          characteristics: {
            ...ps.characteristics,
            tap: np.characteristics.tap,
          },
        };
      });
    }

    if (np.characteristics.heading !== this.state.characteristics.heading) {
      this.setState((ps) => {
        return {
          ...ps,
          characteristics: {
            ...ps.characteristics,
            heading: {
              ...np.characteristics.heading,
              reading: {
                heading: parseFloat(np.characteristics.heading.reading.heading.toFixed(2)),
              },
            },
          },
        };
      });
    }

    if (np.characteristics.orientation !== this.state.characteristics.orientation) {
      this.setState((ps) => {
        return {
          ...ps,
          characteristics: {
            ...ps.characteristics,
            orientation: {
              ...np.characteristics.orientation,
              reading: {
                x: parseFloat(np.characteristics.orientation.reading.x),
                y: parseFloat(np.characteristics.orientation.reading.y),
                z: parseFloat(np.characteristics.orientation.reading.z),
                w: parseFloat(np.characteristics.orientation.reading.w),
              },
            },
          },
        };
      });
    }
  }

  render() {
    return (
      <div>
        <Card name="Pedometer" interactionName="stepcounter" changeTab={this.changeTab} toggleFeature={this.togglePedometer} tab={this.state.characteristics.pedometer.activeTab}>
          {(!this.state.characteristics.pedometer.activeTab || this.state.characteristics.pedometer.activeTab === "feature") && <CardPedometerView pedometer={this.state.characteristics.pedometer} />}
          {(this.state.characteristics && this.state.characteristics.pedometer && this.state.characteristics.pedometer.activeTab === "code") && <CardStandardCodeView code="stepcounter" feature={this.state.characteristics.pedometer} featureMode="notify" />}
        </Card>

        <Card name="tap" changeTab={this.changeTab} toggleFeature={this.toggleTap} tab={this.state.characteristics.tap.activeTab}>
          {(this.state.characteristics && this.state.characteristics.tap) && (!this.state.characteristics.tap.activeTab || this.state.characteristics.tap.activeTab === "feature") && <CardTapView tap={this.state.characteristics.tap} />}
          {(this.state.characteristics && this.state.characteristics.tap && this.state.characteristics.tap.activeTab === "code") && <CardStandardCodeView code="tap" feature={this.state.characteristics.tap} featureMode="notify" />}
        </Card>

        <Card name="heading" changeTab={this.changeTab} toggleFeature={this.toggleHeading} tab={this.state.characteristics.heading.activeTab}>
          {(this.state.characteristics && this.state.characteristics.heading) && (!this.state.characteristics.heading.activeTab || this.state.characteristics.heading.activeTab === "feature") && <CardHeadingView heading={this.state.characteristics.heading} />}
          {(this.state.characteristics && this.state.characteristics.heading && this.state.characteristics.heading.activeTab === "code") && <CardStandardCodeView code="heading" feature={this.state.characteristics.heading} featureMode="notify" />}
        </Card>

        <Card name="3D orientation" interactionName="quaternionorientation" changeTab={this.changeTab} toggleFeature={this.toggleOrientation} tab={this.state.characteristics.orientation.activeTab}>
          {(this.state.characteristics && this.state.characteristics.orientation) && (!this.state.characteristics.orientation.activeTab || this.state.characteristics.orientation.activeTab === "feature") && <Card3DView feature={this.state.characteristics.orientation} />}
          {(this.state.characteristics && this.state.characteristics.orientation && this.state.characteristics.orientation.activeTab === "code") && <CardStandardCodeView code="quaternionorientation" feature={this.state.characteristics.orientation} featureMode="notify" />}
        </Card>
      </div>
    );
  }
}

export default Motion;
