"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useBotpressChat() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const authToken = Cookies.get("authToken");
    setIsAuthenticated(!!authToken);

    // Only load Botpress if user is authenticated
    if (authToken) {
      // Load the inject script
      const injectScript = document.createElement("script");
      injectScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
      injectScript.async = true;
      injectScript.onload = () => {
        // After inject script is loaded, load the bot configuration script
        const configScript = document.createElement("script");
        configScript.src =
          "https://files.bpcontent.cloud/2024/10/26/16/20241026161528-G5BY7GZX.js";
        configScript.async = true;
        document.body.appendChild(configScript);
      };
      document.body.appendChild(injectScript);

      // Cleanup function to remove scripts when component unmounts
      return () => {
        document.body.removeChild(injectScript);
        const configScript = document.querySelector(
          'script[src="https://files.bpcontent.cloud/2024/10/26/16/20241026161528-G5BY7GZX.js"]'
        );
        if (configScript) {
          document.body.removeChild(configScript);
        }

        // Also remove the webchat container if it exists
        const webchatContainer = document.getElementById(
          "bp-web-widget-container"
        );
        if (webchatContainer) {
          document.body.removeChild(webchatContainer);
        }
      };
    }
  }, []);

  return { isAuthenticated };
}
