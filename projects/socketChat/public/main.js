$(function(){
	var FADE_TIME = 150;//毫秒
	var TYPING_TIMER_LEGNTH = 400;//毫秒
	var COLORS = [
		'#e21400', '#91580f', '#f8a700', '#f78b00',
	    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
	    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
	];
	
	//初始化变量
	var $window = $(window);
	var $usernameInput = $('.usernameInput');//用户名输入框
	var $message = $('.message');//消息区
	var $inputMessage = $('.inputMessage');//输入信息的box
	
	var $loginPage = $('.login.page');//登录页
	var $chatPage = $('.chat.page');//聊天室页面
	
	//提醒设置用户名
	var username;
	var connected = false;
	var typing = false;
	var lastTypingTime;
	var $currentInput = $usernameInput.focus();
	
	var socket = io();
	
	//用户数量通知
	function addParticipantsMessage(data){
		var message = '';
		if(data.numUsers === 1){
			message += 'there is 1 participant';
		}else{
			message += 'there are ' + data.numUsers + 'participants';
		}
		log(message);
	}
	
	//设置用户名
	function setUsername(){
		username = cleanInput($usernameInput.val().trim());
		
		//如果用户名有效
		if(username){
			$loginPage.fadeOut();
			$chatPage.show();
			$loginPage.off('click');
			$currentInput = $inputMessage.focus();
			
			//通知服务器 当前的用户名
			socket.emit('add user',username);
		}
	}
	
	//发送一条信息
	function sendMessage(){
		var message = $inputMessage.val();
		//阻止一些特殊符号被注入。
		message = cleanInput(message);
		//如果信息不为空，且连接有效
		if(message && connected){
			$inputMessage.val('');
			addChatMessage({
				username: username,
				message: message
			});
			//通知服务执行‘new message’，发送信息
			socket.emit('new message',message);
		}
	}
	
	//显示一条信息
	function log(message,option){
		var $el = $('<li>').addClass('log').text(message);
		addMessageElement($el,options);
	}
	
	//将信息添加到信息列表
	function addChatMessage(data,options){
		//如果有 ‘X was typing’，不要隐藏这条信息
		var $typingMessages = getTypingMessages(data);
		options  = options || {};
		if($typingMessages.length !== 0){
			options.fade = false;//???
			$typingMessages.remove();
		}
		
		var $usernameDiv = $('<span class"username"/>').text(data.username)
										.css('color',getUsernameColor(data.username));
		var $messageBodyDiv = $('<span class="messageBody">')
												.text(data.message);
												
		var typingClass = data.typing ? 'typing' : '';
		var $messageDiv = $('<li class="message"/>')
										.data('username',data.username)
										.addClass(typingClass)
										.append($usernameDiv,$messageBodyDiv);
										
		addMessageElement($messageDiv,options);								
	}
	
	//添加形象的正在打字信息
	function addChatTyping(data){
		data.typing = true;
		data.mesage = 'is typing';
		addChatMessage(data);
	}
	
	//移除正在打字的信息
	function removeChatTyping(data){
		getTypingMessages(data).fadeout(function(){
			$(this).remove();
		});
	}
	
	//添加一个信息到信息列表，并滚动到最底部
	//例如：
	//options.fade 如果该元素应该渐显， default = true
	//options.prepend 如果该元素应该提前加载
	//所有其他信息(default = false)
	function addMessageElement(el,options){
		var $el = $(el);
		
		//设置默认配置
		if(!options){
			options = {};
		}
		if(typeof options.fade === 'undefined'){
			options.fade = true;
		}
		if(typeof options.prepend === 'undefined'){
			options.prepend = false;
		}
		
		//匹配当前的配置
		if(options.fade){
			$el.hide().fadeIn(FADE_TIME);
		}
		if(options.prepend){
			$message.append($el);
		}else{
			$message.append($el);
		}
		$messages[0].scrollTop = $messages[0].scrollHeight;
	}
	
	//阻止输入特殊符号
	function cleanInput(input){
		return $('<div/>').text(input).text();
	}
	
	//更新正在输入事件
	function updateTyping(){
		if(connected){
			if(!typing){
				typing = true;
				socket.emit('typing');
			}
			lastTypingTime = (new Date()).getTime();
			
			setTimeout(function(){
				var typingTimer = (new Date()).getTime();
				var timeDiff = typingTimer - lastTypingTime;
				if(timeDiff >= TYPING_TIMER_LEGNTH && typing){
					socket.emit('stop typing');
					typing = false;
				}
			},TYPING_TIMER_LEGNTH);
		}
	}
	
	//获取一个用户正在输入的信息
	function getTypingMessage(data){
		return $('.typing.message').filter(function(i){
			return $(this).data('username') === data.username;
		});
	}
	
	//通过hash值获取到一个用户的颜色属性???
	function getUsrnameColor(username){
		//计算hash值
		var hash = 7;
		for(var i = 0; i < username.length; i++){
			hash = username.charCodeAt(i) + (hash << 5) - hash;
		}
		//计算颜色值
		var index = Math.abs(hash % COLORS.length);
		return COLORS[index];
	}
	
	//键盘事件
	$window.keydown(function(event){
		//当有键被按下时，自动聚焦到输入框
		if(!(event.ctrlKey || event.metaKey || event.altKey)){
			$currentInput.focus();
		}
		//当用户输入回车时
		if(event.which === 13){
			if(username){
				sendMessage();
				socket.emit('stop typing');
				typing = false;
			}else{
				setUsername(;)
			}
		}
	});
	
	$inputMessage.on('input',function(){
		updateTyping();
	});
	
	//点击事件
	
	//当点击登录页任何地方，输入框自动聚焦
	$loginPage.click(function(){
		$currentInput.focus();
	});
	
	//当点击信息输入框的box,输入框自动聚焦
	$inputMessage.click(function(){
		$inputMessage.focus();
	});
	
	//socket 事件
	
	//'login事件'，显示登录信息
	socket.on('loign',function(data){
		connected = true;
		//展示欢迎信息
		var message = 'Welcome to 赵建鹏的 Socket.IO Chat - ';
		log(message,{
			prepend: true
		});
		addParticipantsMessage(data);
	});
	
	//new message'事件 更新聊天信息区
	socket.on('new message',function(data){
		addChatMessage(data);
	});
 	
 	//'user joined'事件 ，加载到聊天信息区
 	socket.on('user joined',function(data){
 		log(data.username + 'joined');
 		addParticipantsMessage(data);
 	});
 	
 	//'user left'事件 ，加载到聊天信息区
 	socket.on('user left',function(data){
 		log(data.username + 'left');
 		addParticipantsMessage(data);
 		removeChatTyping(data);
 	});
 	
 	//'typing'事件,显示typing信息
 	socket.on('typing',function(data){
 		addChatTyping(data);
 	})
 	
 	//'stop typing' 事件，删掉typing信息
 	socket.on('stop typing',function(data){
 		removeChatTyping(data);
 	});
});
