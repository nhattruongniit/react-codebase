let y = 100;
const limit = 5000;
const dataPoints = [];
for (let i = 0; i < limit; i += 1) {
  y += Math.round(Math.random() * 10 - 5);
  dataPoints.push({
    x: i,
    y: y
  });
}
  
export default dataPoints;