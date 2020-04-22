import { combineReducers } from "redux";
import { dCategory } from "./dCategory";
import { dProduct} from "./dProduct";

export const reducers = combineReducers({
    dCategory,
    dProduct
})