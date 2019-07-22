import React,{ Component } from 'react';
import echarts from 'echarts/lib/echarts';
import echartsTheme from './echartTheme'
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

class Bar extends Component {
	componentWillMount() {
		echarts.registerTheme('Imooc', echartsTheme);
	}

	getOption = ()=> {
		let option = {
			title: {
				text: '销售额分布'
			},
			legend: {
				data: ['abc','def']
			},
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				data: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug']
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name:'abc',
					type: 'bar',
					data:[1000,2000,1500,3000,2000,1200,800,1555]
				}, {
					name:'def',
					type: 'bar',
					data:[1000,2000,1500,3000,2000,1200,800,1555]
				}
			]
		}
		return option;
	}

	render() {
		return (
			<div className="bar-box">
				<ReactEcharts option={this.getOption()} theme='Imooc' />
			</div>
		)
	}
}

export default Bar;