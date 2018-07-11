import React from "react";
import SyntaxHighlighter, {registerLanguage} from "react-syntax-highlighter/prism-light";
import js from "react-syntax-highlighter/languages/prism/javascript";
import prism from "react-syntax-highlighter/styles/prism/prism";
import "./styles.css";

registerLanguage("javascript", js);

export class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.tab !== undefined ? props.tab : "feature",
      toggle: props.toggle !== undefined ? props.toggle : true,
      codeview: props.codeview !== undefined ? props.codeview : true,
    };
  }

  componentWillReceiveProps(np) {
    if (np.tab !== this.state.activeTab && np.tab !== undefined) {
      this.setState((ps) => ({
        ...ps,
        activeTab: np.tab,
      }));
    }
  }

  displayTab(tab) {
    this.props.changeTab(this.props.interactionName ? this.props.interactionName : this.props.name, tab);
  }

  render() {
    return (
      <div className="card">
        <ul>
          <li onClick={() => this.displayTab("feature")} className={this.state.activeTab === "feature" ? `active ${this.state.activeTab}` : `${this.state.activeTab}`}><span>{this.props.interactionName ? this.props.name : this.props.name.substr(0, 1).toUpperCase() + this.props.name.substring(1).toLowerCase()}</span>{this.state.toggle ? (<Toggle onClick={this.props.toggleFeature} />) : null}</li>
          {this.state.codeview === true ? <li onClick={() => this.displayTab("code")} className={this.state.activeTab === "code" ? "active card_code_tab" : "card_code_tab"}>Code</li> : null}
        </ul>
        <div className="card_content_container">
          {
            this.props.children
          }
        </div>
      </div>
    );
  }
}

export const CardStandardCodeView = (props) => (
  <div className="card_standard_code_view">
    {props.featureMode === "notify" &&
      <div>
        <p>Enable the feature like this</p>
        <SyntaxHighlighter customStyle={{overflow: "auto"}} language='javascript' wrapLines={true} style={prism}>
          {
            `thingy.addEventListener("${props.code}", callback);
await thingy.${props.code}.start();`
          }
        </SyntaxHighlighter>
        <p>The callback function can then return an object</p>
        <SyntaxHighlighter customStyle={{overflow: "auto"}} language='javascript' wrapLines={true} style={prism}>
          {`${JSON.stringify(props.feature.reading)}`}
        </SyntaxHighlighter>
      </div>
    }
    {props.featureMode === "read/write" &&
      <div>
        <p>Write to or read the feature like this</p>
        <SyntaxHighlighter customStyle={{overflow: "auto"}} language='javascript' wrapLines={true} style={prism}>
          {
            `await thingy.${props.code}.write(data);
await thingy.${props.code}.read();`
          }
        </SyntaxHighlighter>
        <p>The value(s) written or read is/are of the format</p>
        <SyntaxHighlighter customStyle={{overflow: "auto"}} language='javascript' wrapLines={true} style={prism}>
          {`${JSON.stringify(props.feature.reading)}`}
        </SyntaxHighlighter>
      </div>
    }
    {props.featureMode === "writeWithoutResponse" &&
      <div>
        <p>First, set the speaker to the right mode</p>
        <SyntaxHighlighter language='javascript' wrapLines={true} style={prism}>
          {
            `await thingy.soundconfiguration.write({speakerMode: ${props.feature.mode}});`
          }
        </SyntaxHighlighter>
        <p>Then the feature can be written to like this</p>
        <SyntaxHighlighter customStyle={{overflow: "auto"}} language='javascript' wrapLines={true} style={prism}>
          {
            `await thingy.speakerdata.write(${JSON.stringify(props.feature)})`
          }
        </SyntaxHighlighter>
      </div>
    }
    {props.featureMode === "example" &&
      <div>
        <p>For a guide on how to use this feature, see examples in the <a href="https://github.com/NordicPlayground/Nordic-Thingy52-Thingyjs">Nordic-Thingy52-Thingyjs</a> repository </p>
      </div>
    }
    {props.featureMode === "notifyMicrophone" &&
      <div>
        <p>Enable the feature like this</p>
        <SyntaxHighlighter customStyle={{overflow: "auto"}} language='javascript' wrapLines={true} style={prism}>
          {
            `thingy.addEventListener("${props.code}", callback);
await thingy.${props.code}.start();`
          }
        </SyntaxHighlighter>
        <p>Then play the data returned to the callback</p>
        <SyntaxHighlighter customStyle={{overflow: "auto"}} language='javascript' wrapLines={true} style={prism}>
          {"thingy.microphone.play(data.detail)"}
        </SyntaxHighlighter>
      </div>
    }
  </div>
);

export const LoadingIcon = () => (
  <div className="lds-css ng-scope loading_icon_outer">
    <div className="loading_icon">
      <div></div>
    </div>
  </div>
);

export const Toggle = ({onClick}) => (
  <label className="switch">
    <input type="checkbox" defaultChecked />
    <span className="slider" onClick={() => onClick()}></span>
  </label>
);

export class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      inputLength: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onChange = props.onChange;
    this.maxLength = props.maxLength || 20;
    this.placeholder = props.placeholder;
    this.size = "input_" + (["small", "medium", "large"].includes(props.size) ? props.size : "medium");
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
      inputLength: event.target.value.length,
    }, () => {
      this.onChange(this.state.input);
    });
  }

  render() {
    return (
      <div className={`input ${this.size}`}>
        <input onChange={this.handleChange} maxLength={this.maxLength} placeholder={this.placeholder} />
        {this.props.counter && <span>{`${this.state.inputLength}/${this.maxLength}`}</span>}
      </div>
    );
  }
}
