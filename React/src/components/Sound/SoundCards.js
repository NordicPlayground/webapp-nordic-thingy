import React from "react";
import warning from "../../assets/warning.png";
import FileInput from "../Sound/FileInput";

export const CardSampleView = (props) => (
  <div className="card_sample_feature_view">
    <div id="samples">
      <div>
        <button type="button" className="sampleButton" value="0" onClick={props.playSample}></button>
        <button type="button" className="sampleButton" value="1" onClick={props.playSample}></button>
        <button type="button" className="sampleButton" value="2" onClick={props.playSample}></button>
      </div>
      <div>
        <button type="button" className="sampleButton" value="3" onClick={props.playSample}></button>
        <button type="button" className="sampleButton" value="4" onClick={props.playSample}></button>
        <button type="button" className="sampleButton" value="5" onClick={props.playSample}></button>
      </div>
      <div>
        <button type="button" className="sampleButton" value="6" onClick={props.playSample}></button>
        <button type="button" className="sampleButton" value="7" onClick={props.playSample}></button>
        <button type="button" className="sampleButton" value="8" onClick={props.playSample}></button>
      </div>
    </div>
  </div>
);

export const CardToneView = (props) => (
  <div className="card_tone_feature_view">
    <div id="piano">
      <button type="button" className="pianoKey white" value="523.25" onClick={props.playTone}></button>
      <button type="button" className="pianoKey black" value="554.37" onClick={props.playTone}></button>
      <button type="button" className="pianoKey white" value="587.33" onClick={props.playTone}></button>
      <button type="button" className="pianoKey black" value="622.25" onClick={props.playTone}></button>
      <button type="button" className="pianoKey white e-key" value="659.25" onClick={props.playTone}></button>
      <button type="button" className="pianoKey white" value="698.46" onClick={props.playTone}></button>
      <button type="button" className="pianoKey black" value="739.99" onClick={props.playTone}></button>
      <button type="button" className="pianoKey white" value="783.99" onClick={props.playTone}></button>
      <button type="button" className="pianoKey black" value="830.61" onClick={props.playTone}></button>
      <button type="button" className="pianoKey white" value="880.00" onClick={props.playTone}></button>
      <button type="button" className="pianoKey black" value="932.33" onClick={props.playTone}></button>
      <button type="button" className="pianoKey white" value="987.77" onClick={props.playTone}></button>
    </div>
  </div>
);

export const CardPCMView = (props) => (
  <div className="card_pcm_feature_view">
    <div id="pcm">
      <form id="audioSampleForm" onSubmit={props.playPcm}>
        <p>Select an 8 kHz uncompressed unsigned 8-bit PCM mono WAV (Windows) file.</p>
        <FileInput handleFileChange={props.handleFileChange}/>
        <div className="startStopButtons">
          <button className={`audioButton ${((props.status !== undefined && props.status === 1) ? "pcm_button_playing" : "")}`} type="submit">Play</button>
          <button className="audioButton" onClick={props.stopAudio}>Stop</button>
        </div>
      </form>
      <UnstableFeature />
    </div>
  </div>
);

export const CardMicrophoneView = (props) => (
  <div className="card_standard_feature_view">
    <button onClick={() => props.notifyMicrophone()} className="button_blue">
      {props.feature.status === false ? "Start" : "Stop"}
    </button>
    <UnstableFeature />
  </div>
);


export const UnstableFeature = () => (
  <p className="warningMessage"><img className="warningImage" src={warning} />This feature is unstable on computers!</p>
);
