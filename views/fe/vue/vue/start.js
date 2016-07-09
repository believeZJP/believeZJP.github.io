//起步
			new Vue({
				el:'#app',
				data:{
					message:'Hello Vue.js!'
				}
			});
			
		//双向绑定
			new Vue({
				el:'#app2',
				data:{
					message:'Hello Vue.js!'
				}
			});
			
		//渲染列表
			new Vue({
				el:'#app3',
				data:{
					todos:[
						{text:'Learn JavaScript'},
						{text:'Learn Vue.js'},
						{text:'Build Something Awesome'}
					]
				}
			});
		//处理用户输入
			new Vue({
				el:'#app4',
				data:{
					message:'Hello Vue.js!',
					newMessage:' '
				},
				methods:{
					reverseMessage:function(){
						this.newMessage = this.message.split("").reverse().join("");
					}
				}
			});
		//综合
			new Vue({
				el:'#app5',
				data:{
					newTodo:'',
					todos:[
						{text:'Add some todos' }
					]
				},
				methods:{
					addTodo:function(){
						var text = this.newTodo.trim();
						if(text){
							this.todos.push({text:text});
							this.newTodo = '';
						}
					},
					removeTodo:function(index){
						this.todos.splice(index,1);	
					}
				}
			});