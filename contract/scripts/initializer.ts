import * as dotenv from "dotenv";
import { Account, RpcProvider } from "starknet";
dotenv.config();

const network: string = process.env.NETWORK?? ""
const sepolia: string = process.env.RPC_ENDPOINT_SEPOLIA ?? ""
const mainnet: string = process.env.RPC_ENDPOINT_MAINNET ?? ""

function getProvider(network:string) {
  if (network === "sepolia") {
    const provider = new RpcProvider({
      nodeUrl: sepolia,
    });
    return provider;
  }else if (network === "mainnet") {
    const provider = new RpcProvider({
      nodeUrl: mainnet,
    });
    return provider;
  } else {
    throw new Error("RPC's URL Error");
  }
}
const provider = getProvider(network);

// Initialize existing predeployed contract account
console.log("ACCOUNT_ADDRESS=", process.env.DEPLOYER_ADDRESS);

const privateKey = process.env.DEPLOYER_PRIVATE_KEY ?? "";
const accountAddress: string = process.env.DEPLOYER_ADDRESS ?? "";

// Create the account object
const account = new Account(provider, accountAddress, privateKey);

console.log("Account connected.\n");


const tokenName: string = process.env.TOKEN_NAME?? ""
const symbolName: string = process.env.SYMBOL_NAME?? ""


 const constructorData = {
 initial_value: process.env.INIT?? "", 
 name: tokenName , 
 symbol: symbolName, 
 decimals: process.env.DECIMALS_LENGTH?? "",
 fixed_supply: process.env.FIXED_SUPPLY?? "",
 account: accountAddress,
 owner:accountAddress,
 network: network
}


// Export the constants so you can use them in other files
export { account , provider ,constructorData };

