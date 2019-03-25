import { Store } from 'redux';

export class GlobalEventDistributor {
    private stores: Map<string, Store>;
    constructor() {
        this.stores = new Map();
    }

    registerStore(name: string, store: any) {
        this.stores.set(name, store);
    }

    dispatch(event) {
        this.stores.forEach((store: any) => {
            store.dispatch(event)
            setTimeout(()=>store.dispatch({type:'REFRESH'}))
            
        });
    }
    
    getState() {
        let state = {};
        this.stores.forEach((store: any) => {
            let currentState = store.getState();
            state[currentState.namespace] = currentState
        });
        return state
    }
}