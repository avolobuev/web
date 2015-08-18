var test_info = [
        '<b>Каким группам назначен: </b>{5}<br/><br/><b>Статистика:</b><br/><br/>',
		'<table style = "font-size: 12px"width = "50%" align = "left" border = "1"><tr align = "center"><td width="30%"><b>Количество вопросов</b></td><td width="30%"><b>Максимум балов за тест</b></td><td width="30%"><b>Время на тест</b></td></tr>',
        '<tr align = "center"><td>{1}</td><td>{2}</td><td>{3} сек. или {4} мин.</td></tr></table><br/>'
    ];
var testTpl = Ext.create('Ext.Template', test_info);
var testDetail = Ext.create('Ext.Panel', 
	{
		id: 'testDetail',
		bodyPadding: 10,
		height:window.innerHeight/2 - 87,
		//frame:true,
		html: 'Выберите тест...'
});

var stat_info = [
		'<p style="padding:10px;font-size:13px;"> Балл полученный за тест: <b> {0} </b></p>',
		'<p style="padding:10px;font-size:13px;"> Правильных ответов: <b> {1} </b></p>',
		'<p style="padding:10px;font-size:13px;"> Неправильных ответов: <b> {2} </b></p>',
		'<p style="padding:10px;font-size:13px;"> Дата: <b> {3} </b></p>',
    ];
var statTpl = Ext.create('Ext.Template', stat_info);

var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 2
    });
/*-------------------------------------------------------------------------------*/

var grid = Ext.create('Ext.grid.Panel',
{
    store: grid_tests,
	autoDestroy:false,
	autoScroll:true,
	height: window.innerHeight/2,
    //flex: 1,
	//icon: 'icons/ready.ico',
    //title: 'Ваши тесты',
    id: 'gridtest-id',
	bbar: 
	[
		{ 
			xtype: 'button',
			id: 'btDelete',
			icon: 'icons/delete.ico',
			text: 'Удалить тест',
			disabled: true,
			handler: function()
			{
				var rows =  grid.getView().getSelectionModel().getSelection()[0];
				Ext.Msg.show({
					title:'Удалить тест',
					msg: 'Вы уверены?',
					buttons: Ext.Msg.YESNO,
					icon: Ext.Msg.QUESTION,
					fn:delete_test
				});
				function delete_test(buttonId)
                {
                    if(buttonId == 'yes')
                    {
						Ext.Ajax.request({
							url: 'php/theme_delete.php?test=' + rows.data['TEST_ID'],
							success: function(response)
							{
								if(response.responseText == 1)
								{
									grid_tests.load();
									//Ext.Msg.alert('Уведомление', 'Тест удален.');
								}
								else 
									Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
							}
						});
                    }
                }
			}
		},
		{ 
			xtype: 'button',
			id: 'btUpdate',
			icon: 'icons/edit.ico',
			text: 'для изменения двойной щелчок по записи',
			disabled: true
		}
	],
	selModel: 
	{
		selType: 'cellmodel'
	},
	plugins: [cellEditing],
	columns: 
    [	
		Ext.create('Ext.grid.RowNumberer'),
        {
            text: 'Название теста',
            id:  'testname',
            dataIndex: 'TEST_NAME',
			width: 300,
            editor: {
                allowBlank: false
            }
        },
        {
            text: 'Комментарии',
            id: 'testdescr',
            dataIndex: 'TEST_DESCR',
			width: 250,
			editor: {
                allowBlank: false
            }
        },
        {
            text: 'Открыт?',
            id: 'topen',
            dataIndex: 'STATUS_FLG',
			width: 100,
			editor: 
			{
                xtype: 'combobox',
                store: stTestStatus,
				displayField: 'data',
				editable: false,
				allowBlank: false,
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
        },
        {
			text: 'Дата создания(обновления)',
            id:  'data',
            dataIndex:'TEST_DTTM',
			width: 200
        }
    ],
	listeners:
	{
		selectionchange: function(sm, selectedRecord)
		{
			if (selectedRecord.length) 
			{
				var ar = new Array();
				ar[0] = selectedRecord[0].data['TEST_NAME'];

				Ext.Ajax.request({
							url: 'php/get_qcount.php?test=' + selectedRecord[0].data['TEST_ID'],
							success: function(response)
							{
									answer = response.responseText.split('_');
									ar[1] = Math.round(answer[1]);
									ar[2] = Math.round(answer[0]);
									ar[3] = Math.round(answer[2]);
									ar[4] = Math.floor(answer[2]/60);
									ar[5] = answer[3];
									//console.log(ar);
									var btDelete = Ext.getCmp('btDelete');
									btDelete.setDisabled(false);
									testTpl.overwrite(testDetail.body, ar);
							}
						});

				
			}
		}
	}
});

/*-----------------------------------------------------------------------------------------*/

var q_grid = Ext.create('Ext.grid.Panel',
{
	store:grid_q,
	autoDestroy:false,
	autoScroll:true,
	height: (window.innerHeight-140),
	title:'Созданные вопросы',
	id:'gridq-id',
	icon:'icons/ready.ico',
	hidden:true,
	columns: 
    [	
		Ext.create('Ext.grid.RowNumberer'),
        {
            text:'Вопрос',
            id:'qname',
            dataIndex: 'QUESTION_TEXT',
			width:300,
			renderer:function(val,metadata,record) 
			{
				metadata.style='cursor:pointer;'
				return val; 
			}
        },
        {
            text:'Комментарии',
            id:'qdescr',
            dataIndex:'QUESTION_DESCR',
			width:250,
			renderer:function(val,metadata,record) 
			{
				metadata.style='cursor: pointer;'
				return val; 
			}
        },
        {
			text:'Количество баллов',
            id:'qballs',
            dataIndex:'QUESTION_PRICE',
			width:110,
			renderer:function(val,metadata,record) 
			{
				metadata.style='cursor: pointer;'
				return val; 
			}
        },
        {
			text:'Время на ответ',
            id:'qtime',
            dataIndex:'QUESTION_TIME',
			width: 100,
			renderer:function(val,metadata,record) 
			{
				metadata.style='cursor: pointer;'
				return val; 
			}
        }
    ],
	listeners:
	{
		selectionchange: function(sm, selectedRecord)
		{
			var btDelete = Ext.getCmp('bqDelete');
			btDelete.setDisabled(false);
			var btUpdate = Ext.getCmp('qb-update');
			btUpdate.setDisabled(false);
			
			if(sm.getCount()!= 0)
			{
				type_combo.setValue(selectedRecord[0].data['QUESTION_TYPE']);
				input_qshort.setValue(selectedRecord[0].data['QUESTION_DESCR']);
				input_qballs.setValue(selectedRecord[0].data['QUESTION_PRICE']);
				input_qtime.setValue(selectedRecord[0].data['QUESTION_TIME']);
				//htmlEditor.reset();htmlEditor.setValue(selectedRecord[0].data['QUESTION_TEXT']);
				Ext.getCmp('htmleditor').setValue(selectedRecord[0].data['QUESTION_TEXT']);
				q_tab.setActiveTab('q-quest-tab');
			}
			
			
		}
	}
});
/*---------------------------------------------------------------------------------------------------------*/
var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
    clicksToMoveEditor: 2,
    autoCancel: false
});
var a_grid = Ext.create('Ext.grid.Panel',
{
	store: grid_a,
	id: 'grida-id',
	hidden: true,
	height:(window.innerHeight - 189),
	autoScroll:true,
	tbar:
	[
		{
			xtype: 'button',
			icon:'icons/add.ico',
			text: 'добавить',
			handler:function()
			{
				var edit=rowEditing;
				edit.cancelEdit();
				grid_a.insert(0,{QUESTION_ID:combo_question2.getValue()});
				var task = new Ext.util.DelayedTask(function()
				{
					a_grid.store.load({params:{qid:combo_question2.getValue()}});
				});
				task.delay(500);
			}
		},
		{
			xtype: 'button',
			id:'ba-delete',
			icon:'icons/delete.ico',
			text: 'удалить',
			disabled:true,
			handler: function()
			{
				var rows =  a_grid.getView().getSelectionModel().getSelection()[0];
				Ext.Msg.show({
					title:'Удалить тест',
					msg: 'Вы уверены?',
					buttons: Ext.Msg.YESNO,
					icon: Ext.Msg.QUESTION,
					fn:delete_answer
				});
				function delete_answer(buttonId)
                {
                    if(buttonId == 'yes')
                    {
						Ext.Ajax.request({
							url: 'php/a_delete.php?answer=' + rows.data['ANSWER_ID'],
							success: function(response)
							{
								if(response.responseText == 1)
								{
									a_grid.store.load({params : {qid : combo_question2.getValue()}});
								}
								else 
									Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
							}
						});
                    }
                }
			}
		},
		{
			xtype: 'button',
			icon:'icons/edit.ico',
			disabled:true,
			text: 'для изменения двойной щелчок по записи'
		}
	],
	selModel: 
	{
		selType: 'rowmodel'
	},
	plugins: 
	[
		Ext.create('Ext.grid.plugin.RowEditing', 
		{
			saveBtnText:'Обновить',
			cancelBtnText:'Отмена',
            clicksToEdit:1
        })
	],
	columns: 
    [	
		Ext.create('Ext.grid.RowNumberer'),
        {
            text: 'Ответ',
            id:  'aname',
            dataIndex: 'ANSWER_TEXT',
			width: 400,
			editor: {
                allowBlank: false
            }
        },
        {
            text: 'Верно?',
            id: 'aright',
            dataIndex: 'ANSWER_RIGHT',
			width: 100,
			editor: {
                xtype: 'combobox',
				id:'answer_right',
                /*typeAhead: true,
                triggerAction: 'all',*/
                //selectOnTab: true,
                store: aright,
				displayField: 'data',
				editable: false,
				allowBlank: false,
                //valueField: 'value',
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }
        }
    ],
	listeners:
	{
		selectionchange: function(sm, selectedRecord)
		{
			Ext.getCmp('ba-delete').setDisabled(false);
		}
	}
});
/*---------------------------------------------------------------------------------------------------------*/

