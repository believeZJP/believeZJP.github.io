<template>
  	<div id="wrapper">
  			<nav class="navbar navbar-default">
  				<div class="container">
  					<a class="navbar-brand" href="#">
  						<i class="glyphicon glyphicon-time"></i>
  					</a>
  					<ul class="nav navbar-nav">
  						<li>
  							<router-link to="/home">
	  							<a>首页</a>
  							</router-link>
  						</li>
  						
  						<li>
  							<router-link  to="/time-entries">
	  							<a>计划列表</a>
  							</router-link>
  						</li>	
  					</ul>
  				</div>
  			</nav>
  			<div class="container">
  				<div class="row">
  					<div class="col-sm-3">
  						<sidebar :time="$store.state.totalTime"></sidebar>
  					</div>
  					<div class="col-sm-9">
  						<router-view>
  							
  						</router-view>
  					</div>
  				</div>
  			</div>
  			
  	</div>
    
</template>

<script>

  	import Sidebar from './components/Sidebar.vue'
	export default {
		components: {'sidebar': Sidebar},
		data () {
		    return {
		      totalTime: 0
		    }
		},
		mounted () {
			this.$store.commit('setTotalTime',0)
		}
	}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
