import React, { Component } from 'react';
import {Bar, Line} from 'react-chartjs-2';


export class BarChart extends Component {
  render() {
    const {values} = this.props;
    return (
      <div>
        <Bar
          data={values}
          options={{
            title:{
              display:true,
              text:'Günümüze Göre Karşılaştırma',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        />
      </div>
    );
  }
}
 export default BarChart;