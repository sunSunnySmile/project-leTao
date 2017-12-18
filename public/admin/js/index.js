$(function() {
    // 基于准备好的dom，初始化echarts实例
    var myChartLeft = echarts.init(document.getElementById('left_pic'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChartLeft.setOption(option);

    // 基于准备好的dom，初始化echarts实例
    var myChartRight = echarts.init(document.getElementById('right_pic'));
    var weatherIcons = {
        'Sunny': './data/asset/img/weather/sunny_128.png',
        'Cloudy': './data/asset/img/weather/cloudy_128.png',
        'Showers': './data/asset/img/weather/showers_128.png'
    };

    option = {
        title: {
            text: '天气情况统计',
            subtext: '虚构数据',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['西凉', '益州', '兖州', '荆州', '幽州']
        },
        series: [{
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [{
                    value: 1548,
                    name: '幽州',
                    label: {
                        normal: {
                            backgroundColor: '#2c343c',
                            borderColor: '#777',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                title: {
                                    color: '#eee',
                                    align: 'center'
                                },
                                abg: {
                                    backgroundColor: '#333',
                                    width: '100%',
                                    align: 'right',
                                    height: 25,
                                    borderRadius: [4, 4, 0, 0]
                                },
                                Sunny: {
                                    height: 30,
                                    align: 'left',
                                    backgroundColor: {
                                        image: weatherIcons.Sunny
                                    }
                                },
                                Cloudy: {
                                    height: 30,
                                    align: 'left',
                                    backgroundColor: {
                                        image: weatherIcons.Cloudy
                                    }
                                },
                                Showers: {
                                    height: 30,
                                    align: 'left',
                                    backgroundColor: {
                                        image: weatherIcons.Showers
                                    }
                                },
                                weatherHead: {
                                    color: '#333',
                                    height: 24,
                                    align: 'left'
                                },
                                hr: {
                                    borderColor: '#777',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                value: {
                                    width: 20,
                                    padding: [0, 20, 0, 30],
                                    align: 'left'
                                },
                                valueHead: {
                                    color: '#333',
                                    width: 20,
                                    padding: [0, 20, 0, 30],
                                    align: 'center'
                                },
                                rate: {
                                    width: 40,
                                    align: 'right',
                                    padding: [0, 10, 0, 0]
                                },
                                rateHead: {
                                    color: '#333',
                                    width: 40,
                                    align: 'center',
                                    padding: [0, 10, 0, 0]
                                }
                            }
                        }
                    }
                },
                { value: 535, name: '荆州' },
                { value: 510, name: '兖州' },
                { value: 634, name: '益州' },
                { value: 735, name: '西凉' }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartRight.setOption(option);
});