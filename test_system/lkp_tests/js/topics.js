/*stores and models*/
Ext.define('review', 
{
	extend: 'Ext.data.Model',
	fields: 
	[
		{name:'REVIEW_ID'},
		{name:'DTTM'},
		{name:'MESSAGE'},
		{name:'FIO'}
	],
	idProperty: 'REVIEW_ID'
});
var sReview=Ext.create('Ext.data.JsonStore',
{
	pageSize:15,
	autoLoad:false,
	remoteSort:true,
	model:'review',
	proxy: 
	{
		type:'ajax',
		url: 'php/get_topics.php',
		reader:
		{
			type:'json',
			root:'rows',
			totalProperty:'total'/**/
		}
	}
});
/*-----------------*/
/*-grid with pages-*/
var gReview=Ext.create('Ext.grid.Panel', 
{
	height:window.innerHeight-60,
	store:sReview,
	disableSelection:true,
	loadMask:true,
	columns:
	[
		Ext.create('Ext.grid.RowNumberer'),
		{
			id:'topic',
			text:"Текст",
			dataIndex:'MESSAGE',
			flex: 1,scope:this,
			renderer: function(val,metaData,record)
			{
				metaData.style = 'background:#fffddf;';
				//return '<i>' + val + '<br/></i>';
				return Ext.String.format('<div style="margin:5px;"><img src="icons/comments.ico"/><u style="margin-left:5px;color:navy;">{1}</u></div><div style="font-style:italic;margin:10px;font-size:14px;"> {0} </div>',val,record.get('FIO'));
			},
			sortable: false
		},
		{
			text:"Дата",
			dataIndex:'DTTM',scope:this,
			renderer: function(val,metaData)
			{
				metaData.style = 'background:#badbad;';
				return Ext.String.format('<p style="margin:21px">{0}</p>',val);
			},
			width: 150
		}
	],
	tbar:
	[
		{
			xtype:'button',
			text:'Enter для добавления',
			icon:'icons/comment2.ico',
			disabled:true,
			handler:function()
			{
			}
		},
		{
			xtype:'textfield',
			id:'comment',
			name: 'comment',
			flex:1,
			listeners:
			{
				specialkey:function(field,e)
				{
					if(e.getKey()==e.ENTER)
					{
						var text = Ext.getCmp('comment').getValue();
						if(text.length!=0)
						{
							Ext.Ajax.request({
								url: 'php/insert_comment.php?text=' + text,
								success: function(response)
								{
									if(response.responseText == 1)
									{
										gReview.store.loadPage(1);
										Ext.getCmp('comment').reset();
									}
									else
									{
										Ext.Msg.alert('Предупреждение','Ошибка! Попробуйте снова.');
									}
								}
							});
						}
					}
				}
			}
		}
	],
	bbar: Ext.create('Ext.PagingToolbar', 
	{
		store: sReview,
		displayInfo:true,
		beforePageText:'Страница',
		afterPageText:'из {0}',
		displayMsg:'Отображаются {0} - {1} из {2}'
	})
});

/*-----------------*/