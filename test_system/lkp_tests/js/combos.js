/*----------------------------------------------------------------------------*/
// предметы из базы, для данной кафедры
var combo_subjects = Ext.create('Ext.form.ComboBox', 
{
	id:'couid',
	name:'couid',
	store:subjects_store,
	displayField:'COUNAME',
	valueField:'COUID',
	fieldLabel:'Выберите предмет',
	labelWidth:130,
	inputWidth:400,
	emptyText:'- предмет -',
	submitEmptyText:false,
	editable:false,
	margin:10
});
/*----------------------------------------------------------------------------*/
var type_combo=Ext.create('Ext.form.ComboBox', 
{
	id:'type',
	name:'type',
	store:qtype,
	displayField:'type',
	valueField:'value',
	fieldLabel:'Тип вопроса',
	labelWidth:110,
	inputWidth:180,
	emptyText:'- тип -',
	submitEmptyText:false,
	editable:false,
	margin: 10
});
/*----------------------------------------------------------------------------*/
var combo_tests=Ext.create('Ext.form.ComboBox', 
{
	id:'c-test-id',
	name:'c-test-id',
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
			q_grid.store.load({params:{test:this.value}});
			q_grid.setVisible(true);
			Ext.getCmp('q-quest-tab').setDisabled(false);
		}
	}
});
var combo_tests2=Ext.create('Ext.form.ComboBox', 
{
	id:'c2-test-id',
	name:'c2-test-id',
	store:sTests,
	displayField: 'TEST_NAME',
	valueField: 'TEST_ID',
	fieldLabel:'Выберите тест',
	labelWidth:100,
	inputWidth:240,
	emptyText:'- тест -',
	submitEmptyText:false,
	editable:false,
	margin:10,
	listeners:
	{
		select: function(combo,records,eOpts)
		{
			grid_q.load({params:{test:this.value}});
			combo_question.clearValue();
			combo_question.setDisabled(false);
		}
	}
});

var combo_tests3=Ext.create('Ext.form.ComboBox',// for answers 
{
	id:'c3-test-id',
	name:'c3-test-id',
	store:sTests,
	displayField:'TEST_NAME',
	valueField:'TEST_ID',
	fieldLabel:'Выберите тест',
	labelWidth:100,
	inputWidth:240,
	emptyText:'- тест -',
	submitEmptyText:false,
	editable:false,
	margin: 10,
	listeners:
	{
		select:function(combo,records,eOpts)
		{
			a_grid.setVisible(false);
			grid_q.load({params:{test:this.value}});
			combo_question2.clearValue();
			combo_question2.setDisabled(false);
			Ext.getCmp('qtextpanel').update('<i>Выберите вопрос...</i>');
		}
	}
});

var combo_question=Ext.create('Ext.form.ComboBox', // for media data
{
	id: 'c-q-id',
	name:'c-q-id',
	store: grid_q,
	displayField:'QUESTION_DESCR',
	valueField:'QUESTION_ID',
	fieldLabel:'Вопрос ',
	labelWidth:100,
	inputWidth:240,
	queryMode:'local',
	disabled:true,
	emptyText:'- выберите вопрос -',
	submitEmptyText:false,
	editable:false,
	margin:10,
	listeners:
	{
		select: function(combo, records, eOpts)
		{
			Ext.getCmp('userfile').setVisible(true);
			Ext.getCmp('userb').setDisabled(false);
		}
	}
});
var combo_question2=Ext.create('Ext.form.ComboBox', // for answers
{
	store:grid_q,
	displayField:'QUESTION_DESCR',
	valueField:'QUESTION_ID',
	fieldLabel:'Вопрос ',
	labelWidth:100,
	inputWidth:240,
	queryMode:'local',
	disabled:true,
	emptyText:'- выберите вопрос -',
	submitEmptyText:false,
	editable:false,
	margin:10,
	listeners:
	{
		select: function(combo,records,eOpts)
		{
			a_grid.store.load({params:{qid:this.value}});
			a_grid.setVisible(true);
			Ext.Ajax.request({
				url:'php/get_questiontext.php?qid='+combo.getValue(),
				success:function(response)
				{
					Ext.getCmp('qtextpanel').update('<b><i>' + response.responseText + '</i></b>');
				}
			});
		}
	}
});
/*----------------------------------------------------------------------------*/