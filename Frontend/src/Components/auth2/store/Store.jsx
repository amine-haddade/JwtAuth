import { legacy_createStore}  from 'redux'
import { Reducer } from './Reducer'


export const StoreAuth2=legacy_createStore(Reducer)