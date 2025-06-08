import {
    createActor as serviceCreateActor,
    canisterId as serviceCanisterId 
} from '@/components/declarations/';
import { Actor } from '@dfinity/agent';
import { _SERVICE } from '@/components/declarations/tidal_chain_backend.did'

export const makeActor = (canisterId: any, createActor: any) => {
    return createActor(canisterId, {
        agentOptions: {
            "host": process.env.NEXT_PUBLIC_IC_HOST,
        }
    })
}

export function serviceMakeActor() {
    return makeActor(serviceCanisterId, serviceCreateActor);
}

const actor: _SERVICE = makeActor(process.env.NEXT_PUBLIC_CANISTER_ID_TIDAL_CHAIN_BACKEND, serviceCreateActor)

export default actor;