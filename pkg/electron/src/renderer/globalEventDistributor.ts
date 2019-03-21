import { Store } from 'redux';

export class GlobalEventDistributor {
    private stores: Store[];
    constructor() {
        this.stores = [];
    }

    registerStore(store: any) {
        this.stores.push(store);
    }

    dispatch(event) {
        this.stores.forEach((s: any) => {
            s.dispatch(event)
            setTimeout(()=>s.dispatch({type:'REFRESH'}))
            
        });
    }
    
    getState() {
        let state = {};
        this.stores.forEach((s) => {
            let currentState = s.getState();
            state[currentState.namespace] = currentState
        });
        return state
    }
}