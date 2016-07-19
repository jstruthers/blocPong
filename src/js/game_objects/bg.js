export default (CTX, {w, h}) => {
  CTX.clearRect(0, 0, w, h);
  CTX.beginPath();
  CTX.strokeStyle = "blue";
  CTX.moveTo(w/2, 0);
  CTX.lineTo(w/2, w/2);
  CTX.moveTo(w/2 + w/8, w/4);
  CTX.arc(w/2, w/4, w/8, 0, Math.PI * 2);
  CTX.stroke();
};
