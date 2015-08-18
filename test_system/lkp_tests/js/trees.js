/**************Tabs****************************************************/
Ext.define('wrong_answers',
{
	extend:'Ext.data.Model',
	fields: 
	[
		{name:'UANSWER_TEXT'},
		{name:'QUESTION_TEXT'},
		{name:'QUESTION_TYPE'},
		{name:'RANSWER_TEXT'}
	]
});
var wrong_answers=Ext.create('Ext.data.JsonStore',
{
	model:'wrong_answers',
	autoLoad:false,
	groupField:'QUESTION_TYPE',
	proxy: 
	{
		type:'ajax', 
		url:'php/get_stat2.php',
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
var groupingFeature=Ext.create('Ext.grid.feature.Grouping',
{
	groupHeaderTpl:'{name}'
});
var gWrong = Ext.create('Ext.grid.Panel',
{
	store:wrong_answers,
	autoDestroy:false,
	autoScroll:true,
	height:(window.innerHeight/2 - 58),
	id:'gridwrong-id',
	features: 
	[
		groupingFeature
	],
	columns: 
	[
		Ext.create('Ext.grid.RowNumberer',{text:'№'}),
		{
			text:'Вопрос',
			dataIndex:'QUESTION_TEXT',
			width: 300
		},
		{
			text:'Ответ студента',
			dataIndex:'UANSWER_TEXT',
			renderer:function(val,metaData)
			{
				metaData.style='background:#ff8c69;';
				return '<b>' + val + '</b>';
			},
			width: 200
		},
		{
			text:'Правильный ответ',
			dataIndex:'RANSWER_TEXT',
			renderer: function(val,metaData)
			{
				metaData.style='background:#98ff98;';
				return '<b>' + val + '</b>';
			},
			width:200
		}
	]
});
var stat_tree=Ext.create('Ext.tree.Panel', 
{
	height:(window.innerHeight/2),
	store:store_tree,
	useArrows:true,
	singleExpand:true,
	rootVisible:false,
	tbar:
	[
		{
			xtype:'progressbar',
			id:'pbar2',
			width:200,
			autoDestroy:false
		}
	],
	columns: 
	[
		{
			xtype: 'treecolumn', //this is so we know which column will show the tree
			text: 'Экзаменуемый',
            sortable: false,
            dataIndex: 'text',
			width: window.innerWidth / 4
        },
		{
            text: 'Балл',
			width: 100,
            dataIndex: 'ball',
            align: 'center'
        },
		{
            text: 'Верных',
			width: 100,
            dataIndex: 'right',
            align: 'center'
        },
		{
            text: 'Неверных',
			width: 100,
            dataIndex: 'wrong',
            align: 'center'
        },
		{
            text: 'Время(мин)',
			width: 100,
            dataIndex: 'time',
            align: 'center'
        },
		{
            text: 'Дата',
			width: 100,
            dataIndex: 'date',
            align: 'center'
        }
	],
	listeners:
	{
		load:function(tree)
		{
			Ext.getCmp('pbar2').reset(true);
		},
		itemclick: function(view, node) 
		{
			if(node.isLeaf()&&node.parentNode.parentNode)
			{
				gWrong.store.load({params : {testid : node.parentNode.internalId, manid:node.internalId, date:stat_tree.getSelectionModel().getSelection()[0].data['date']}});				
			}			
		}
	}
});
/*--------------------------------------------------------------------------*/