import Actions from './index';

describe('actions', () => {
  it('should create an action to get users', () => {
    const users = {
      "id": 1,
      "name": "albert"
    };
    const expectedAction = {
      detail: {
        type: "UPDATE_USERS",
        users: users,
        reducer: "userReducer"
      }
    }
    expect(Actions.getUsersAction(users)).toEqual(expectedAction)
  })
  it('should create an action to get users', () => {
    const expectedAction = {
      detail: {
        type: "COUNT_DOWN",
        reducer: "countReducer"
      }
    }
    expect(Actions.countDownAction()).toEqual(expectedAction)
  })
})