/**************Tabs****************************************************/
var tab_tests = Ext.create('Ext.tab.Panel', 
{
    height: (window.innerHeight - 60),
	autoDestroy:false,
	id:'theme-tab',
	name:'theme-tab',
    items: 
	[
		{
			title: 'Новый',
			id: 'new-test-tab',
			icon:'icons/add2.ico',
			tooltip: 'Создать новый тест',
			items:
			[
				//combo_subjects,
				//fac_combo,
				input_theme_name,
				textarea_theme_description,
				{
					xtype:'button',
					text:'Создать тест',
					width:100,
					margin:10,
					icon:'icons/create.ico',
					handler:function()
					{
						var post_string='name='+input_theme_name.getValue()+'&descr='+textarea_theme_description.getValue()/*+'&couid='+combo_subjects.getValue()*/;
						Ext.Ajax.request(
						{
							url:'php/theme_insert.php?'+post_string,
							success:function(response)
							{
								if(response.responseText == 1)
								{	
									//combo_subjects.clearValue();
									input_theme_name.setValue('');
									textarea_theme_description.setValue('');
									grid.store.load();
								}
								else
								{
									Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
								}	
							}
						});
					}
				}
			]
		},
		{
			title: 'Созданные',
			id: 'existed-test-tab',
			icon:'icons/ok2.ico',
			tooltip: 'Уже имеющиеся тесты',
			items:
			[
				grid,testDetail
			]
		},
		{
			title: 'Характеристики',
			icon: 'icons/write.ico',
			tooltip: 'Характеристики',
			listeners:
			{
				beforerender:function()
				{
					
				}
			},
			items:
			[
				cTestForChar,gTestChar
			]
		}
	]
});
/*--------------------------------------------------------------------------*/
var q_tab = Ext.create('Ext.tab.Panel', {
	frame:true,
	autoDestroy:false,
	id: 'q-tab',
	name: 'q-tab',
	listeners:
	{
		removed:function(tab)
		{
			Ext.getCmp('q-quest-tab').setDisabled(true);
			this.setActiveTab('q-test-tab');
			combo_tests.clearValue();
			//Ext.getCmp('q-quest-tab').removeAll(false);
			//q_grid.removeAll(false);
			//htmlEditor.clearValue();
			//htmlEditor.setValue('пусто');
			//htmlEditor.updateLayout();
			//htmlEditor.reset();
			q_grid.setVisible(false);
			//console.log('destroyed');
			//tab.doLayout();
		}
	},
    items: 
	[
		{
			title: 'Тест',
			id: 'q-test-tab',
			//autoDestroy:false,
			items:
			[
				combo_tests, q_grid
			]
		},
		{
			title: 'Вопрос',
			id: 'q-quest-tab',
			//autoDestroy:false,
			disabled:true,
			tbar:
			[
				type_combo, input_qshort, input_qballs, input_qtime/*,htmlEditor*/
				
			],
			bbar:
			[
				{
					xtype: 'button',
					id: 'qb-create',
					width: 80,
					icon:'icons/add2.ico',
					text: 'Создать',
					handler:function()
					{
						var rParams = 'test=' + combo_tests.getValue() + '&qtype=' + type_combo.getValue() + '&qdescr=' + input_qshort.getValue() + '&qball=' + input_qballs.getValue() + '&qtime=' + input_qtime.getValue() + '&qtext=' + htmlEditor.getValue();/*Ext.getCmp('htmlEditor').getValue()*/
						//console.log(rParams);
						Ext.Ajax.request({
							url: 'php/q_insert.php?' + rParams,
							success: function(response)
							{
								if(response.responseText == 1)
								{	
									//Ext.Msg.alert('Уведомление', 'Вопрос успешно создан.');
									q_grid.store.load({params : {test : combo_tests.getValue()}});
									q_tab.setActiveTab('q-test-tab');
								}
								else 
									Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
							}
						});
					}
				},
				{
					xtype: 'button',
					id: 'qb-update',
					disabled:true,
					width: 80,
					icon:'icons/update3.ico',
					text: 'Обновить',
					handler:function()
					{
						var rows =  q_grid.getView().getSelectionModel().getSelection();
						var rParams = 'test=' + combo_tests.getValue() + '&qtype=' + type_combo.getValue() + '&qdescr=' + input_qshort.getValue() + '&qball=' + input_qballs.getValue() + '&qtime=' + input_qtime.getValue() + '&qtext=' + htmlEditor.getValue() + '&qid=' + rows[0].data['QUESTION_ID'];/*Ext.getCmp('htmlEditor').getValue()*/
						//console.log(rParams);
						Ext.Ajax.request({
							url: 'php/q_update.php?' + rParams,
							success: function(response)
							{
								if(response.responseText == 1)
								{	
									//Ext.Msg.alert('Уведомление', 'Вопрос успешно обновлен.');
									q_grid.store.load({params : {test : combo_tests.getValue()}});
									q_tab.setActiveTab('q-test-tab');
								}
								else 
									Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
							}
						});
					}
				},
				{ 
					xtype: 'button',
					id: 'bqDelete',
					icon: 'icons/delete.ico',
					text: 'Удалить',
					disabled: true,
					handler: function()
					{
						var rows =  q_grid.getView().getSelectionModel().getSelection();
						var rParams = 'qid=' + rows[0].data['QUESTION_ID'];
						Ext.Ajax.request({
							url: 'php/q_delete.php?' + rParams,
							success: function(response)
							{
								if(response.responseText == 1)
								{	
									//Ext.Msg.alert('Уведомление', 'Вопрос успешно удален.');
									q_grid.store.load({params : {test : combo_tests.getValue()}});
									q_tab.setActiveTab('q-test-tab');
									//q_grid.getView().getSelectionModel().deselectAll();
								}
								else 
									Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
							}
						});
					}
				}
				
			],
			items:
			[
				htmlEditor
			]
		}
	]
});
/*--------------------------------------------------------------------------*/










