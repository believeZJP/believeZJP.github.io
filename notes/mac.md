# mac 经验

## mac 安装 tomcat

    1. 按照百度经验，安装Java jdk，配置环境变量
        检查Java版本 java -version
        echo $JAVA_HOME

    2. 下载tomcat，官网版
    3. 修改授权
        进入tomcat的bin目录,修改授权
        ```
        ➜ bin pwd
        /Users/yp/Documents/workspace/apache-tomcat-7.0.68/bin
        ➜ bin sudo chmod 755 *.sh

```
1. sudo为系统超级管理员权限.
2. chmod 改变一个或多个文件的存取模式
3. 755代表用户对该文件拥有读、写、执行的权限，同组的其他人员拥有执行和读的权限，没有写的权限，其它用户的权限和同组人员一样.
4. 777代表，user,group ,others ,都有读写和可执行权限.
5. chmod -R 777 folername,获取文件夹权限.
```

### 启动

二、启动
执行启动命令 sudo sh ./startup.sh：
访问http://localhost:8080/

关闭

sudo sh ./shutdown.sh

或直接./shutdown.sh

安装 nginx

先安装 homebrew

brew install nginx

mac 下 vim 快捷键

不在编辑状态下按 dd 删除行
[链接](https://www.jianshu.com/p/6f13474d36ac)

# mac 添加任何来源允许权限

在命令行执行

```
  sudo spctl --master-disable
```

# 如何卸载 paragon NTFS for mac ?

```
找到 /Library/Application Support/Paragon Software 目录

sudo ./com.paragon-software.ntfs.uninstall
```

# mac本地绑定hosts
```bash
sudo vim /etc/hosts  

添加以下内容
10.180.112.208 www.baidu.com www.jd.com
```
可以添加多个域名, 也可以一个