import React from "react";
import React3 from "react-three-renderer";
import * as THREE from "three";
import { SpotLight } from "three";

export const CardHeadingView = ({heading}) => (
  <div className="card_heading_view">
    <p>{(heading && heading.reading && heading.reading.heading ? heading.reading.heading.toFixed(2) : 0) + String.fromCharCode(parseInt("+00B0", 16))}</p>
    <div style={{transform: "rotate(" + (heading && heading.reading && heading.reading.heading ? heading.reading.heading.toFixed(2) : 0) + "deg)"}}>
      <div></div>
    </div>
  </div>
);

export const CardPedometerView = ({pedometer}) => (pedometer && pedometer.reading && pedometer.reading.count && pedometer.reading.count > 0) ? <span className="card_pedometer_view">You have walked <span>{pedometer.reading.count}</span> steps</span> : <span className="card_pedometer_view">TAKE ME FOR A WALK :)</span>;

export const CardTapView = ({tap}) => (tap && tap.reading && tap.reading.count && tap.reading.count > 0) ? <span className="card_tap_view">You have tapped <span>{tap.reading.count}</span>{` ${tap.reading.count > 1 ? "times" : "time"} on the `}<span>{{1: "back", 2: "front", 3: "left", 4: "right", 5: "top", 6: "bottom"}[tap.reading.direction]}</span>{" side of the device"}</span> : <span className="card_tap_view">TAP ME :)</span>;

export class Card3DView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      quaternion: new THREE.Quaternion(0, 0, 0, 0),
      quaternionReference: {
        x: 0,
        y: 0,
        z: 0,
        w: 0,
      },
    };
    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);
    this._onAnimate = () => {
      // we will get this callback every frame
      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        quaternion: new THREE.Quaternion(
          this.state.quaternionReference.x,
          this.state.quaternionReference.y,
          this.state.quaternionReference.z,
          this.state.quaternionReference.w,
        ),
      });
    };
  }

  componentWillReceiveProps(np) {
    if (np.feature !== this.state.quaternionReference && np.feature.reading !== undefined) {
      this.setState((ps) => ({
        ...ps,
        quaternionReference: np.feature.reading,
      }));
    }
  }
  render() {
    this.width = 160; // canvas width
    this.height = 160; // canvas height
    this.lightPosition = new THREE.Vector3(17.5,17.5,50);
    this.lightTarget = new THREE.Vector3(0, 0, 0);
    return (
      <div className="card_3d_view">
        <React3
          mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
          width={this.width}
          height={this.height}
          alpha={true}
          clearColor="white"
          clearAlpha={0}
          onAnimate={this._onAnimate}
        >
          <scene>
            <perspectiveCamera
              name="camera"
              fov={75}
              aspect={this.width / this.height}
              near={0.1}
              far={1000}
              position={this.cameraPosition}
            />
            <directionalLight
              color={0xffffff}
              position={this.lightPosition}
              lookAt={this.lightTarget}
            />
            <mesh
              quaternion={this.state.quaternion}
            >
              <boxGeometry
                width={3}
                height={3}
                depth={3}
              />
              <meshPhongMaterial
                color={0x009CDE}
              />
            </mesh>
          </scene>
        </React3>
      </div>
    );
  }
}
