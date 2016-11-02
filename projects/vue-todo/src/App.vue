<template>
  	<div id="wrapper">
  			<nav class="navbar navbar-default">
  				<div class="container">
  					<a class="navbar-brand" href="#">
  						<i class="glyphicon glyphicon-time"></i>
  					</a>
  					<ul class="nav navbar-nav">
  						<li><a v-link="'/home'">首页</a></li>
  						<li><a v-link="'/time-entries'">计划列表</a></li>
  					</ul>
  				</div>
  			</nav>
  			<div class="container">
  				<div class="row">
  					<div class="col-sm-3">
  						
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
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
