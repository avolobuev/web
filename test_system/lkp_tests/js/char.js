/*---char---*/
Ext.define('char',
{
	extend:'Ext.data.Model',
	idProperty:'CHAR_TYPE_CD',
	fields: 
	[
		{name:'CHAR_TYPE_CD'},
		{name:'CHAR_DESCR'},
		{name:'CHAR_DTTM'}
	]
});  
var sChar=Ext.create('Ext.data.JsonStore',
{
	model:'char',
	autoLoad:false,
	proxy: 
	{
		type: 'ajax', 
		api:
		{
			read:'php/char/get_char.php'
		},
		reader: 
		{
			type: 'json',
			root: 'rows'
		}
	}
});
/*---object---*/
Ext.define('object',
{
	extend:'Ext.data.Model',
	idProperty:'OBJECT_ID',
	fields: 
	[
		{name:'OBJECT_ID'},
		{name:'OBJECT_NAME'}
	]
});  
var sObject=Ext.create('Ext.data.JsonStore',
{
	model:'object',
	autoLoad:false,
	proxy: 
	{
		type: 'ajax', 
		api:
		{
			read:'php/char/get_object.php'
		},
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
/*-----------------------------------------*/
Ext.define('mChar',
{
	extend:'Ext.data.Model',
	fields: 
	[
		{name:'CHAR_TYPE_CD'},
		{name:'CHAR_DESCR'},
		{name:'OBJECTS'}
	]
});  
var sChar2=Ext.create('Ext.data.JsonStore',
{
	model:'mChar',
	autoLoad:false,
	proxy: 
	{
		type: 'ajax', 
		api:
		{
			read:'php/char/get_char2.php'
		},
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
var gChar = Ext.create('Ext.grid.Panel',
{
	store:sChar2,
	autoDestroy:false,
	autoScroll:true,
	height: window.innerHeight - 275,
	margin: 5,
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
					icon: 'icons/minus.ico',
					tooltip: 'удалить',
					handler: function(grid,rowIndex,colIndex)
					{
						var rec=grid.getStore().getAt(rowIndex);
						Ext.Ajax.request(
						{
							url: 'php/char/delete.php?cd=' + rec.get('CHAR_TYPE_CD'),
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
            dataIndex:'CHAR_TYPE_CD',
			width:100
        },
        {
            text:'Описание',
            dataIndex:'CHAR_DESCR',
			width:300
        },
        {
			text:'Объекты',
            dataIndex:'OBJECTS',
			width:200
        }
    ],
	listeners:
	{
		selectionchange: function(sm, selectedRecord)
		{
			if(sm.getCount()!= 0)
			{
				Ext.getCmp('char_type_cd').setValue(selectedRecord[0].data['CHAR_TYPE_CD']);
				Ext.getCmp('char_descr').setValue(selectedRecord[0].data['CHAR_DESCR']);
			}
		}
	}
});