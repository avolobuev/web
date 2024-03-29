/*-----Выбор теста для прохождения---------------------------------------------------------*/
Ext.define('model_t',
{
	extend:'Ext.data.Model',
	idProperty:'TEST_ID',
	fields: 
	[
		{name:'TEST_ID'},
		{name:'TEST_NAME'},
		{name:'TEST_DESCR'},
		{name:'DTTM'}
	]
});  
var store_t=Ext.create('Ext.data.JsonStore',
{
	model:'model_t',
	autoLoad:false,
	proxy: 
	{
		type:'ajax', 
		url:'php/get_tests.php',
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
/*----------------------------------------------------------------------------*/
Ext.define('model_q',
{
	extend:'Ext.data.Model',
	idProperty:'QUESTION_ID',
	fields: 
	[
		{name:'QUESTION_ID'},
		{name:'QUESTION_TEXT'},
		{name:'QUESTION_PRICE'},
		{name:'QUESTION_TIME'},
		{name:'QUESTION_TYPE'}
	]
});  
var store_q=Ext.create('Ext.data.JsonStore',
{
	model:'model_q',
	autoLoad:false,
	proxy: 
	{
		type:'ajax', 
		url:'php/get_question.php',
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
/*----------------------------------------------------------------------------*/
Ext.define('model_a',
{
	extend:'Ext.data.Model',
	idProperty:'ANSWER_ID',
	fields: 
	[
		{name:'ANSWER_ID'},
		{name:'ANSWER_TEXT'}
	]
});
var store_a=Ext.create('Ext.data.JsonStore',
{
	model:'model_a',
	autoLoad:false,
	proxy: 
	{
		type:'ajax', 
		url:'php/get_answer.php',
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
/*----------------------------------------------------------------------------*/
Ext.define('model_at',
{
	extend:'Ext.data.Model',
	idProperty:'TEST_ID',
	fields: 
	[
		{name:'TEST_ID'},
		{name:'TEST_NAME'},
		{name:'TEST_DESCR'},
		{name:'RESULT'},
		{name:'ANSWERS_WRONG'},
		{name:'ANSWERS_RIGHT'},
		{name:'TEST_DTTM'}
	]
});  
var store_at=Ext.create('Ext.data.JsonStore',
{
	model:'model_at',
	autoLoad:false,
	proxy: 
	{
		type:'ajax', 
		url:'php/get_archieve_tests.php',
		reader: 
		{
			type:'json',
			root:'rows'
		}
	}
});
/*----------------------------------------------------------------------------*/