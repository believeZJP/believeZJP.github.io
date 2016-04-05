//碰撞检测的js
//判断大鱼和果实的距离
function momFruitsCollision(){
	if (!data.gameOver) {//游戏没结束才有的玩
		for (var i = 0; i < fruit.num; i++) {
			if (fruit.alive[i]) {
				//计算距离
				var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(l < 900){
					//果实被吃掉
					fruit.dead(i);
					//大鱼碰到小鱼
					data.fruitNum ++;
					//大鱼颜色随着果实数量发生变化
					mom.momBodyCount ++;
					if (mom.momBodyCount >7) {
						mom.momBodyCount = 7;
					}
					if (fruit.fruitType[i] == "blue") {
						data.double = 2;
					}
					//生成一个圈
					wave.born(fruit.x[i],fruit.y[i]);
					
					
				}
			}
		}
	}
}
//大鱼和小鱼的碰撞检测
function momBabyCollision(){
	if (data.fruitNum > 0 && !data.gameOver) {
		var l = calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l<900){
			//小鱼复活
			baby.babyBodyCount = 0;
			//大鱼碰小鱼时，果实数量归零
	//		data.reset();在更新分数的时候归零了，所以这个不再需要
			//大鱼跟小鱼碰撞时，大鱼恢复原状
			mom.momBodyCount = 0;
			//大鱼碰小鱼时候，分数更新
			data.addScore();
			//画一个圈
			halo.born(baby.x,baby.y);
		}
		
	}
}
