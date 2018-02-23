import countReducer from './countReducer';
import {userReducer} from './apiReducer';
import { toggleSelectReducer} from './appReducer';

const Reducers = {
  'userReducer': userReducer,
  'countReducer': countReducer,
  'toggleSelectReducer': toggleSelectReducer
};


export default Reducers;