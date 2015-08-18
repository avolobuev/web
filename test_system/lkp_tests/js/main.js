Ext.onReady(
function() 
{
Ext.QuickTips.init(); Ext.tip.QuickTipManager.init();   
//setup the state provider, all state information will be saved to a cookie
Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
/******************************************************************************/
var body=Ext.getBody();
/*************Menu********************************************************/
var menu=Ext.create('Ext.menu.Menu', 
{
    margin:'0 0 0 0',
    padding:'0 0 0 0',
    plain:true,
    floating:false, 
    frame:true,
    items: 
    [
        {
            text: 'Создание теста',
            icon:'images/right.ico',
            handler:function()
            {
				var main_content = Ext.getCmp('central-region-content');
				Ext.getCmp('center-region').setTitle('Тесты');
				main_content.removeAll(false);
				main_content.add(
					[
						tab_tests
					]
				);
				grid_tests.load();
            }   
                
        },
		{
            text:'Создание вопросов',
            icon:'images/right.ico',
            handler:function()
            {
                var main_content = Ext.getCmp('central-region-content');
				Ext.getCmp('center-region').setTitle('Вопросы');
				main_content.removeAll(false);
				main_content.add(
					[
						{
							xtype:'fieldset',
							title:'Добавить, изменить вопрос',
							collapsible:true,
							//defaults:{anchor: '100%'},
							layout:'anchor',
							items :
							[
								{
									xtype:'combo',
									id:'cQuestionNew',
									name:'cQuestionNew',
									fieldLabel:'Тест',
									store:sTestForQuestion,
									displayField:'TEST_NAME',
									valueField:'TEST_ID',
									emptyText:'- тест -',
									submitEmptyText:false,
									editable:false,
									autoDestroy:false,
									anchor: '100%'
								},
								{
									xtype: 'textfield',
									fieldLabel: 'Описание',
									id: 'tfQuestionDescr',
									anchor: '100%'
								}, 
								{
									xtype: 'textarea',
									fieldLabel: 'Вопрос',
									id: 'taQuestionArea',
									anchor: '100%'
								},
								{
									xtype:'combo',
									id:'cTypeOfQuestion',
									name:'cTypeOfQuestion',
									store:sQType,
									displayField:'type',
									valueField:'value',
									fieldLabel:'Тип вопроса',
									emptyText:'- тип -',
									submitEmptyText:false,
									editable:false,
									anchor: '100%'
								},
								{
									xtype:'numberfield',
									id:'nfQuestionBall',
									name:'nfQuestionBall',
									fieldLabel:'Кол-во баллов',
									step:1,
									value:1,
									maxValue:100,
									minValue:1
								},
								{
									xtype:'numberfield',
									id:'nfQuestionTime',
									name:'nfQuestionTime',
									fieldLabel:'Время на ответ',
									step:1,
									value:10,
									maxValue:540,
									minValue:10
								},
								{
									xtype: 'splitbutton',
									text: 'Сохранить',
									anchor: '15%',
									margin: '0 0 5 0',
									handler: function()
									{
										/*var post_string='cd='+Ext.getCmp('char_type_cd').getValue()+'&descr='+Ext.getCmp('char_descr').getValue()+'&objects='+Ext.getCmp('object_char').getValue();
										//console.log(post_string);
										Ext.Ajax.request(
										{
											url:'php/char/insert.php?'+post_string,
											success:function(response)
											{
												if(response.responseText == 1)
												{	
													Ext.getCmp('object_char').clearValue();
													Ext.getCmp('char_type_cd').setValue('');
													Ext.getCmp('char_descr').setValue('');
													gChar.store.load();
												}
												else
												{
													Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
												}	
											}
										});*/
									},
									menu: new Ext.menu.Menu({
										items: 
										[
											{
												text: 'Создать',
												handler: function()
												{ 
													var rParams = 'test=' + Ext.getCmp('cQuestionNew').getValue() + 
													'&qtype=' + Ext.getCmp('cTypeOfQuestion').getValue() + 
													'&qdescr=' + Ext.getCmp('tfQuestionDescr').getValue() + 
													'&qball=' + Ext.getCmp('nfQuestionBall').getValue() + 
													'&qtime=' + Ext.getCmp('nfQuestionTime').getValue() + 
													'&qtext=' + Ext.getCmp('taQuestionArea').getValue();
													Ext.Ajax.request({
														url: 'php/question/insert.php?' + rParams,
														success: function(response)
														{
															if(response.responseText == 1)
															{	
																Ext.getCmp('cTypeOfQuestion').clearValue();
																Ext.getCmp('tfQuestionDescr').setValue('');
																Ext.getCmp('nfQuestionBall').setValue(1);
																Ext.getCmp('nfQuestionTime').setValue(10);
																Ext.getCmp('taQuestionArea').setValue('');
																Ext.getCmp('cQuestionNew2').setValue(Ext.getCmp('cQuestionNew').getValue());
																gQuestion.store.load({params:{test:Ext.getCmp('cQuestionNew').getValue()}});
																Ext.getCmp('cQuestionNew').clearValue();
															}
															else 
																Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
														}
													}); 
												}
											},
											{
												text: 'Обновить',
												handler: function()
												{ 
													var rows =  gQuestion.getView().getSelectionModel().getSelection();
													var rParams = 'test=' + Ext.getCmp('cQuestionNew').getValue() + 
													'&qtype=' + Ext.getCmp('cTypeOfQuestion').getValue() + 
													'&qdescr=' + Ext.getCmp('tfQuestionDescr').getValue() + 
													'&qball=' + Ext.getCmp('nfQuestionBall').getValue() + 
													'&qtime=' + Ext.getCmp('nfQuestionTime').getValue() + 
													'&qtext=' + Ext.getCmp('taQuestionArea').getValue() + 
													'&qid=' + rows[0].data['QUESTION_ID'];
													Ext.Ajax.request({
														url: 'php/question/update.php?' + rParams,
														success: function(response)
														{
															if(response.responseText == 1)
															{	
																Ext.getCmp('cTypeOfQuestion').clearValue();
																Ext.getCmp('tfQuestionDescr').setValue('');
																Ext.getCmp('nfQuestionBall').setValue(1);
																Ext.getCmp('nfQuestionTime').setValue(10);
																Ext.getCmp('taQuestionArea').setValue('');
																Ext.getCmp('cQuestionNew2').setValue(Ext.getCmp('cQuestionNew').getValue());
																gQuestion.store.load({params:{test:Ext.getCmp('cQuestionNew').getValue()}});
																Ext.getCmp('cQuestionNew').clearValue();
															}
															else 
																Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
														}
													});  
												}
											}
										]
									})
								}
							]
						}, 
						{
							xtype: 'fieldset',
							title: 'Созданные вопросы',
							//checkboxToggle: true,
							collapsible: true,
							collapsed:true,	
							layout: 'anchor',
							listeners:
							{
								expand:function()
								{
									//gQuestion.store.load({params:{test:Ext.getCmp('cQuestionNew').getValue()}});
								}
							},
							items:
							[
								{
									xtype:'combo',
									id:'cQuestionNew2',
									name:'cQuestionNew2',
									fieldLabel:'Выберите тест',
									store:sTestForQuestion,
									displayField:'TEST_NAME',
									valueField:'TEST_ID',
									emptyText:'- тест -',
									submitEmptyText:false,
									editable:false,
									autoDestroy:false,
									//anchor:'100%',
									listeners:
									{
										select:function(combo,records,eOpts)
										{
											gQuestion.store.load({params:{test:this.value}});
										}
									}
								},
								gQuestion
							]
						}
					]
				);
            }   
        }
        /*{
            text: 'Создание вопросов',
            icon:'images/right.ico',
            handler:function()
            {
				var main_content = Ext.getCmp('central-region-content');
				Ext.getCmp('center-region').setTitle('Вопросы');
				main_content.removeAll(false);
                main_content.add(
					[
						q_tab
					]
				);
            }   
        }*/,
		{
            text: 'Создание ответов',
            icon:'images/right.ico',
            handler:function()
            {
				var main_content = Ext.getCmp('central-region-content');
				Ext.getCmp('center-region').setTitle('Ответы');
				main_content.removeAll(false);
				main_content.add(
					[
						combo_tests3,combo_question2,
						{
							xtype:'panel',
							id:'qtextpanel',
							name:'qtextpanel',
							height:50,
							frame:true,
							margin:5,
							html:'<i>Выберите вопрос...</i>'
						},
						a_grid
					]
				);
            }   
                
        },
		{
            text: 'Копирование вопросов',
            icon:'images/right.ico',
            handler:function()
            {
                var main_content = Ext.getCmp('central-region-content');
				Ext.getCmp('center-region').setTitle('Перемещение вопросов');
				main_content.removeAll(false);
				main_content.add(
					[
						copy_form
					]
				);
            }   
        },
        {
            text: 'Успеваемость',
            icon:'images/right.ico',
            handler:function()
            {
                var main_content = Ext.getCmp('central-region-content');
				Ext.getCmp('center-region').setTitle('Успеваемость');
				main_content.removeAll(false);
				//stat_tree.store.load();
				main_content.add(
					[
						stat_tree,gWrong
					]
				);
				Ext.getCmp('pbar2').setVisible(true);
				Ext.getCmp('pbar2').wait({
						interval:200,
						increment:10,
						text:'Загрузка...',
						scope:this
				});
				stat_tree.store.load({
					callback:function()
					{
						this.getRootNode().expand(); 
					}
				});
				
            }   
        },
        {
            text: 'Текущая статистика',
            icon:'images/right.ico',
            handler:function()
            {
                var main_content = Ext.getCmp('central-region-content');
				Ext.getCmp('center-region').setTitle('Статистика');
				main_content.removeAll(false);
				//stat_tree.store.load();
				main_content.add(
					[
						acordion_charts
					]
				);
            }   
        },
        {
            text: 'Характеристики',
            icon:'images/right.ico',
            handler:function()
            {
                var main_content = Ext.getCmp('central-region-content');
				Ext.getCmp('center-region').setTitle('Характеристики');
				main_content.removeAll(false);
				main_content.add(
					[
						{
							xtype:'fieldset',
							title:'Добавить, изменить тип характеристики',
							collapsible:true,
							//defaults:{anchor: '100%'},
							layout:'anchor',
							items :
							[
								{
									xtype: 'textfield',
									fieldLabel: 'Идентификатор',
									id: 'char_type_cd',
									anchor: '100%'
								}, 
								{
									xtype: 'textarea',
									fieldLabel: 'Описание',
									id: 'char_descr',
									anchor: '100%'
								},
								{
									xtype:'combo',
									id:'object_char',
									name:'object_char',
									fieldLabel:'Объекты',
									multiSelect:true,
									store:sObject,
									displayField:'OBJECT_NAME',
									valueField:'OBJECT_ID',
									emptyText:'- объект -',
									submitEmptyText:false,
									editable:false,
									autoDestroy:false,
									anchor: '100%'
								}, 
								{
									xtype: 'button',
									text: 'Сохранить',
									anchor: '20%',
									margin: '0 0 5 0',
									handler: function()
									{
										var post_string='cd='+Ext.getCmp('char_type_cd').getValue()+'&descr='+Ext.getCmp('char_descr').getValue()+'&objects='+Ext.getCmp('object_char').getValue();
										//console.log(post_string);
										Ext.Ajax.request(
										{
											url:'php/char/insert.php?'+post_string,
											success:function(response)
											{
												if(response.responseText == 1)
												{	
													Ext.getCmp('object_char').clearValue();
													Ext.getCmp('char_type_cd').setValue('');
													Ext.getCmp('char_descr').setValue('');
													gChar.store.load();
												}
												else
												{
													Ext.Msg.alert('Предупреждение', 'Произошла ошибка. Попробуйте снова.');
												}	
											}
										});
									}
								}
							]
						}, 
						{
							xtype: 'fieldset',
							title: 'Созданные характеристики',
							checkboxToggle: true,
							collapsed: true, 
							layout: 'anchor',
							listeners:
							{
								expand:function()
								{
									gChar.store.load();
								}
							},
							items:
							[
								gChar
							]
						}
					]
				);
            }   
        },
        {
            text: 'Отзыв, комментарии',
            icon:'images/right.ico',
            handler:function()
            {
                var main_content = Ext.getCmp('central-region-content');
				Ext.getCmp('center-region').setTitle('Отзывы, комментарии, ошибки');
				main_content.removeAll(false);
				main_content.add(
					[
						gReview
					]
				);
				gReview.store.loadPage(1);
            }   
        }
    ]
});


/**********Main Panel***********************************************************/

Ext.create('Ext.container.Viewport', {
	autoDestroy:false,
    //height: window.innerHeight,
    title: 'Система создания тестов',
    layout: 'border',
    items: 
    [
        {
            title: 'Меню',
            region:'west',
            //split:true,
            xtype: 'panel',
            frame:true,
            margins: '5 5 5 5',
            width: 200,
			tools:
			[
				{
					type:'refresh',
					tooltip: 'Обновить',
					handler: function(event, toolEl, panel)
					{
						document.location.reload();
					}
				},
				{
					type:'help',
					tooltip: 'Информация о системе',
					handler: function(event, toolEl, panel)
					{
						var help_window = Ext.create('Ext.window.Window',{
							 title: 'Информация',
							 height: 500,
							 width: 525,
							 minWidth: 525,
							 minHeight:500,
							 resizable:false,
							 layout: 'accordion',
							 layoutConfig: 
							 {
								 titleCollapse: false,
								 animate: true,
								 activeOnTop: true
							 },
							 items: 
							 [
								 {
									title: 'О системе',
									id:'system',
									autoScroll:true,
									items:
									[
										{
											xtype: 'label',
											id:'sys1',
											html:'<br/><p style="padding:10px;"><b>Описание элементов системы:</b></p>'
										},
										{
											xtype: 'label',
											id:'sys2',
											html:'<br/><p style="padding:10px;"><i>1) Пункт меню "Создание теста":</i></p>'
										},
										{
											xtype: 'label',
											id:'sys2_1',
											html:'<br/><p style="padding-left:20px;padding-right:10px;">&nbsp&nbsp&nbspДля создания теста во вкладке "Создание теста" выберите предмет, который вы ведете в текущем семестре, это нужно для определения  примерной области, в которой Вы будете создавать тест. Далее Вам необходимо выбрать название темы теста и краткое описание(например: Предмет - Алгоритмические языки, тема - Процедурные языки, описание - Итоговый тест по курсу....(необязательное поле)).<br/>&nbsp&nbsp&nbspПосле этого можно внести изменения в созданый тест во вкладке "Созданные тесты" для чего необходимо дважды щелкнуть на поле, в которое нужно внести изменения. <br/>&nbsp&nbsp&nbsp Далее необходимо назначить выбранный тест группе(ам), которые смогут пройти этот тест. Для этого переходим во вкладку "Назначить тест группе", из выпадающего списка выбираем группы(для выбора нескольких нужно держать нажатой клавишу CTRL) и нажимаем кнопку назначить тест. Аналагично вы можете снять назначенные тесты во вкладке "Снять назначение".</p>'
										},
										{
											xtype: 'label',
											id:'sys3',
											html:'<br/><p style="padding:10px;"><i>2) Пункт меню "Создание вопросов":</i></p>'
										},
										{
											xtype: 'label',
											id:'sys3_1',
											html:'<br/><p style="padding-left:20px;padding-right:10px;">&nbsp&nbsp&nbspДля создания вопросов во вкладке "Тест" выберите из выпадающего списка тест, для которого Вы хотите создать вопросы. Появится таблица с существующими вопросами(если ничего нет, значит Вы еще не создали ни одного вопроса. В этом случае  перейдите во вкладку "Вопросы" и создайте его, путем заполнения соответсвующих полей). Если же в таблице есть вопрос можно нажать на поле с вопросом и тогда вы перейдете в вкладку "Вопросы" автоматически.</p>'
										},
										{
											xtype: 'label',
											id:'sys4',
											html:'<br/><p style="padding:10px;"><i>3) Пункт меню "Создание ответов":</i></p>'
										},
										{
											xtype: 'label',
											id:'sys4_1',
											html:'<br/><p style="padding-left:20px;padding-right:10px;">&nbsp&nbsp&nbspДля создания ответов выберите из выпадающего списка тест и далее вопрос, в этом тесте. Появится таблица с существующими ответами(если ничего нет, значит Вы еще не создали ни одного ответа. В этом случае нажмите кнопку "+ добавить". Появится поле "новый ответ", которое с помощью двойного щелчка Вы можете отредактировать, подтвердив изменения при нажатие на кнопку "update"). Если же в таблице есть ответ, то двойным щелчком левой кнопки мыши Вы можете внести в него изменения.</p>'
										},
										{
											xtype: 'label',
											id:'sys5',
											html:'<br/><p style="padding:10px;"><i>4) Пункт меню "Медиа данные":</i></p>'
										},
										{
											xtype: 'label',
											id:'sys5_1',
											html:'<br/><p style="padding-left:20px;padding-right:10px;">&nbsp&nbsp&nbspВ этом пункте Вы можете прикрепить изображение к вопросу. Для этого выберите тест, вопрос в тесте и нажав на изображение с дискетой, выбрать изображение на Вашем компьютере (в формате jpg или png). Далее нажать кнопку "Загрузить изображение". После этого вы сможете просмотреть, загруженные Вами изображения, в панели "Имеющиеся изображения", для чего необходимо щелкнуть на соответсвующей строчке в таблице.</p>'
										},
										{
											xtype: 'label',
											id:'sys6',
											html:'<br/><p style="padding:10px;"><i>5) Пункт меню "Копирование вопросов":</i></p>'
										},
										{
											xtype: 'label',
											id:'sys6_1',
											html:'<br/><p style="padding-left:20px;padding-right:10px;">&nbsp&nbsp&nbspЗдесь Вы можете скопировать вопросы из одного теста("откуда") в другой тест("куда"). Сделать это можно выбрав необходимые тесты, и перетащив выбранные вопросы из одного теста в другой, зажатой левой клавишей мыши. Перемещенные вопросы копируются.</p>'
										},
										{
											xtype: 'label',
											id:'sys7',
											html:'<br/><p style="padding:10px;"><i>6) Пункт меню "Статистика":</i></p>'
										},
										{
											xtype: 'label',
											id:'sys7_1',
											html:'<br/><p style="padding-left:20px;padding-right:10px;">&nbsp&nbsp&nbsp Один из основных пунктов. Служит для внесения результатов тестирования группы в текущую успеваемость студентов и просмотра их результатов. Для просмотра результатов нужно выбрать тест, затем группу и уже в группе студента. Для занесения результатов в ведомость, необходимо выделить группу и в списке, внизу панели "Статистика", выбрать столбец, который вы отвели для результатов тестирования, при составлении календарного плана занятий. После этого необходимо нажать на кнопку "занести результаты.....". <br/><br/><br/></p>'
										}
									]
								 },
								 {
									title: 'О разработчике',
									id:'developer',
									items:
									[
										{
											xtype: 'label',
											id:'my_data',
											html:'<br/><p style="padding:10px;"><b>ФИО:</b> Волобуев Александр Николаевич;</p>'
										},
										{
											xtype: 'label',
											id:'my_data2',
											html:'<p style="padding:10px;"><b>Должность:</b> Инженер-программист отдела АСУ Центра Безопасности РГУ нефти и газа им.И.М.Губкина;</p>'
										},
										{
											xtype: 'label',
											id:'my_data3',
											html:'<p style="padding:10px;"><b>Конт.тел.:</b> 6-53;</p>'
										},
										{
											xtype: 'label',
											id:'my_data4',
											html:'<p style="padding:10px;"><b>Год: 2013;</b></p>'
										}
									]
								 }
							 ]
						 });
						 help_window.show();
					}
				}
			],
            collapsible: true,   // make collapsible
            id: 'menu',
            items: [
                        menu,
                        {
                            xtype:'panel',
                            margin: '10 0 0 0',
                            frame:true,
                            title: 'Инфрмация о пользователе',
                            items:
                            [
								{
									xtype: 'progressbar',
									id:'pbar',
									width: 180,
									listeners:
									{
										afterrender:function(pbar)
										{
											pbar.wait({
												interval: 200,
												increment: 10,
												text: 'Подождите...',
												scope: this
											});
										}
									}
								},
                                {
                                    xtype:'label',
                                    id:'fio_id',
                                    margin:'0 0 0 15',
									listeners:
									{
										afterrender:function(l)
										{
											Ext.Ajax.request({
												url:'php/get_fio.php',
												success:function(response)
												{
													l.update('<b>ФИО: </b>' + response.responseText + '<br/>');
													Ext.getCmp('pbar').reset(true);
												}
											});
										}
									}
                                }
                            ]
                        }
                   ]  
        },
        {
            title: 'Главная',
            region: 'center',     // center region is required, no width/height specified
            xtype: 'panel',
			autoDestroy:false,
            frame:true,
            //layout: 'fit',
            margins: '5 5 5 0',
            id:'center-region',
            items:
            [
                {
					xtype:'panel',
					id:'central-region-content',
					name:'main',
					height:(window.innerHeight - 48),//526,
					frame:true,
					items:
					[
						{
							xtype:'label',
							html:'<b style="font-size:16px;padding:10px;">Здравствуйте! </b><br/><br/>' + '<p style = "font-size:14px;padding-left:10px;">Для создания теста перейдите во вкладку Меню->Создание теста.</p><br/> <p style = "font-size:14px;padding-left:10px;"> Вы можете создать новый тест, отредактировать существующий, назначить тест группе и снять назначение.<br/> Назначенный тест будет доступен студентам группы, которой Вы его назначили.</p><br/>' + '<p style = "font-size:14px;padding-left:10px;">Далее Вы можете заполнять вопросами и ответами созданные тесты, прикреплять изображения к вопросам. <br/>Кроме того Вы можете просмотреть ход тестирования и занести результаты в текущую успеваемость во кладке Статистика.  </p>' /*+ '<p style = "padding-left:10px;">.</p>'*/
						}
					]
				}
                
            ]
        }
    ],
    renderTo: body
});  
});