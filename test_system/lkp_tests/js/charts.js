/*-----Выбор теста для прохождения---------------------------------------------------------*/
Ext.define('chart_tests',
{
	extend:'Ext.data.Model',
	idProperty:'TEST_ID',
	fields: 
	[
		{name:'TEST_ID'},
		{name:'TEST_NAME'},
		{name:'TEST_DESCR'},
		{name:'TEST_DTTM'}
	]
});  
var chart_tests=Ext.create('Ext.data.JsonStore',
{
	model:'chart_tests',
	autoLoad:false,
	proxy: 
	{
		type:'ajax', 
		url:'php/get_tests.php',
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
var combo_chart2=Ext.create('Ext.form.ComboBox',
{
	id:'chart-test-id',
	name:'chart-test-id',
	store:chart_tests,
	displayField:'TEST_NAME',
	valueField:'TEST_ID',
	fieldLabel:'Выберите тест',
	labelWidth:130,
	inputWidth:400,
	emptyText:'- тест -',
	submitEmptyText:false,
	editable:false,
	//queryMode:'local',
	margin:10,
	listeners:
	{
		select:function(combo,records,eOpts)
		{
			statistic.store.load({params:{testid:this.value}});
			statistic.setVisible(true);
		}
	}
});
/*var combo_chart3=Ext.create('Ext.form.ComboBox', 
{
	id:'chart-test2-id',
	name:'chart-test2-id',
	store:chart_tests,
	displayField:'TEST_NAME',
	valueField:'TEST_ID',
	fieldLabel:'Выберите тест',
	labelWidth:130,
	inputWidth:400,
	emptyText:'- тест -',
	submitEmptyText:false,
	editable:false,
	margin:10,
	listeners:
	{
		select:function(combo,records,eOpts)
		{
			statistic2.store.load({params:{testid:this.value}});
			statistic2.setVisible(true);
		}
	}
});
var combo_chart4=Ext.create('Ext.form.ComboBox', 
{
	id:'chart-test3-id',
	name:'chart-test3-id',
	store:chart_tests,
	displayField:'TEST_NAME',
	valueField:'TEST_ID',
	fieldLabel:'Выберите тест',
	labelWidth:130,
	inputWidth:400,
	emptyText:'- тест -',
	submitEmptyText:false,
	editable:false,
	margin:10,
	listeners:
	{
		select:function(combo,records,eOpts)
		{
			statistic3.store.load({params:{testid:this.value}});
			statistic3.setVisible(true);
		}
	}
});
var combo_chart5=Ext.create('Ext.form.ComboBox', 
{
	id:'chart-test4-id',
	name:'chart-test4-id',
	store:chart_tests,
	displayField:'TEST_NAME',
	valueField:'TEST_ID',
	fieldLabel:'Выберите тест',
	labelWidth:130,
	inputWidth:400,
	emptyText:'- тест -',
	submitEmptyText:false,
	editable:false,
	margin:10,
	listeners:
	{
		select:function(combo,records,eOpts)
		{
			statistic4.store.load({params:{testid:this.value}});
			statistic4.setVisible(true);
		}
	}
});
var combo_chart6=Ext.create('Ext.form.ComboBox', 
{
	id:'chart-test5-id',
	name:'chart-test5-id',
	store:chart_tests,
	displayField:'TEST_NAME',
	valueField:'TEST_ID',
	fieldLabel:'Выберите тест',
	labelWidth:130,
	inputWidth:400,
	emptyText:'- тест -',
	submitEmptyText:false,
	editable:false,
	margin: 10,
	listeners:
	{
		select: function(combo,records,eOpts)
		{
			statistic5.store.load({params:{testid:this.value}});
			statistic5.setVisible(true);
		}
	}
});*/
/*-------------------charts----------------------------------------*/
Ext.define('chart',
{
	extend:'Ext.data.Model',
	fields:
	[
		{name:'fio'},
		{name:'ball'}
	]
});  
var chart=Ext.create('Ext.data.JsonStore',
{
	model:'chart',
	autoLoad:false,
	proxy: 
	{
		type:'ajax', 
		url:'php/get_chart.php',
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
/*Ext.define('chart2',
{
	extend:'Ext.data.Model',
	fields: 
	[
		{name:'grocode'},
		{name:'aball'}
	]
});  
var chart2 = Ext.create('Ext.data.JsonStore',
{
	model:'chart2',
	autoLoad:false,
	proxy: 
	{
		type:'ajax', 
		url:'php/get_chart2.php',
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
Ext.define('chart3',
{
	extend:'Ext.data.Model',
	fields: 
	[
		{name:'grocode'},
		{name:'sright'},
		{name:'swrong'},
		{name:'pright',type:'int'},
		{name:'pwrong',type:'int'}
	]
});  
var chart3=Ext.create('Ext.data.JsonStore',
{
	model:'chart3',
	autoLoad:false,
	proxy: 
	{
		type:'ajax', 
		url:'php/get_chart3.php',
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
	
	Ext.define('chart4',{
		extend: 'Ext.data.Model',
		fields: 
		[
			{name: 'grocode'},
			{name: 'atime', type:'int'}
		]
	});  

	var chart4 = Ext.create('Ext.data.JsonStore',{
		model: 'chart4',
		autoLoad: false,
		proxy: 
		{
			type: 'ajax', 
			url: 'php/get_chart4.php',
			reader: 
			{
				type: 'json',
				root: 'rows'
			}
		}
	});
	
	Ext.define('chart5',{
		extend: 'Ext.data.Model',
		fields: 
		[
			{name: 'mistakes'},
			{name: 'question'},
			{name: 'question_text'}
		]
	});  

	var chart5 = Ext.create('Ext.data.JsonStore',{
		model: 'chart5',
		autoLoad: false,
		proxy: 
		{
			type: 'ajax', 
			url: 'php/get_chart_mistakes.php',
			reader: 
			{
				type: 'json',
				root: 'rows'
			}
		}
	});
	*/
/*------------------------------------------------------------------------------------------------*/
var statistic = Ext.create('Ext.chart.Chart', {
	animate: true,
	shadow: true,
	hidden:true,
	store: chart,
	width:window.innerWidth/2,
	height:300,
	//renderTo:Ext.getBody(),
	axes: 
	[
		{
			type: 'Numeric',
			position: 'left',
			fields: 
			[
				'ball'
			],
			label: 
			{
				renderer: Ext.util.Format.numberRenderer('0')
			},
			title: 'Баллы за тест',
			grid: true,
			minimum: 0,
			maximum:30
		}, 
		{
			type: 'Category',
			position: 'bottom',
			fields: ['fio'],
			title: 'Пользователи',
			label: 
			{
				rotate: 
				{
					degrees: 270
				}
			},
			grid: true
		}
	],
	series: 
	[
		{
			type: 'column',
			axis: 'left',
			highlight: true,
			tips: 
			{
				trackMouse: true,
				width: 200,
				height: 30,
				renderer: function(storeItem, item) 
				{
					this.setTitle(storeItem.get('fio') + ': ' + storeItem.get('ball') + ' баллов');
				}
			},
			label: 
			{
				display: 'insideEnd',
				'text-anchor': 'middle',
				field: 'ball',
				renderer: Ext.util.Format.numberRenderer('0.0'),
				orientation: 'horizontal',
				color: '#333'
			},
			xField: 'fio',
			yField: 'ball'
		}
	]
});
/*
var statistic2 = Ext.create('Ext.chart.Chart', {
            animate: true,
            //style: 'background:#fff',
            shadow: false,
            store: chart2,
			hidden:true,
			//autoShow:true,
			width:window.innerWidth/2,
			height:250,
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['aball'],
                label: {
                   renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: 'Средний балл в группе',
                minimum: 0,
				maximum: 50,
            }, {
                type: 'Category',
                position: 'left',
                fields: ['grocode'],
                title: 'Группы',
				grid: true
            }],
            series: [
			{
                type: 'bar',
                axis: 'bottom',
				highlight: true,
				tips: 
				{
					trackMouse: true,
					width: 180,
					height: 30,
					renderer: function(storeItem, item) 
					{
						this.setTitle(storeItem.get('grocode') + ': ' + storeItem.get('aball') + ' баллов');
					}
				},
                label: {
                    display: 'insideEnd',
                    field: 'aball',
                    renderer: Ext.util.Format.numberRenderer('0.00'),
                    orientation: 'horizontal',
                    color: '#333',
                    'text-anchor': 'middle',
                    contrast: true
                },
                xField: 'grocode',
                yField: ['aball'],
                //color renderer
                renderer: function(sprite, record, attr, index, store) {
                    var fieldValue = Math.random() * 20 + 10;
                    var value = (record.get('aball') >> 0) % 5;
                    var color = ['rgb(213, 70, 121)', 
                                 'rgb(44, 153, 201)', 
                                 'rgb(146, 6, 157)', 
                                 'rgb(49, 149, 0)', 
                                 'rgb(249, 153, 0)'][value];
                    return Ext.apply(attr, {
                        fill: color
                    });
                }
            }
            ]
        });
		
var statistic3 = Ext.create('Ext.chart.Chart', {
    width:window.innerWidth/2,
	height:250,
	shadow: false,
    animate: true,
	hidden:true,
    store: chart3,
    axes: 
	[
        {
            type: 'Numeric',
            position: 'left',
            fields: ['pright','pwrong'],
            label: 
			{
                renderer: Ext.util.Format.numberRenderer('0.0')
            },
            title: 'Процент ответов',
            grid: true,
            minimum: 0,
			maximum: 100
        },
        {
            type: 'Category',
            position: 'bottom',
            fields: ['grocode'],
            title: 'Группы',
			grid: true
        }
    ],
    series: 
	[
		{
            type: 'line',
			smooth:true,
            highlight: 
			{
                size: 7,
                radius: 7,
				"stroke-width": 2, 
				stroke: '#ffffff'
            },
			style: 
			{
				fill: '#00ff00',
				opacity: 0.2
			},
            axis: 'left',
			fill: true,
            xField: 'grocode',
            yField: 'pright',
            markerConfig: {
                type: 'cross',
                size: 4,
                radius: 4,
                'stroke-width': 0,
				'fill': '#00ff00'
            },
			tips: 
			{
				trackMouse: true,
				width: 180,
				height: 50,
				renderer: function(storeItem, item) 
				{
					this.setTitle('Процент верных ответов: ' + storeItem.get('pright') + '%');
				}
			}
        },
        {
            type: 'line',
			smooth:true,
            highlight: {
                size: 7,
                radius: 7,
				"stroke-width": 2, 
				stroke: '#0000ff'
            },
            axis: 'left',
            fill: true,
            xField: 'grocode',
            yField: 'pwrong',
            markerConfig: {
                type: 'circle',
                size: 4,
                radius: 4,
                'stroke-width': 0,
				'fill': '#ff0000'
            },
			style: {
				fill: '#ff0000',
				opacity: 0.2
			},
			tips: 
			{
				trackMouse: true,
				width: 180,
				height: 50,
				renderer: function(storeItem, item) 
				{
					this.setTitle('Процент неверных ответов: ' + storeItem.get('pwrong') + '%');
				}
			}
        }
    ]
});

var statistic4 = Ext.create('Ext.chart.Chart', {
	width:window.innerWidth/2,
	height:280,
	shadow: true,
    animate: true,
	hidden:true,
	margin:10,
    store: chart4,
    axes: 
	[
        {
            type: 'Numeric',
            position: 'left',
            fields: ['atime'],
            label: 
			{
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            title: 'Среднее время ответа',
            grid: true,
            minimum: 0,
			maximum:60
        },
        {
            type: 'Category',
            position: 'bottom',
            fields: ['grocode'],
            title: 'Группы'
        }
    ],
    series: [
        {
            type: 'line',
            highlight: {
                size: 7,
                radius: 7
            },
            axis: 'left',
            xField: 'grocode',
            yField: 'atime',
            markerConfig: {
                type: 'square',
                size: 4,
                radius: 4,
                'stroke-width': 0
            },
			tips: 
			{
				trackMouse: true,
				width: 180,
				height: 50,
				renderer: function(storeItem, item) 
				{
					this.setTitle('Среднее время: ' + storeItem.get('atime') + ' мин.');
				}
			}
        }
    ]
});

var statistic5 = Ext.create('Ext.chart.Chart', {
	animate: true,
	shadow: true,
	hidden:true,
	store: chart5,
	width:window.innerWidth/2,
	height:300,
	//renderTo:Ext.getBody(),
	axes: 
	[
		{
			type: 'Numeric',
			position: 'left',
			fields: 
			[
				'mistakes'
			],
			label: 
			{
				renderer: Ext.util.Format.numberRenderer('0')
			},
			title: 'Количество ошибок',
			grid: true,
			//dashSize:2
			minimum: 0,
			maximum:60,
			constrain:false
		}, 
		{
			type: 'Category',
			position: 'bottom',
			fields: ['question'],
			title: 'Вопрос',
			label: 
			{
				rotate: 
				{
					degrees: 270
				}
			},
			grid: true
		}
	],
	series: 
	[
		{
			type: 'column',
			axis: 'left',
			highlight: true,
			tips: 
			{
				trackMouse: true,
				width: 350,
				height: 100,
				dismissDelay:10000,
				renderer: function(storeItem, item) 
				{
					this.setTitle('Количество ошибок:'+storeItem.get('mistakes')+'<br/>Вопрос: ' + storeItem.get('question_text'));
				}
			},
			xField: 'question',
			yField: 'mistakes',
			renderer: function(sprite, record, attr, index, store) 
			{
				var color = 'rgb(238,230,163)';
				return Ext.apply(attr,{fill: color});
            }
		}
	]
});*/

/*------------*/
var acordion_charts = Ext.create('Ext.panel.Panel', {
    height: (window.innerHeight - 58),
	frame:true,
	autoDestroy:false,
	id: 'chart-pan',
	name: 'chart-pan',
	layout: 'accordion',
	layoutConfig: 
	{
		titleCollapse: false,
		animate: true,
		activeOnTop: true
	},
	items: 
	[
		{
			title:'Результаты студентов',
			id:'results_students',
			autoScroll:true,
			frame:true,
			items:
			[
				combo_chart2/*,combo_chart1*/,statistic,
				{
					xtype: 'label',
					id:'dispersia',
					hidden:true
				}
			],
			bbar:
			[
				{
					xtype:'button',
					text:'Сохранить диаграмму...',
					handler:function()
					{
						Ext.MessageBox.confirm('Загрузка...', 'Вы хотитете сохранить изображение?', function(choice){
							if(choice == 'yes')
							{
								statistic.save({
									type: 'image/png'
								});
							}
						});
						//$('#tipdiv').show(1000);
					}
				},
				{
					xtype:'button',
					text:'pdf - отчет',
					icon:'icons/acroread.ico',
					handler:function()
					{
						window.open('pdf/pdf_1.php?testid=' + combo_chart2.getValue(),'_blank');
					}
				}
			]
		}/*,
		{
			title:'Средний балл по группе',
			id:'results_groups',
			autoScroll:true,
			frame:true,
			items:
			[
				combo_chart3,statistic2
			],
			bbar:
			[
				{
					xtype:'button',
					text:'Сохранить диаграмму...',
					handler:function()
					{
						Ext.MessageBox.confirm('Загрузка...', 'Вы хотитете сохранить изображение?', function(choice){
							if(choice == 'yes')
							{
								statistic2.save({
									type: 'image/png'
								});
							}
						});
					}
				}
			]
		},
		{
			title:'Процент верных/неверных ответов',
			id:'results_average',
			autoScroll:true,
			frame:true,
			items:
			[
				combo_chart4,statistic3
			],
			bbar:
			[
				{
					xtype:'button',
					text:'Сохранить диаграмму...',
					handler:function()
					{
						Ext.MessageBox.confirm('Загрузка...', 'Вы хотитете сохранить изображение?', function(choice){
							if(choice == 'yes')
							{
								statistic3.save({
									type: 'image/png'
								});
							}
						});
					}
				}
			]
		},
		{
			title:'Среднее время на тест',
			id:'times_average',
			autoScroll:true,
			frame:true,
			items:
			[
				combo_chart5,statistic4
			],
			bbar:
			[
				{
					xtype:'button',
					text:'Сохранить диаграмму...',
					handler:function()
					{
						Ext.MessageBox.confirm('Загрузка...', 'Вы хотитете сохранить изображение?', function(choice){
							if(choice == 'yes')
							{
								statistic4.save({
									type: 'image/png'
								});
							}
						});
					}
				}
			]
		},
		{
			title:'Вопросы, вызывающие трудности',
			id:'mistakes_test',
			autoScroll:true,
			frame:true,
			items:
			[
				combo_chart6,statistic5
			],
			bbar:
			[
				{
					xtype:'button',
					text:'Сохранить диаграмму...',
					handler:function()
					{
						Ext.MessageBox.confirm('Загрузка...', 'Вы хотитете сохранить изображение?', function(choice){
							if(choice == 'yes')
							{
								statistic5.save({
									type: 'image/png'
								});
							}
						});
					}
				}
			]
		}*/
	]
});