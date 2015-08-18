/*---first test---*/
Ext.define('first_test',
{
	extend:'Ext.data.Model',
	idProperty:'TEST_ID',
	fields: 
	[
		{name:'TEST_ID'},
		{name:'TEST_NAME'}
	]
});  
var first_test=Ext.create('Ext.data.JsonStore',
{
	model:'first_test',
	autoLoad:false,
	proxy: 
	{
		type: 'ajax', 
		api:
		{
			read:'php/get_foritem.php'
		},
		reader: 
		{
			type: 'json',
			root: 'rows'
		}
	}
});
var f_test=Ext.create('Ext.form.ComboBox', 
{
	id:'first-test-id',
	name:'first-test-id',
	store: first_test,
	displayField:'TEST_NAME',
	valueField:'TEST_ID',
	inputWidth:300,
	emptyText:'- тест -',
	submitEmptyText:false,
	editable:false,
	autoDestroy:false,
	margin:10,
	listeners:
	{
		select: function(combo,records,eOpts)
		{
			Ext.getCmp('first_qm').setDisabled(false);
			first_store.load({params:{test:combo.value}});
		}
	}
});
/*---second test---*/
Ext.define('second_test',
{
	extend:'Ext.data.Model',
	idProperty:'TEST_ID',
	fields: 
	[
		{name:'TEST_ID'},
		{name:'TEST_NAME'}
	]
});  
var second_test=Ext.create('Ext.data.JsonStore',
{
	model:'second_test',
	autoLoad:false,
	proxy: 
	{
		type: 'ajax', 
		api:
		{
			read:'php/get_foritem.php'
		},
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
var s_test=Ext.create('Ext.form.ComboBox', 
{
	id:'sec-test-id',
	name:'sec-test-id',
	store:second_test,
	displayField:'TEST_NAME',
	valueField:'TEST_ID',
	inputWidth:300,
	emptyText:'- тест -',
	submitEmptyText:false,
	editable:false,
	autoDestroy:false,
	margin:10,
	listeners:
	{
		select:function(combo,records,eOpts)
		{
			Ext.getCmp('second_qm').setDisabled(false);
			second_store.load({params:{test:combo.value}});
		}
	}
});
/*-----------------------------------------*/
Ext.define('first_q',
{
	extend:'Ext.data.Model',
	fields:
	[
		{name:'QUESTION_ID'},
		{name:'QUESTION_DESCR'}
	]
});  

var first_store=Ext.create('Ext.data.JsonStore',
{
	model:'first_q',
	autoLoad:false,
	proxy: 
	{
		type: 'ajax',
		url: 'php/get_qfirst.php',
		reader: 
		{
			type: 'json',
			root: 'rows'
		}
	}
});
/*-----------------------------------------*/
Ext.define('second_q',
{
	extend:'Ext.data.Model',
	fields:
	[
		{name:'QUESTION_ID'},
		{name:'QUESTION_DESCR'}
	]
});  

var second_store=Ext.create('Ext.data.JsonStore',
{
	model:'second_q',
	autoLoad:false,
	autoSync:true,
	proxy: 
	{
		type:'ajax',
		url:'php/get_qsecond.php',
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
/*-----------------------------------------*/
var copy_form=Ext.create('Ext.form.Panel', 
{
		id:'copy_cut',
		name:'copy_cut',
		autoDestroy:false,
		height:(window.innerHeight - 60),
		layout:
		{
			type:'table',
			columns:2
		},
        items: 
		[	
			f_test,
			s_test,
			{
				xtype: 'multiselect',
				width: 300,
				height:200,
				margin:10,
				fieldLabel:'откуда',
				labelAlign:'top',
				labelSeparator:'',
				labelStyle:'font-style:italic;color:gray;',
				name:'first_qm',
				id:'first_qm',
				disabled:true,
				store:first_store,
				queryMode:'local',
				displayField:'QUESTION_DESCR',
				valueField:'QUESTION_ID',
				ddReorder:true,
				dragGroup: 'dnd'/*,
				dropGroup: 'dnd'*/
			},
			{
				xtype:'multiselect',
				width:300,
				height:200,
				margin:10,
				name:'second_qm',
				id:'second_qm',
				disabled:true,
				fieldLabel:'куда',
				labelAlign:'top',
				labelSeparator:'',
				labelStyle:'font-style:italic;color:gray;',
				store:second_store,
				queryMode:'local',
				displayField:'QUESTION_DESCR',
				valueField:'QUESTION_ID',
				ddReorder:true,
				//dragGroup: 'dnd',
				dropGroup: 'dnd',
				appendOnly:true,
				listeners:
				{
					change:function(right, newValue, oldValue, eOpts)
					{
						if(newValue.length!=0)
						{
							if(s_test.getValue()==f_test.getValue())
							{
								Ext.Msg.alert('Предупреждение','Вы не можете добавить в тест уже существующий в нем вопрос.');
								right.store.load({params:{test:s_test.getValue()}});
								Ext.getCmp('first_qm').store.load({params:{test:f_test.getValue()}});
							}
							else
							{
									Ext.Ajax.request({
									url:'php/dd_question.php?qid='+newValue+'&second_test=' + s_test.getValue(),
									success: function(response)
									{
										if(response.responseText==1)
										{
											Ext.getCmp('first_qm').store.load({params:{test:f_test.getValue()}});
											right.store.load({params:{test:s_test.getValue()}});
										}
										else if(response.responseText == 0) 
										{
											Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
										}
										else
										{
											
										}
									}
									});
								
							}
							
						}
						
					}
				}
			}
		]
});
/*-----------------------------------------*/