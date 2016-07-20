export function getContext(context) {
  return {
    type: 'GET_CONTEXT',
    context
  }
}

export function display(obj) {
  return {
    type: 'DISPLAY',
    obj
  }
}

export function handleEdge(obj) {
  return {
    type: 'HANDLE_EDGE',
    obj
  }
}

export function handleKeyPress(event) {
  return {
    type: 'HANDLE_KEY_PRESS',
    event
  }
}
