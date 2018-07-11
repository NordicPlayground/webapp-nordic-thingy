import React from "react";
import {ResponsiveContainer, AreaChart, Area} from "recharts";
import {LoadingIcon} from "../Common/Common";

export const CardColorView = ({color}) => (
  <div className="card_color_view"><div style={{backgroundColor: ((color && color.reading) ? ("#" + ((1 << 24) + (parseInt(color.reading.red) << 16) + (parseInt(color.reading.green) << 8) + parseInt(color.reading.blue)).toString(16).slice(1)) : "#009cde")}}></div>
    <p>{((color && color.reading) ? ("#" + ((1 << 24) + (parseInt(color.reading.red) << 16) + (parseInt(color.reading.green) << 8) + parseInt(color.reading.blue)).toString(16).slice(1)) : "#009cde")}</p>
  </div>
);

export class CardChartView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latestReading: undefined,
      absoluteReadings: [],
      relativeReadings: [],
    };
  }

  componentWillReceiveProps(np) {
    // An issue with how recharts updates their charts forces us to first update the state with an empty data array before repopulating it with all desired data (including new data points)
    if (np.feature && np.feature.reading && np.feature.reading.value && np.feature.reading.value !== this.state.latestReading) {
      const read = np.feature.reading.value;
      const updatedAbsoluteReadings = Object.assign(this.state.absoluteReadings, []);
      const readingsLength = updatedAbsoluteReadings.length;

      updatedAbsoluteReadings.push(read);

      // could be any number, but using 12 data points looks nice
      if (readingsLength === 13) {
        updatedAbsoluteReadings.shift();
      }

      this.setState((ps) => {
        return {
          ...ps,
          relativeReadings: [],
          absoluteReadings: updatedAbsoluteReadings,
          latestReading: read,
        };
      }, () => {
        let maxAmplitude = 0;

        if (readingsLength > 1) {
          for (const v of this.state.absoluteReadings) {
            const amplitude = (Math.abs(v - this.state.baseReading) / this.state.baseReading);
            if (amplitude > maxAmplitude) {
              maxAmplitude = amplitude;
            }
          }
        } else {
          maxAmplitude = 1;

          this.setState({
            baseReading: read,
            unit: np.feature.reading.unit,
          });
        }

        const updatedRelativeReadings = [];

        for (const ar of this.state.absoluteReadings) {
          const relativeValue = (((ar - this.state.baseReading) / this.state.baseReading)/maxAmplitude) + 1;
          updatedRelativeReadings.push({value: relativeValue});
        }

        this.setState((ps) => {
          return {
            ...ps,
            relativeReadings: updatedRelativeReadings,
          };
        });
      });
    }
  }

  render() {
    if (this.state.absoluteReadings.length >= 2) {
      return (
        <div className="card_chart_view">
          <p>{`${this.state.latestReading} ${this.state.unit}`}</p>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={this.state.relativeReadings}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#009cde" stopOpacity={1}/>
                  <stop offset="95%" stopColor="#009cde" stopOpacity={0.5}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#009cde" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    } else {
      return (
        <LoadingIcon />
      );
    }
  }
}
