/*-------------------------------------------------------------------------------*/

var grid = Ext.create('Ext.grid.Panel',
{
    store: store_at,
   // flex: 1,
	icon: 'icons/finish.ico',
    title: 'Пройденные тесты',
	height:window.innerHeight - 60,
	autoScroll:true,
    id: 'donetests-id',
	viewConfig:
	{
        listeners:
		{
            expandbody:function(rowNode, record, expandRow, eOpts)
			{
				
				/*var arr = new Array();
				arr[0] = 1;
				arr[1] = 2;
				arr[2] = 3;
				testTpl.overwrite(Ext.getCmp('rowid').rowBodyTpl, arr);*/
            }
        }
    },
	columns: 
    [	
		//Ext.create('Ext.grid.RowNumberer'),
        {
            text: 'Название теста',
            id:  'testname',
            dataIndex: 'TEST_NAME',
			width: 300,
            editor: 
			{
                allowBlank: false
            }
        },
        {
            text: 'Комментарии',
            id: 'testdescr',
            dataIndex: 'TEST_DESCR',
			width: 250,
			editor: {
                allowBlank: false
            }
        }
    ],
	plugins: 
	[{
            ptype: 'rowexpander',
			id:'rowid',
            rowBodyTpl:
			[
				'<p>Дата:<b> {TEST_DTTM}</b></p>',
				'<p>Балл:<b> {RESULT}</b></p>',
				'<p>Верных ответов:<b> {ANSWERS_RIGHT}</b></p>',
				'<p>Неверных ответов:<b> {ANSWERS_WRONG}</b></p>'
			]
        }
	],
    collapsible: true,
    animCollapse: true,
	listeners:
	{
		selectionchange: function(sm, selectedRecord)
		{
			/*if (selectedRecord.length) 
			{

			}*/
		}
	}
});

/*-----------------------------------------------------------------------------------------*/
