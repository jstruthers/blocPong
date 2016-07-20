export function getContext(context) {
  return {
    type: 'GET_CONTEXT',
    context
  }
}

export function handleEdge(obj) {
  return {
    type: 'HANDLE_EDGE',
    obj
  }
}

export function move(obj) {
  return {
    type: 'MOVE',
    obj
  }
}

export function display(obj) {
  return {
    type: 'DISPLAY',
    obj
  }
}

export function handleKeyPress(event) {
  return {
    type: 'HANDLE_KEY_PRESS',
    event
  }
}
