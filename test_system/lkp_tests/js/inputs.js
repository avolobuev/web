/*----------------------------------------------------------------------------*/
var input_theme_name=Ext.create('Ext.form.Text', 
{
	id:'theme-name',
	name:'theme-name',
	fieldLabel:'Название темы',
	labelWidth:130,
	emptyText:'- введите название -',
	submitEmptyText:false,
	inputWidth:400,
	margin: 10
});
var textarea_theme_description=Ext.create('Ext.form.TextArea',
{
	id:'theme-descr',
	name:'theme-descr',
	fieldLabel:'Описание темы',
	labelWidth:130,
	inputWidth:400,
	grow:true,
	margin:10
});
/*var htmlEditor = Ext.create('Ext.form.field.HtmlEditor', {
	id: 'htmleditor',
	name: 'htmleditor',
	autoDestroy:false,
    width: 500,
	//flex:1,
	height: 250,
	defaultValue: 'пусто',
	trackResetOnLoad:true,
	enableAlignments:false,
	enableLinks:false,
	enableLists:false,
	enableSourceEdit:false
});*/
var htmlEditor=Ext.create('Ext.form.field.TextArea', 
{
	id:'htmleditor',
	name:'htmleditor',
	autoDestroy:false,
	width:500,
	height:250,
	defaultValue:'пусто',
	margin:5
});
var input_qshort=Ext.create('Ext.form.Text', 
{
	id:'q-short',
	name:'q-short',
	fieldLabel:'Название вопроса',
	labelWidth:110,
	emptyText:'- введите название -',
	submitEmptyText:false,
	inputWidth:180,
	margin: 10
});
var input_qballs = Ext.create('Ext.form.field.Number', 
{
	id:'q-ball',
	name:'q-ball',
	fieldLabel:'Количество баллов',
	labelWidth:110,
	inputWidth:100,
	step:0.1,
	value:0.1,
	maxValue:10,
	minValue:0.1,
	margin:10
});
var input_qtime=Ext.create('Ext.form.field.Number', 
{
	id:'q-time',
	name:'q-time',
	fieldLabel:'Время на ответ',
	labelWidth:110,
	inputWidth:100,
	step:1,
	value:10,
	maxValue:540,
	minValue:10,
	margin:10
});
/*----------------------------------------------------------------------------*/