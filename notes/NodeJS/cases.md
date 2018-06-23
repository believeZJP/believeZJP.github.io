# 实例

# 文件操作

## 小文件拷贝

```
var fs = require('fs')

function copy(src, dst){
    fs.writeFileSync(dst, fs.readFileSync(src))
}

function main(argv){
    copy(argv[0], argv[1])
}

main(process.argv.slice(2))
```

使用 fs.readFileSync 从源路径读取文件内容，并使用 fs.writeFileSync 将文件内容写入目标路径。

## 小知识：

- process 是一个全局变量，可通过 process.argv 获得命令行参数。argv[0]固定等于 NodeJS 执行程序的绝对路径，argv[1]等于主模块的绝对路径，因此第一个命令行参数从 argv[2]开始。

## 大文件拷贝

小文件拷贝是将所有文件内容读取到内存中，再一次性写入磁盘。不适合拷贝大文件， 内存会爆仓。 大文件只能读一点写一点直到完成拷贝。

```
var fs = require('fs')

function copy(src, dst){
    fs.createReadStream(src).pipe(fs.createWriteStream(dst))
}

function main(argv){
    copy(argv[0], argv[1])
}

main(process.argv.slice(2))
```

以上程序用 fs.createReadStream 创建了一个源文件的只读数据流，并用 pipe 把两个数据流  连接起来。抽象点说，水顺着水管从一个桶流到了另一个桶。

# API 走马观花

 这里没有细读，看官方文档再细看。

# 遍历目录

遍历目录是操作文件时的一个常见需求。比如需要找到并处理指定目录下的所有 js 文件时，就需要遍历整个目录。

## 递归算法

一般使用递归算法，否则难以编写出简洁的代码。

```
function factorial(n){
    if(n===1){
        return 1
    } else {
        return n * factorial(n - 1)
    }
}
```

tip: 递归算法虽然简洁，由于每递归一次就产生一次函数调用，在需要优先考虑性能时，需要把递归算法转换为循环算法，以减少函数调用次数。

## 遍历算法

目录是一个树状结构，在遍历时一般使用深度优先+先序遍历算法。深度优先，意味着到达一个节点后，接着遍历子节点而不是邻居节点。先序遍历意味着首次到达了某节点就算遍历完成，而不是最后一次返回某节点才算数。因此下面这棵树的遍历顺序是 A > B > D > E > C > F。

```
          A
         / \
        B   C
       / \   \
      D   E   F
```

## 同步遍历
