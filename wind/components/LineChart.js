import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  processColor
} from 'react-native';
import { LineChart } from 'react-native-charts-wrapper'

export default class LineChart extends Component {

  constructor (props) {
    super(props)
    this.state = {
      pie: {
        title: 'Favorite Food in Jogja',
        detail: {
          time_value_list: [2017],
          legend_list: ['Hamburger', 'Steak', 'Pecel', 'Magelangan'],
          dataset: {
            Hamburger: { '2017': 9 },
            Steak: { '2017': 17 },
            Pecel: { '2017': 29 },
            Magelangan: { '2017': 45 }
          }
        }
      },
      bar: {
        title: 'Sales motor in Indonesia',
        detail: {
          time_value_list: ['2010',
          '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
          legend_list: ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki'],
          dataset: {
            Honda: {
              '2010': 3800,
              '2011': 4500,
              '2012': 5400,
              '2013': 6000,
              '2014': 7000,
              '2015': 7800,
              '2016': 8600,
              '2017': 9000
            },
            Yamaha: {
              '2010': 3500,
              '2011': 4000,
              '2012': 4600,
              '2013': 5000,
              '2014': 5600,
              '2015': 6700,
              '2016': 7700,
              '2017': 8900,
            },
            Suzuki: {
              '2010': 4500,
              '2011': 5000,
              '2012': 5600,
              '2013': 6600,
              '2014': 7400,
              '2015': 8000,
              '2016': 8500,
              '2017': 9100
            },
            Kawasaki: {
              '2010': 3000,
              '2011': 3500,
              '2012': 4100,
              '2013': 4900,
              '2014': 5600,
              '2015': 6500,
              '2016': 7600,
              '2017': 8500
            }
          }
        }
      },
      line: {
        title: 'Development smartphone in Indonesia',
        detail: {
          time_value_list: ['2011', '2012', '2013', '2014', '2015', '2016'],
          legend_list: ['Samsung', 'Apple', 'Sony'],
          dataset: {
            Samsung: {
              '2011': 371,
              '2012': 8112,
              '2013': 8806,
              '2014': 6954,
              '2015': 1097,
              '2016': 8332
            },
            Apple: {
              '2011': 7151,
              '2012': 5664,
              '2013': 2404,
              '2014': 3744,
              '2015': 2832,
              '2016': 5539
            },
            Sony: {
              '2011': 7564,
              '2012': 2172,
              '2013': 1167,
              '2014': 3844,
              '2015': 759,
              '2016': 5752
            }
          }
        }
      }
    }
  }

  getRandomColor () {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  renderLine () {
    const time = this.state.line.detail.time_value_list
    const legend = this.state.line.detail.legend_list
    const dataset = this.state.line.detail.dataset

    var dataSetsValue = []
    var dataStyle = {}
    var legendStyle = {}
    var descStyle = {}
    var xAxisStyle = {}
    var chooseStyle = {}
    var valueLegend = []
    var colorLegend = []

    legend.map((legendValue) => {
      var valueLegend = []

      time.map((timeValue) => {
        const datasetValue = dataset[legendValue]
        const datasetTimeValue = datasetValue[timeValue]

        valueLegend.push({ y: parseInt(datasetTimeValue) })
      })

      const datasetObject = {
        values: valueLegend,
        label: legendValue,
        config: {
          lineWidth: 1,
          drawCubicIntensity: 0.4,
          circleRadius: 5,
          drawHighlightIndicators: false,
          color: processColor(this.getRandomColor()),
          drawFilled: true,
          fillColor: processColor(this.getRandomColor()),
          fillAlpha: 45,
          circleColor: processColor(this.getRandomColor()),
          drawValues: false
        }
      }
      dataSetsValue.push(datasetObject)
    })

    legendStyle = {
      enabled: true,
      textColor: processColor('blue'),
      textSize: 12,
      position: 'BELOW_CHART_RIGHT',
      form: 'SQUARE',
      formSize: 14,
      xEntrySpace: 10,
      yEntrySpace: 5,
      formToTextSpace: 5,
      wordWrapEnabled: true,
      maxSizePercent: 0.5
    }
    dataStyle = {
      dataSets: dataSetsValue
    }
    xAxisStyle = {
      valueFormatter: time
    }
    const markers = {
      enabled: true,
      digits: 2,
      backgroundTint: processColor('teal'),
      markerColor: processColor('#F0C0FF8C'),
      textColor: processColor('white')
    }

    return(
      <LineChart
        style={styles.bar}
        data={dataStyle}
        chartDescription={{text: ''}}
        legend={legendStyle}
        marker={markers}
        xAxis={xAxisStyle}
        drawGridBackground={false}
        borderColor={processColor('teal')}
        borderWidth={1}
        drawBorders
      />
    )
  }
}
