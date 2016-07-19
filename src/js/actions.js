export function getContext(context) {
  return {
    type: 'GET_CONTEXT',
    context
  }
}

export function displayBall(ballPosition, ballSize) {
  return {
    type: 'DISPLAY_BALL',
    ballPosition,
    ballSize
  }
}

export function displayPaddle(paddlePosition, paddleSize) {
  return {
    type: 'DISPLAY_PADDLE',
    paddlePosition,
    paddleSize
  }
}
