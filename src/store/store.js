import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {accountReducer, commentReducer, zoneReducer, profileReducer} from '../reducers'


var store;

export default {
    configureStore: (initial) => {
        const reducers = combineReducers({
          zone: zoneReducer,
          comment: commentReducer,
          account: accountReducer,
          profile: profileReducer
        })

        store = createStore(
          reducers,
          initial,
          applyMiddleware(thunk)
        )

        return store
    },

    currentStore: () => {
      return store
    }
}
