"use client";

import React, { useEffect, useState } from "react";
import InstallApplication from "../installApplication/page";

function Instruction() {
  let displayMode = "";
  const mqStandAlone = "(display-mode: standalone)";
  const [dpMode, setDpMode] = useState(null);
  const [showInstallMessageIos, setShowInstallMessageIos] = useState(false);
  const [showSafari, setShowSafari] = useState(false);

  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  const isSafari = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /safari/.test(userAgent);
  };

  useEffect(() => {
    if (navigator) {
      displayMode =
        navigator.standalone || window.matchMedia(mqStandAlone).matches
          ? "standalone"
          : "browser";
      setDpMode(displayMode);
    }
    if (isIos() && dpMode == "browser") {
      setShowInstallMessageIos(true);
    }
    if (isSafari() && dpMode == "browser") {
      setShowSafari(true);
    }
  });

  return (
    <div>
      <p className="main-text">
        This is a POC application to decide on the Tech stack of Carscan Chat
        Application.
      </p>
      <p className="main-text">
        Click on "Main" in Navbar to reach the Main page.
      </p>
      {(dpMode == "browser" && ((!showInstallMessageIos) || (!showSafari))) && (
        <p className="main-text">
          To install the PWA version of the Web App, click here:{" "}
          <InstallApplication></InstallApplication>.
          <br />
          Or, click on the 3 dots of your browser and then on "Install
          Application" or "Install App" or "Install".
        </p>
      )}
      {(dpMode == "browser" && (showInstallMessageIos) && (showSafari)) && (
        <p className="main-text">
          Install the Webapp on you phone using the <img className="iphone_arrow_up" src="../box_arrow_up_1.png" alt="" /> and click on "Add To Homescreen"
        </p>
      )}
    </div>
  );
}

export default Instruction;
