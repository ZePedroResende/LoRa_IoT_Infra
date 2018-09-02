/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import { TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-charts-wrapper'

export default class RNChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      url: 'http://ip_server:4000',
      data: [],
      line: {
        title: 'Development smartphone in Indonesia',
        detail: {
          time_value_list: [ '2016'],
          legend_list: [ 'Sony'],
          dataset: {
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

  componentWillMount(){
    fetch(`${this.state.url}/api/users/sign_in`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email":"asd@asd.com",
          "password":"qwerty"
        })

    })

      .then((response) => response.json())
      .then((responseJson) => {


          fetch(`${this.state.url}/api/auth/readings`, {
              method: 'GET',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json',
              }

          })
            .then((response) => response.json())
            .then((responseJson) => {
               this.setState({data: responseJson.data, loading: false});
            })
            .catch((error) => {
               this.setState({ loading: false});
               Alert.alert(error.toString())
            });



      })
      .catch((error) => {

               this.setState({ loading: false});
   Alert.alert(error.toString())
      });


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
    const time = this.state.data.map(x => x.reading_time);
    const legend = ['temp'];
    const dataset = { temp:
      this.state.data.reduce ((acc, elem) => (acc[elem.reading_time] = elem.reading.payload_fields.data.temperature[0], acc) , {} )
 } ;
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

        valueLegend.push({ y: datasetTimeValue, marker: datasetTimeValue})
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
          drawValues: false,
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
    yAxisStyle = {
      $set: {
        left: {
        },
        right: {
        }
      }
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
        yAxis={yAxisStyle}
        drawGridBackground={false}
        borderColor={processColor('teal')}
        borderWidth={1}
        drawBorders
      />
    )
  }

  render() {
   if(this.state.loading) {
        return(
        <Text style={styles.title}>
          Loading..
        </Text>
        )

    }
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          Line Chart
        </Text>
        {this.renderLine()}

      </ScrollView>
    );
  }
}

/*
   <View style={{paddingTop: 50, paddingLeft: 50 }}>
   <Text> Some other text </Text>
    <Text> Some other text </Text>
    <TouchableOpacity onPress={this.handlePress.bind(this)}>
     <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Click me to see the name </Text>
    </TouchableOpacity>

</View>

      */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bar: {
    marginTop: 10,
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width,
    padding: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RNChart', () => RNChart);
