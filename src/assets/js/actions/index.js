import { getUsersAction } from './getUsersAction';
import { countUpAction, countDownAction } from './getCountActions';
import { toggleSelectAction} from './appActions';
/*ACTIONS what data is passed to reducer*/
const Actions = {
  countDownAction: countDownAction,
  countUpAction: countUpAction,
  getUsersAction,
  toggleSelectAction
};
export default Actions;