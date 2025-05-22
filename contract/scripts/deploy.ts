import { CallData, Contract, stark } from "starknet";
import { getCompiledCode} from "./utils";
import { account ,provider ,constructorData} from "./initializer";
import * as path from 'path';
import * as fs from 'fs';

async function main() {

  // Declare & deploy contract
  let sierraCode, casmCode;
  try {
    ({ sierraCode, casmCode } = await getCompiledCode(
      "boilerplate_erc20_contract"
    ));
  } catch (error: any) {
    console.log("Failed to read contract files");
    process.exit(1);
  }

  const myCallData = new CallData(sierraCode.abi);
  const constructor = myCallData.compile("constructor",constructorData);

  const deployResponse = await account.declareAndDeploy({
    contract: sierraCode,
    casm: casmCode,
    constructorCalldata: constructor,
    salt: stark.randomAddress(),
  });
  // Connect the new contract instance :
  const deploytContract = new Contract(
    sierraCode.abi,
    deployResponse.deploy.contract_address,
    provider
  );

  let classHash = deployResponse.declare.class_hash;
  console.log('Class Hash:', classHash);  // Log the class hash

  // Determine the path for the parent folder
  const parentFolderPath = path.join(__dirname, '..', 'deployment_info.json');
  const deploymentInfo = { classHash: classHash, contractAddress: deploytContract.address };

  // Write the class hash to a JSON file asynchronously
  console.log('Attempting to write class hash to file...');
  try {
    await fs.promises.writeFile(parentFolderPath, JSON.stringify(deploymentInfo, null, 2));
    console.log('Deployment info saved to parent folder as deployment_info.json');
  } catch (err) {
    console.error('Error writing to file:', err);
  }

  if (constructorData.network === "sepolia"){
    console.log(
      `✅ Contract has been deploy with the address: https://sepolia.voyager.online/contract/${deploytContract.address}`
    );
  } else if (constructorData.network === "mainnet"){
    console.log(
      `✅ Contract has been deploy with the address: https://voyager.online/contract/${deploytContract.address}`
    );
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
