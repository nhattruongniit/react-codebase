import React, { PureComponent } from 'react';
import CanvasJSReact from 'assets/canvasjs/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class DefaultPage extends PureComponent {

	render() {
		const { dataLineChart } = this.props;
		const options = {
			animationEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: ""
			},
			axisY: {
				title: "",
				includeZero: false,
				lineThickness: 1
			},
			data: [{
				type: "line",
				// toolTipContent: "Week {x}: {y}%",
				dataPoints: dataLineChart
			}]
		}
		return (
			<CanvasJSChart options={options} />
		);
	}
}
