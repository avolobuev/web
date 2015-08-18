/*----------grid--------------*/
var gridChartStore=Ext.create('Ext.data.JsonStore', 
{
	autoLoad:false,
	fields: 
	[
		'name',
		'data'
	],
	proxy: 
	{
		type: 'ajax', 
		url: 'php/get_achart2.php',
		reader: 
		{
			type: 'json',
			root: 'rows'
		}
	}
});
var gridChart=Ext.create('Ext.grid.Panel', 
{
	store:gridChartStore,
	height:200,
	columns: 
	[
		{
			text:'Тип',
			dataIndex:'name',
			width:140
		},
		{
			text:'Данные',
			dataIndex:'data',
			width:140
		}
	]
});
/*-----Выбор теста---------------------------------------------------------*/
Ext.define('chart_atests',
{
	extend:'Ext.data.Model',
	idProperty:'TEST_ID',
	fields: 
	[
		{name:'TEST_ID'},
		{name:'TEST_NAME'}
	]
});  
var chart_atests=Ext.create('Ext.data.JsonStore',
{
	model:'chart_atests',
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
Ext.define('semestr',
{
	extend:'Ext.data.Model',
	fields:
	[
		{name: 'studyid'},
		{name: 'semestr'}
	]
});  
var semestr=Ext.create('Ext.data.JsonStore',
{
	model:'semestr',
	autoLoad:false,
	proxy: 
	{
		type:'ajax', 
		url:'php/get_semestr.php',
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
var combo_atests = Ext.create('Ext.form.ComboBox', 
{
	store:chart_atests,
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
		select: function(combo,records,eOpts)
		{
			combo_semestr.clearValue();
			combo_semestr.store.load();
			combo_semestr.setDisabled(false);
		}
	}
});
var combo_semestr=Ext.create('Ext.form.ComboBox',
{
	id:'semestr-id',
	name:'semestr-id',
	store:semestr,
	displayField:'semestr',
	valueField:'semestr',
	fieldLabel:'Выберите период',
	labelWidth:130,
	inputWidth:400,
	emptyText:'- период -',
	submitEmptyText:false,
	editable:false,
	queryMode:'local',
	disabled:true,
	margin: 10,
	listeners:
	{
		select:function(combo,records,eOpts)
		{
			astatistic.store.load({params:{testid:combo_atests.getValue(),date:combo.value}});
			astatistic.setVisible(true);
		}
	}
});
/*-------------------charts----------------------------------------*/
Ext.define('achart',
{
	extend: 'Ext.data.Model',
	fields: 
	[
		{name:'grocode'},
		{name:'aball'},
		{name:'groid'}
	]
});  
var achart = Ext.create('Ext.data.JsonStore',
{
	model:'achart',
	autoLoad:false,
	proxy: 
	{
		type:'ajax', 
		url:'php/get_achart.php',
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
/*------------------------------------------------------------------------------------------------*/
var astatistic=Ext.create('Ext.chart.Chart', 
{
	animate:true,
	shadow:true,
	hidden:true,
	store:achart,
	width:window.innerWidth/2,
	height:300,
	axes: 
	[
		{
			type: 'Numeric',
			position: 'left',
			fields: 
			[
				'aball'
			],
			label: 
			{
				renderer: Ext.util.Format.numberRenderer('0.00')
			},
			title: 'Баллы за тест',
			grid: true,
			minimum: 0//,
			//maximum:30
		}, 
		{
			type: 'Category',
			position: 'bottom',
			fields: ['grocode'],
			title: 'Группы',
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
				trackMouse: false,
				width: 300,
				height: 210,
				margin:5,
				closable:true,
				autoHide:false,
				draggable:true,
				shadow:false,
				items: 
				[
					gridChart
				],
				renderer: function(item) 
				{
					gridChart.store.load({params:{testid:combo_atests.getValue(), date:combo_semestr.getValue(),groid:item.get('groid')}});
				}
			},
			label: 
			{
				display: 'insideEnd',
				'text-anchor': 'middle',
				field: 'aball',
				renderer: Ext.util.Format.numberRenderer('0.0'),
				orientation: 'horizontal',
				color: '#fff'
			},
			xField: 'grocode',
			yField: 'aball',
			renderer: function(sprite, record, attr, index, store) 
			{
				var color = 'rgb(252,221,118)';
				return Ext.apply(attr,{fill: color});
            }
		}
	]
});
/*------------------------------------------------------------------------------------------------*/
var acordion_acharts = Ext.create('Ext.panel.Panel', 
{
    height:(window.innerHeight-58),
	frame:true,
	autoDestroy:false,
	id:'achart-pan',
	name:'achart-pan',
	layout:'accordion',
	layoutConfig: 
	{
		titleCollapse:false,
		animate:true,
		activeOnTop:true
	},
	items: 
	[
		{
			title:'Средний балл в группах',
			autoScroll:true,
			frame:true,
			items:
			[
				combo_atests,combo_semestr,astatistic
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
								astatistic.save({
									type: 'image/png'
								});
							}
						});
					}
				},
				{
					xtype:'button',
					text:'pdf - отчет',
					icon:'icons/acroread.ico',
					handler:function()
					{
						window.open('pdf/pdf_2.php?testid=' + combo_atests.getValue() + '&date=' + combo_semestr.getValue(),'_blank');
					}
				}
			]
		}
	]
});