import { constants } from "starknet";
import {
  ArgentMobileConnector,
  isInArgentMobileAppBrowser,
} from "starknetkit/argentMobile";
import { InjectedConnector } from "starknetkit/injected";
import { WebWalletConnector } from "starknetkit/webwallet";

// Always include all connection methods: Injected (ArgentX, Braavos), Mobile, Email (Web Wallet)
export const availableConnectors = [
  new InjectedConnector({ options: { id: "argentX" } }),
  new InjectedConnector({ options: { id: "braavos" } }),
  ArgentMobileConnector.init({
    options: {
      url: typeof window !== "undefined" ? window.location.href : "",
      dappName: "StarkNet Contract Manager",
      chainId: constants.NetworkName.SN_MAIN,
    },
  }),
  new WebWalletConnector({ url: "https://web.argent.xyz" }), // supports email/social login
];
