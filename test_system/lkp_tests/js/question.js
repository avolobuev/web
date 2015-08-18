/*---test---*/
Ext.define('mTestForQuestion',
{
	extend:'Ext.data.Model',
	idProperty:'TEST_ID',
	fields: 
	[
		{name:'TEST_ID'},
		{name:'TEST_NAME'}
	]
});  
var sTestForQuestion=Ext.create('Ext.data.JsonStore',
{
	model:'mTestForQuestion',
	autoLoad:false,
	proxy: 
	{
		type: 'ajax', 
		api:
		{
			read:'php/question/get_test.php'
		},
		reader: 
		{
			type: 'json',
			root: 'rows'
		}
	}
});
/*---question type---*/
var sQType=Ext.create('Ext.data.Store', 
{
	fields: 
	[
		{name:'type'},
		{name:'value'}
	],
	data:
	[
		{
			"type":"Один из...",
			"value":"0"
		},
		{
			"type":"Несколько из...",
			"value":"1"
		}
	]
});
/*---question-------------------------*/
Ext.define('mQuestion',
{
	extend:'Ext.data.Model',
	fields:
	[
		{name:'QUESTION_ID'},
		{name:'QUESTION_TEXT'},
		{name:'QUESTION_DESCR'},
		{name:'QUESTION_PRICE'},
		{name:'QUESTION_TIME'},
		{name:'QUESTION_TYPE'},
		{name:'TEST_ID'}
	]
});  
var sQuestion=Ext.create('Ext.data.JsonStore',
{
	model:'mQuestion',
	autoLoad:false,
	proxy:
	{
		type:'ajax',
		url:'php/question/get_question.php',
		reader:
		{
			type:'json',
			root:'rows'
		}
	}
});
var gQuestion = Ext.create('Ext.grid.Panel',
{
	store:sQuestion,
	autoDestroy:false,
	autoScroll:true,
	height:window.innerHeight - 370,
	margin:5,
	columns: 
    [	
		{
            xtype:'actioncolumn',
            width:30,
			align:'center',
			renderer:function(val,metadata,record) 
			{
				metadata.style='cursor: pointer;'
				return val; 
			},
            items: 
			[	
				{
					icon: 'icons/minus.ico',
					tooltip: 'удалить',
					handler: function(grid,rowIndex,colIndex)
					{
						var rec=grid.getStore().getAt(rowIndex);
						Ext.Ajax.request(
						{
							url: 'php/question/delete.php?qid=' + rec.get('QUESTION_ID'),
							success: function(response)
							{
								if(response.responseText==1)
								{
									grid.getStore().load({params:{test:Ext.getCmp('cQuestionNew2').getValue()}});
								}
								else 
									Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
							}
						});
					}
                }
			]
        },
		Ext.create('Ext.grid.RowNumberer'),
        {
            text:'Вопрос',
            dataIndex:'QUESTION_TEXT',
			flex:2
        },
        {
            text:'Комментарии',
            dataIndex:'QUESTION_DESCR',
			flex:1
        },
        {
			text:'Количество баллов',
            dataIndex:'QUESTION_PRICE',
			width:110,
			flex:1
        },
        {
			text:'Время на ответ',
            dataIndex:'QUESTION_TIME',
			width: 100,
			flex:1
        }
    ],
	listeners:
	{
		selectionchange: function(sm, selectedRecord)
		{
			if(sm.getCount()!= 0)
			{
				Ext.getCmp('cTypeOfQuestion').setValue(selectedRecord[0].data['QUESTION_TYPE']);
				Ext.getCmp('tfQuestionDescr').setValue(selectedRecord[0].data['QUESTION_DESCR']);
				Ext.getCmp('nfQuestionBall').setValue(selectedRecord[0].data['QUESTION_PRICE']);
				Ext.getCmp('nfQuestionTime').setValue(selectedRecord[0].data['QUESTION_TIME']);
				Ext.getCmp('taQuestionArea').setValue(selectedRecord[0].data['QUESTION_TEXT']);
				Ext.getCmp('cQuestionNew').setValue(Ext.getCmp('cQuestionNew2').getValue());
																
			}
		}
	}
});