// const data = [
//   {
//     name: 'W1', uv: 3400
//   },
//   {
//     name: 'W2', uv: 4000
//   },
//   {
//     name: 'W3', uv: 10300
//   },
// ];
let y = 100;
const limit = 4000;
const dataPoints = [];
for (let i = 0; i < limit; i += 1) {
  y += Math.round(Math.random() * 10 - 5);
  dataPoints.push({
    name: i,
    uv: y
  });
}
  
export default dataPoints;