/**
 * @file: file
 * @author: zhaojianpeng
 */
const bubble = arr => {
    const length = arr.length
    if (arr.length <=1) return
    for (let i = 0; i < length -1; i++) {
        for (let j = 0; j< length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
}
const bubble2 = arr => {
    const length = arr.length
    if (arr.length <=1) return
    for (let i = 0; i < length -1; i++) {
        let changeFlag = false
        for (let j = 0; j< length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                changeFlag = true
            }
        }
        if (!changeFlag) break
    }
}
const arr = [7, 8, 4, 5, 6, 3, 2, 1];
console.time('改进前冒泡排序耗时');
bubble(arr);
console.timeEnd('改进前冒泡排序耗时')
// console.time('改进后冒泡排序耗时');
// bubble2(arr);
// console.timeEnd('改进后冒泡排序耗时')
console.log(arr, 233333)