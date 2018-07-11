import React from "react";
import PropTypes from "prop-types";
import {Card, CardStandardCodeView} from "../Common/Common";
import {CardChartView, CardColorView} from "./EnvironmentCards";
import "./styles.css";

class Environment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: props.temperature,
      pressure: props.pressure,
      co2: props.co2,
      tvoc: props.tvoc,
      humidity: props.humidity,
      color: props.color,
    };

    this.toggleTemperature = props.toggleTemperature;
    this.togglePressure = props.togglePressure;
    this.toggleCo2 = props.toggleCo2;
    this.toggleTvoc = props.toggleTvoc;
    this.toggleHumidity = props.toggleHumidity;
    this.toggleColor = props.toggleColor;

    this.changeTab = props.changeTab;
  }

  componentWillReceiveProps(np) {
    if (np.temperature !== this.state.temperature) {
      this.setState({
        temperature: np.temperature,
      });
    }

    if (np.pressure !== this.state.pressure) {
      this.setState({
        pressure: np.pressure,
      });
    }

    if (np.co2 !== this.state.co2) {
      this.setState({
        co2: np.co2,
      });
    }

    if (np.tvoc !== this.state.tvoc) {
      this.setState({
        tvoc: np.tvoc,
      });
    }

    if (np.humidity !== this.state.humidity) {
      this.setState({
        humidity: np.humidity,
      });
    }


    if (np.color !== this.state.color) {
      this.setState({
        color: np.color,
      });
    }
  }

  componentDidMount() {
    this.props.toggleAll("on");
  }

  componentWillUnmount() {
    this.props.toggleAll("off");
  }

  render() {
    return (
      <div>
        <Card name="temperature" changeTab={this.changeTab} toggleFeature={this.toggleTemperature} tab={this.state.temperature.activeTab}>
          {(!this.state.temperature.activeTab || this.state.temperature.activeTab === "feature") && <CardChartView feature={this.state.temperature} />}
          {this.state.temperature.activeTab === "code" && <CardStandardCodeView code="temperature" feature={this.state.temperature} featureMode="notify"/>}
        </Card>

        <Card name="pressure" changeTab={this.changeTab} toggleFeature={this.togglePressure} tab={this.state.pressure.activeTab}>
          {(!this.state.pressure.activeTab || this.state.pressure.activeTab === "feature") && <CardChartView feature={this.state.pressure} />}
          {this.state.pressure.activeTab === "code" && <CardStandardCodeView code="pressure" feature={this.state.pressure} featureMode="notify"/>}
        </Card>

        <Card name="humidity" changeTab={this.changeTab} toggleFeature={this.toggleHumidity} tab={this.state.humidity.activeTab}>
          {(!this.state.humidity.activeTab || this.state.humidity.activeTab === "feature") && <CardChartView feature={this.state.humidity} />}
          {this.state.humidity.activeTab === "code" && <CardStandardCodeView code="pressure" feature={this.state.humidity} featureMode="notify"/>}
        </Card>

        <Card name="CO2" interactionName="co2" changeTab={this.changeTab} toggleFeature={this.toggleCo2} tab={this.state.co2.activeTab}>
          {this.state.co2 && (!this.state.co2.activeTab || this.state.co2.activeTab === "feature") && <CardChartView feature={this.state.co2} />}
          {this.state.co2 && this.state.co2.activeTab && this.state.co2.activeTab === "code" && <CardStandardCodeView code="gas" feature={this.state.co2} featureMode="notify"/>}
        </Card>

        <Card name="color" changeTab={this.changeTab} toggleFeature={this.toggleColor} tab={this.state.color.activeTab}>
          {(!this.state.color.activeTab || this.state.color.activeTab === "feature") && <CardColorView color={this.state.color} />}
          {this.state.color.activeTab === "code" && <CardStandardCodeView code="color" feature={this.state.color} featureMode="notify"/>}
        </Card>

        <Card name="TVOC" interactionName="tvoc" changeTab={this.changeTab} toggleFeature={this.toggleTvoc} tab={this.state.tvoc.activeTab}>
          {this.state.tvoc && (!this.state.tvoc.activeTab || this.state.tvoc.activeTab === "feature") && <CardChartView feature={this.state.tvoc} />}
          {this.state.tvoc && this.state.tvoc.activeTab && this.state.tvoc.activeTab === "code" && <CardStandardCodeView code="gas" feature={this.state.tvoc} featureMode="notify"/>}
        </Card>
      </div>
    );
  }
}

Environment.propTypes = {
  temperature: PropTypes.object,
  pressure: PropTypes.object,
  humidity: PropTypes.object,
  co2: PropTypes.object,
  color: PropTypes.object,
  tvoc: PropTypes.object,
  changeTab: PropTypes.func,
  toggleTemperature: PropTypes.func,
  togglePressure: PropTypes.func,
  toggleCo2: PropTypes.func,
  toggleTvoc: PropTypes.func,
  toggleHumidity: PropTypes.func,
  toggleColor: PropTypes.func,
  toggleAll: PropTypes.func,
};

export default Environment;
