import { legacy_createStore as createStore,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk";
import { coins,search } from "./reducer";
 const reduucers= combineReducers({coins,search});
 const midelware=[thunk];
 const initialstate={};
 const store =createStore(reduucers,initialstate,applyMiddleware(...midelware))
 export default store;
