/*----------------------------------------------------------------------------*/
var combo_tests=Ext.create('Ext.form.ComboBox', 
{
	id:'test-id',
	name:'test-id',
	store:store_t,
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
			Ext.getCmp('bStart').setDisabled(true);
			Ext.Ajax.request({
				url:'php/get_checking.php?testid='+this.value,
				success:function(response)
				{
					if(response.responseText==1)
					{
						Ext.getCmp('bStart').setDisabled(false);
					}
					else
					{
						Ext.Msg.alert('Уведомление!','Вы не можете пройти этот тест, т.к. уже прошли его и получили оценку! Выберите другой тест.');
						Ext.getCmp('time').setValue('-:-');
					}
				}
			});
			store_q.load({params:{testid:this.value}});
			Ext.Ajax.request({
				url: 'php/get_testtime.php?test='+combo.getValue(),
				success: function(response)
				{
					Ext.getCmp('time').setValue(Math.round(response.responseText/60));
				}
			});
		}
	}
});
/*----------------------------------------------------------------------------*/