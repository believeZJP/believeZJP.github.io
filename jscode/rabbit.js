/**
 * @file: file
 * @author: zhaojianpeng<zhaojianpeng@baidu.com>
 */
const rabbit = '兔子';
const turtle = '乌龟';
const start = '|';
const end = '》'
// 赛道上的每一米用.表示
const pad = '.'
// 速度 1米/150ms
const speed = 1
// 一共有50米
const steps = 50

// 约定在42米
const stopAt = 42
// 兔子是否停下
let stoped = false
// 从0开始轮询
let t = 0
let timer

let initState = `${rabbit}${turtle}${start}${pad.repeat(steps)}${end}`

function turtleBeyondStart() {
    return speed * t
}
function rabbitBeyoondStart() {
    if (speed * 3 * t >= stopAt) {
        stoped = true
        return stopAt
    }
    return speed * 3 * t
}

function race() {
    const turtleRange = turtleBeyondStart()
    const rabbitRange = rabbitBeyoondStart()
    if(turtleRange === 50) {
        clearInterval(timer)
        initState = `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(steps - stopAt)}${end}${turtle}`
    } else if (t > 0 && !stoped) {
        initState = `${start}${pad.repeat(turtleRange)}${turtle}${pad.repeat(rabbitRange - turtleRange)}${rabbit}${pad.repeat(steps - rabbitRange)}${end}`
        // 这个可以合并到上面这个条件里
    // } else if(turtleRange < rabbitRange && stoped) {
    //     // 兔子停止了,兔子在乌龟前面
    //     initState = `${start}${pad.repeat(turtleRange)}${turtle}${pad.repeat(rabbitRange - turtleRange)}${rabbit}${pad.repeat(steps-stopAt)}${end}`
        
    } else if(turtleRange >= rabbitRange && stoped) {
        // 兔子在乌龟后面
        initState = `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(turtleRange - stopAt)}${turtle}${pad.repeat(steps-turtleRange)}${end}`

    }
    t++;
    console.log(initState)
}
timer = setInterval(() => {
    race()
}, 150);
const wait = sec => new Promise(resolve => setTimeout(() => resolve(), sec))


// 等待 2 秒再开始启动比赛
wait(2000).then(() => {
    race()
})