export function toggleSelectAction(toggleState) {
  return {
    detail: {
      type: "TOGGLE_SELECT",
      toggle: toggleState,
      reducer: "toggleSelectReducer"
    }
  }
}
export function scrollByAction(scrollState) {
  return {
    detail: {
      type: "SCROLLBY",
      scrollBy: scrollState,
      reducer: "scrollByReducer"
    }
  }
}
