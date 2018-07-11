import React from "react";

export default function UpdateFirmware() {
  return (
    <div className="update_firmware_container">
      <h1>Firmware update required!</h1>
      <span>
      You are trying to interact with this site using a Thingy:52 operating on outdated firmware.
      You can update the firmware of your device by downloading the Nordic Thingy app on&#32;
        <a href="https://play.google.com/store/apps/details?id=no.nordicsemi.android.nrfthingy" target="_blank" rel="noopener noreferrer">&#32;Google Play</a> or the <a href="https://itunes.apple.com/us/app/nordic-thingy/id1187887000" target="_blank" rel="noopener noreferrer">
      App Store</a>. After the installation is complete, navigate to the Configuration tab and press &quot;Firmware version&quot;.
      </span>
    </div>
  );
}
