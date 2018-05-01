import countReducer from './countReducer';
import {userReducer} from './apiReducer';
import { toggleSelectReducer} from './appReducer';
import scrollByReducer from './scrollByReducer';
const Reducers = {
  'userReducer': userReducer,
  'countReducer': countReducer,
  'toggleSelectReducer': toggleSelectReducer,
  'scrollByReducer': scrollByReducer
};


export default Reducers;