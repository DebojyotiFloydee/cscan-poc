"use client";

import React, { useEffect, useState } from "react";

const InstallApplication = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptAppInstall, setPromptAppInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptAppInstall(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const installApp = (evt) => {
    evt.preventDefault();
    if (!promptAppInstall) {
      return;
    }
    promptAppInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }

  return (
    <button
      className="install-text"
      aria-label="Install app"
      title="Install app"
      onClick={() => {
        installApp();
      }}
    >
      Install
    </button>
  );
};

export default InstallApplication;
