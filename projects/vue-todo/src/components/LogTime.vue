<template>
	<div class="form-horizontal">
		<div class="form-group">
			<div class="row">
				<div class="col-sm-6">
					<label>日期</label>
					<input type="date"
						class="form-control"
						v-model="timeEntry.date"
						placeholder="Date"
						 />
				</div>
				
				<div class="col-sm-6">
					<label>时间</label>
					<input type="number"
						class="form-control"
						v-model="timeEntry.totalTime"
						placeholder="Hours"
						 />
				</div>
			</div>
		</div>
		
		<div class="form-group">
			<div class="row">
				<div class="col-sm-12">
					<label>备注</label>
					<input type="text"
						class="form-control"
						v-model="timeEntry.comment"
						placeholder="Comment"
						 />
				</div>
			</div>
		</div>
		
		<button class="btn btn-primary" @click="save()">保存</button>
		<!--<button class="btn btn-danger" v-link="'/time-entries'">取消</button>-->
		 <router-link to="/time-entries"><button class="btn btn-danger">取消</button></router-link>
		<hr />
		
	</div>
</template>


<script>
	export default {
		data() {
			return {
				//模拟一个默认值
				timeEntry: {
					name: 'zeze',
					email: 'zeze@zeze.com',
					data: '2016-05-01',
					totalTime: 1,
					comment: '这是备注',
					image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
				}
			}
		},
		methods: {
			save () {
				let timeEntry = this.timeEntry
				this.$store.commit('timeUpdate',timeEntry)
				this.timeEntry = {}
			}
		}
	}
</script>