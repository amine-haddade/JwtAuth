import {legacy_createStore} from 'redux'
import {composeWithDevTools}  from 'redux-devtools-extension'
import { Reducer } from './Reducre'

export const StoreJwt=legacy_createStore(Reducer,composeWithDevTools())