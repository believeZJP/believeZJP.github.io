/**
 * @file: file
 * @author: zhaojianpeng
 */
/**
 * @description: 
 * @param {type} 
 * @return: 
 * 代码简单清晰
 * 同步读取，容易内存溢出
 * 
 */
function copyOld(src, target) {
    fs.writeFileSync(target, fs.createWriteStream(src))
}

function copy(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst))
}
/**
 * @description: 
 * @param {type} 
 * @return: 
 * 代码简洁
 * 没有内存溢出风险
 */

const fs = require('fs')
const path = require('path')


// 复制目录
main('source/tags', 'source/tags2')

function main(src, dst) {
    // const rootSrc = path.resolve(path.resolve(), src)
    const rootSrc = path.resolve(process.cwd(), src)
    fs.stat(rootSrc, (err, stats) =>{
        if (err) {
            console.log(err, '错误了')
        }
        if (stats.isFile()) {
            copy(rootSrc, dst)
        } else if(stats.isDirectory()) {
            // 如果目标地址也是文件夹的话，生成目标文件夹
            // 如果文件不存在，则创建
            if(!fs.existsSync(dst)) {
                fs.mkdirSync(dst)

            }
            copyDir(rootSrc, dst)
        }
    })
}

// 读取文件夹下的文件并复制
function copyDir(src, dst) {
    fs.readdir(src, (err, paths) => {
        if (err) {
            throw err
        }
        paths.forEach(tmpPath=>{
            const currPath = path.resolve(src, tmpPath)
            fs.stat(currPath, (err, st)=> {
                if(st.isFile()) {
                    copy(currPath, path.resolve(dst, tmpPath))
                }else if(st.isDirectory()) {
                    // 递归调用复制文件夹内容
                    const currDst = path.resolve(dst, tmpPath)
                    if(!fs.existsSync(currDst)) {
                        fs.mkdirSync(currDst)
                    }
                    copyDir(currPath, currDst)
                }
            })
        })
    })
}