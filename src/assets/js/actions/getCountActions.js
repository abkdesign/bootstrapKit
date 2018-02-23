
export function countDownAction() {
  return {
    detail: {
      type: "COUNT_DOWN",
      reducer: "countReducer"
    }
  }
}

export function countUpAction() {
  return {
    detail: {
      type: "COUNT_UP",
      reducer: "countReducer"
    }
  }
}
