import { getUsersAction } from './getUsersAction';
import { countUpAction, countDownAction } from './getCountActions';
import { toggleSelectAction,scrollByAction} from './appActions';
/*ACTIONS what data is passed to reducer*/
const Actions = {
  countDownAction: countDownAction,
  countUpAction: countUpAction,
  getUsersAction,
  toggleSelectAction,
  scrollByAction
};
export default Actions;