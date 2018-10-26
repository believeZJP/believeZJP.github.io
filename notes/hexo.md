# hexo 搭建
1. [HEXO官网](https://hexo.io/zh-cn/docs/)
2. [文档](https://hexo.io/zh-cn/docs/)

# 安装
1. node.js git 已经安装，跳过
2. hexo安装
```
npm install -g hexo-cli
```

运行
```
hexo init blog
cd blog
hexo server
```
访问localhost:4000即可看到网页

在sources/posts文件夹下新建一个test.md文件，再次访问页面，可看到新加的文章。


# 安装hexo-admin

```
npm install --save hexo-admin
hexo server -d
open http://localhost:4000/admin
```

# 安装next主题
1. 在根目录运行
```
 git clone https://github.com/theme-next/hexo-theme-next themes/next
```
会在themes目录下创建next文件夹

(需运行多次才能顺利下载)

2. 在根目录的_config.yml里配置themes: next