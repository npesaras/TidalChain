import path from 'path';

let localCanisters, prodCanisters, canisters;

function initCanisterIds() {
    try {
        localCanisters = require(path.resolve('.dfx', 'local', 'canister_ids.json'));
    } catch (e) {
        console.log("No local canister IDs found, using production canisters.");
    } 

    try {
        prodCanisters = require(path.resolve('canister_ids.json'));
    } catch (e) {
        console.log('No production canister IDs found, using local canisters.');
    }

    const network = process.env.DFX_NETWORK ||
     (process.env.NODE_ENV === "production" ? "ic" : "local");

    console.info(`initCanisterIds: network=${network}`);
    console.info(`initCanisterIds: DFX_NETWORK=${process.env.DFX_NETWORK}`);

    canisters = network === 'local' ? localCanisters : prodCanisters;

    for (const canister in canisters) {
        process.env[`NEXT_PUBLIC_CANISTER_ID_${canister.toUpperCase()}`] 
        = canisters[canister][network];
    }
}

export default {
    initCanisterIds: initCanisterIds
}