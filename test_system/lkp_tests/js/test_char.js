var cTestForChar=Ext.create('Ext.form.ComboBox', 
{
	store:sTests,
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
			test_id = combo.getValue();
			gTestChar.store.load({params:{test:combo.getValue()}});
			sTestCharCombo.load();
			gTestChar.setVisible(true);
		}
	}
});

/*---char---*/
Ext.define('mTestCharCombo',
{
	extend:'Ext.data.Model',
	fields: 
	[
		{name:'CHAR_TYPE_CD'},
		{name:'CHAR_DESCR'}
	]
});  
var sTestCharCombo=Ext.create('Ext.data.JsonStore',
{
	model:'mTestCharCombo',
	autoLoad:false,
	proxy: 
	{
		type: 'ajax', 
		url:'php/test_char/get_char.php',
		reader: 
		{
			type: 'json',
			root: 'rows'
		}
	}
});
Ext.define('mTestCharGrid',
{
	extend:'Ext.data.Model',
	fields: 
	[
		{name:'CHAR_TYPE_CD'},
		{name:'CHAR_DESCR'},
		{name:'CHAR_VAL'}
	]
});  
var sTestCharGrid=Ext.create('Ext.data.JsonStore',
{
	model:'mTestCharGrid',
	autoLoad:false,
	proxy: 
	{
		type: 'ajax', 
		url:'php/test_char/get_char2.php',
		reader: 
		{
			type: 'json',
			root: 'rows'
		},
		writer:
		{
			type: 'json',
			root: 'rows'
		}
	}
});
var gTestChar = Ext.create('Ext.grid.Panel',
{
	store:sTestCharGrid,
	autoDestroy:false,
	autoScroll:true,
	height: (window.innerHeight - 135),
	margin: 5,
	hidden:true,
	selModel: 
	{
		selType: 'rowmodel'
	},
	plugins:
	[
		Ext.create('Ext.grid.plugin.RowEditing', 
		{
			saveBtnText: 'Обновить',
			cancelBtnText: 'Отмена',
            clicksToEdit: 2,
			errorSummary: false,
			pluginId:'rowplugin',
			listeners:
			{
				edit:function(ed,context,eOpts)
				{
					var rows = gTestChar.getView().getSelectionModel().getSelection();
					var new_cd = context.newValues['CHAR_DESCR'].substr(0,context.newValues['CHAR_DESCR'].indexOf("("));
					var rParams = 'tid=' + cTestForChar.getValue() + '&cd=' + new_cd + '&val=' + rows[0].data['CHAR_VAL'];
					
					Ext.Ajax.request(
					{
						url: 'php/test_char/update.php?' + rParams,
						success: function(response)
						{
							if(response.responseText == 1)
							{	
								gTestChar.store.load({params:{test:cTestForChar.getValue()}});
							}
							else 
								Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
						}
					});
				}
			}
        })
	],
	columns: 
    [	
		{
			xtype:'actioncolumn',
            width:50,
			align:'center',
			renderer:function(val,metadata,record) 
			{
				metadata.style='cursor: pointer;'
				return val; 
			},
            items: 
			[	
				{
					icon: 'icons/add.ico',
					tooltip: 'добавить',
					handler: function(grid,rowIndex,colIndex)
					{
					    grid.store.insert(rowIndex+1,{CHAR_TYPE_CD:'',CHAR_DESCR:'',CHAR_VAL:'',TESTID:cTestForChar.getValue()});
						gTestChar.getPlugin('rowplugin').startEdit(rowIndex+1,2);
					}
                }
			]
		},
		{
            xtype:'actioncolumn',
            width:50,
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
							url: 'php/test_char/delete.php?cd=' + rec.get('CHAR_TYPE_CD') + '&tid=' + cTestForChar.getValue(),
							success: function(response)
							{
								if(response.responseText==1)
								{
									grid.getStore().load();
								}
								else 
									Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
							}
						});
					}
                }
			]
        },
        {
            text:'ID',
            dataIndex:'CHAR_DESCR',
			flex:1,
			editor: 
			{
                xtype: 'combobox',
				id: 'cTestChar',
                store: sTestCharCombo,
				displayField:'CHAR_DESCR',
				editable: false,
				allowBlank: true,
                //valueField: 'CHAR_TYPE_CD',
                lazyRender: true,
				queryMode:'local',
                listClass: 'x-combo-list-small'
            }
        },
        {
            text:'Значение',
            dataIndex:'CHAR_VAL',
			flex:3,
			editor: 
			{
                allowBlank: true
            }
        }
    ],
	listeners:
	{
		selectionchange: function(sm, selectedRecord)
		{
			if(sm.getCount()!= 0)
			{
				/*Ext.getCmp('char_type_cd').setValue(selectedRecord[0].data['CHAR_TYPE_CD']);*/
			}
		}
	}
});