"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

// Create context
const BotpressContext = createContext({
  isBotLoaded: false,
  showBot: () => {},
  hideBot: () => {},
});

export const useBotpress = () => useContext(BotpressContext);

export const BotpressProvider = ({ children }) => {
  const [isBotLoaded, setIsBotLoaded] = useState(false);
  const loadBotpressScripts = useCallback(() => {
    // Only load if not already loaded
    if (
      !isBotLoaded &&
      !document.querySelector(
        'script[src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"]'
      )
    ) {
      // Load the inject script
      const injectScript = document.createElement("script");
      injectScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
      injectScript.async = true;
      injectScript.id = "botpress-inject-script";

      injectScript.onload = () => {
        // After inject script is loaded, load the bot configuration script
        const configScript = document.createElement("script");
        configScript.src =
          "https://files.bpcontent.cloud/2024/10/26/16/20241026161528-G5BY7GZX.js";
        configScript.async = true;
        configScript.id = "botpress-config-script";
        document.body.appendChild(configScript);

        setIsBotLoaded(true);
      };

      document.body.appendChild(injectScript);
    }
  }, [isBotLoaded]);

  const unloadBotpressScripts = useCallback(() => {
    // Remove the scripts
    const injectScript = document.getElementById("botpress-inject-script");
    if (injectScript) {
      document.body.removeChild(injectScript);
    }

    const configScript = document.getElementById("botpress-config-script");
    if (configScript) {
      document.body.removeChild(configScript);
    }

    // Also remove the webchat container if it exists
    const webchatContainer = document.getElementById("bp-web-widget-container");
    if (webchatContainer) {
      document.body.removeChild(webchatContainer);
    }

    setIsBotLoaded(false);
  }, []);

  useEffect(() => {
    // Check if user is authenticated
    const authToken = Cookies.get("authToken");

    if (authToken) {
      loadBotpressScripts();
    }

    // Listen for cookie changes
    const checkCookieChange = setInterval(() => {
      const currentAuthToken = Cookies.get("authToken");

      if (currentAuthToken && !isBotLoaded) {
        loadBotpressScripts();
      } else if (!currentAuthToken && isBotLoaded) {
        unloadBotpressScripts();
      }
    }, 1000);

    return () => {
      clearInterval(checkCookieChange);
      if (isBotLoaded) {
        unloadBotpressScripts();
      }
    };
  }, [isBotLoaded, loadBotpressScripts, unloadBotpressScripts]);

  const showBot = () => {
    if (window.botpressWebChat) {
      window.botpressWebChat.sendEvent({ type: "show" });
    }
  };

  const hideBot = () => {
    if (window.botpressWebChat) {
      window.botpressWebChat.sendEvent({ type: "hide" });
    }
  };

  return (
    <BotpressContext.Provider value={{ isBotLoaded, showBot, hideBot }}>
      {children}
    </BotpressContext.Provider>
  );
};
