import React from "react";

class TabbedView extends React.PureComponent {
  constructor({
    tabs,
  }) {
    super();
    this.setState({
      activeTab: 0,
    });
  }

  render() {
    return <section>
      <div>
        {this.props.tabs.forEach((el, idx) => <button onClick={this.setState({activeTab: idx})}>Show tab {idx}</button>)}
      </div>
      <div> {this.props.tabs[this.state.activeTab]} </div>
    </section>;
  }
}


class Application extends React.PureComponent {
  render() {
    return <main>
      <TabbedView
        tabs={[
          <TemperatureView temperature={this.props.temperature} />,
          <CodeView />,
        ]}
      />
    </main>;
  }
}

const TemperatureView = ({temperature}) => {
  if (temperature) {
    return <div>{temperature}</div>;
  }
  return <div>Loading</div>;
};
