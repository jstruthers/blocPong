export default function rootReducer (state = [], action) {
  
  let newState = {}
  
  switch(action.type){
    case "GET_CONTEXT":

      newState.context = action.context

      return {...state, ...newState}
    case "DISPLAY_BALL":
      
      let { x: ballX, y: ballY } = action.ballPosition

      state.context.strokeStyle = "black"
      state.context.beginPath()
      state.context.arc(ballX, ballY, action.ballSize, 0, Math.PI * 2)
      state.context.stroke()

      return state;
    case "DISPLAY_PADDLE":
      
      let { x: paddleX, y: paddleY } = action.paddlePosition,
          { w: paddleW, h: paddleH } = action.paddleSize

      state.context.strokeStyle = "black"
      state.context.strokeRect(paddleX, paddleY, paddleW, paddleH)

      return state;
    default:
      return state
  }
}
