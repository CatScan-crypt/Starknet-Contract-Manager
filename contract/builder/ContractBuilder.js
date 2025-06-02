const fs = require("fs");
const path = require("path");

const BASE_CONTRACT_PATH = path.join(__dirname, "BaseContract.cairo");
const CONTRACTS_JSON_PATH = path.join(__dirname, "contractsJSON.json");
const OUTPUT_CONTRACT_PATH = path.join(__dirname, '..', 'src', 'erc20.cairo');

const contractJSON = JSON.parse(fs.readFileSync(CONTRACTS_JSON_PATH, "utf-8"));
const availableComponents = Object.keys(contractJSON);

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Error: No components specified. Please provide at least one component to inject.");
    console.error("Available components:", availableComponents.join(", "));
    process.exit(1);
}

// Validate input arguments
const invalidArgs = args.filter(arg => !availableComponents.includes(arg));
if (invalidArgs.length > 0) {
    console.error("Error: Invalid components specified:", invalidArgs.join(", "));
    console.error("Available components:", availableComponents.join(", "));
    process.exit(1);
}

function readBaseContract() {
    return fs.readFileSync(BASE_CONTRACT_PATH, "utf-8");
}

function writeContract(outputPath, content) {
    fs.writeFileSync(outputPath, content, "utf-8");
}

function injectComponents(baseContract, components, selectedComponents) {
    let modifiedContract = baseContract;
    let uses = new Set();
    let componentDefs = new Set();
    let storageDefs = new Set();
    let constructorCalls = new Set();
    let events = new Set();
    let abiImpls = new Set();
    let externalMethods = "";
    let traitImplHeader = "    #[generate_trait]\n    #[abi(per_item)]\n    impl ExternalImpl of ExternalTrait {\n";
    let traitImplFooter = "    }\n}";

    selectedComponents.forEach(component => {
        if (components[component]) {
            const comp = components[component];
            
            // Inject `use` statements
            comp.starknet_contract.use.forEach(u => uses.add(`    use ${u}`));
            
            // Inject component definition
            comp.starknet_contract.component.forEach(c => {
                componentDefs.add(`    component!(path: ${c.path}, storage: ${c.storage}, event: ${c.event});`);
            });

            // Inject storage definitions
            comp.storage.forEach(store => {
                storageDefs.add(`        #[substorage(${store.substorage})]\n        ${store.name}: ${store.component},`);
            });

            // Inject event definitions
            comp.event.forEach(evt => {
                events.add(`        #[flat]\n        ${evt.name}: ${evt.flat},`);
            });

            // Inject constructor calls (ensuring uniqueness)
            constructorCalls.add(`        self.${comp.starknet_contract.component[0].storage}.initializer(account);`);

            // Inject ABI Implementations
            comp.abi.forEach(abi => {
                abiImpls.add(`    #[abi(embed_v0)]\n    impl ${abi.embed_v0};\n    impl ${abi.impl};`);
            });

            // Inject External Methods
            const method = comp.generate_trait.method;
            externalMethods += `        #[external(v0)]\n        fn ${method.name}(${method.params.map(p => `${Object.keys(p)[0]}: ${Object.values(p)[0]}`).join(", ")}) {\n`;
            externalMethods += `            ${method.body.split("\n").map(line => `${line}`).join("\n")}\n        }\n`;
        }
    });

    // Inject into base contract, ensuring uniqueness
    modifiedContract = modifiedContract.replace("use starknet::ContractAddress;", `use starknet::ContractAddress;\n${Array.from(uses).join("\n")}`);
    modifiedContract = modifiedContract.replace("component!(path: ERC20Component, storage: erc20, event: ERC20Event);", `$&\n${Array.from(componentDefs).join("\n")}`);
    modifiedContract = modifiedContract.replace(/(struct Storage {)/, `$1\n${Array.from(storageDefs).join("\n")}`);
    modifiedContract = modifiedContract.replace(/(enum Event {)/, `$1\n${Array.from(events).join("\n")}`);
    modifiedContract = modifiedContract.replace(/(self.erc20.initializer.*?;)/s, `$1\n${Array.from(constructorCalls).join("\n")}`);
    modifiedContract = modifiedContract.replace(/(impl ERC20InternalImpl.*?;)/s, `$1\n${Array.from(abiImpls).join("\n")}`);
    modifiedContract = modifiedContract.replace(/}\s*$/, ""); // Remove final closing brace
    modifiedContract += `\n${traitImplHeader}${externalMethods}${traitImplFooter}\n`;

    return modifiedContract;
}

function buildContract() {
    const baseContract = readBaseContract();
    const newContract = injectComponents(baseContract, contractJSON, args);
    writeContract(OUTPUT_CONTRACT_PATH, newContract);
    console.log("Contract generated successfully: GeneratedContract.cairo");
}

buildContract();
