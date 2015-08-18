Ext.onReady(
function() 
{
	Ext.create('Ext.data.Store', 
	{
		storeId:'simpsonsStore',
		fields:['name', 'email', 'phone'],
		data:
		{
			'items':
			[
				{ 
					'name': 'Lisa',  
					"email":"lisa@simpsons.com",  
					"phone":"555-111-1224"  
				},
				{ 
					'name': 'Bart',  
					"email":"bart@simpsons.com",  
					"phone":"555-222-1234" 
				},
				{ 
					'name': 'Homer', 
					"email":"home@simpsons.com",  
					"phone":"555-222-1244"  
				},
				{ 
					'name': 'Marge', 
					"email":"marge@simpsons.com", 
					"phone":"555-222-1254"  
				}
			]
		},
		proxy: {
			type: 'memory',
			reader: 
			{
				type: 'json',
				root: 'items'
			},
			writer: 
			{
				type: 'json',
				root: 'items'
			}
		}
	});
	Ext.create('Ext.grid.Panel', 
	{
		title: 'Simpsons',
		store: Ext.data.StoreManager.lookup('simpsonsStore'),
		dockedItems: 
		[
			{
                xtype: 'toolbar',
                items: 
				[
					{
						icon: 'icons/add.ico',
						text: 'Add',
						scope: this,
						handler: function()
						{
							/*var rec = new Writer.Person({
								first: '',
								last: '',
								email: ''
							});*/
							//edit.cancelEdit();
							Ext.data.StoreManager.lookup('simpsonsStore').insert(0, {name:'A',email:'a@mail.ru',phone:'123-456'});
							/*edit.startEditByPosition({
								row: 0,
								column: 1
							});*/
						}
					}, 
					{
						icon: 'icons/minus.ico',
						text: 'Delete',
						disabled: true,
						itemId: 'delete',
						scope: this,
						handler: function()
						{
						}
					}
				]
			}
		],
		columns: 
		[
			{ 
				text: 'Name',  
				dataIndex: 'name' 
			},
			{ 
				text: 'Email', 
				dataIndex: 'email', 
				flex: 1 
			},
			{ 
				text: 'Phone', 
				dataIndex: 'phone' 
			}
		],
		height: window.innerHeight,
		width: window.innerWidth,
		renderTo: Ext.getBody()
	});
});