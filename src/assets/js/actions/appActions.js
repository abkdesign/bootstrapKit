export function toggleSelectAction(toggleState) {
  return {
    detail: {
      type: "TOGGLE_SELECT",
      toggle: toggleState,
      reducer: "toggleSelectReducer"
    }
  }
}
