# 公司研发流程

- 规范(工程能力标准化   )
需求-开发-代码准入-测试-发布验证-上线
- 落地
选择工具插件即做优秀工程实践
使用研发平台提升总体工程能力
- 可见
收集分析研发环节所有数据 绘制展现完整工程能力地图


建立工程规范 打通研发壁垒
看见工程能力 追求技术卓越


# 敏捷实践应用
了解如何制定迭代计划、如何使用用户故事管理用户需求、如何做敏捷估算等内容，以达到快速熟悉和掌握敏捷开发模式的目的。了解敏捷开发场景下项目管理平台的使用，如何结合工具平台进行敏捷项目管理。


## 什么是Scrum
Scrum是迭代式增量软件开发过程，即敏捷开发。包括一系列时间和预定义角色的过程骨架。

## Scrum角色
- Product Owner
    需求池
- Team
    所有参与者决定需求顺序
- ScrumMaster
    日会。。。


空间配置-产品规划-迭代计划-迭代执行-showcase-回顾

# 研发工具链

-研发流程
提炼用户价值定义用户交互(PM UE) - 同步目标和计划(PM,RD,QA) - 贡献代码(RD) - 代码检查同行评审(RD) - 自动化测试实时展示进度(RD,QA) - 一键部署产出管理(OP) - 用户反馈持续迭代(PM) - 回到第一步


## icafe

元素：
    空间，计划，卡片，帖子

空间配置

feature
    story
        task
bug



## icode

与需求管理，持续集成和交付打通，形成git工具链
严格的代码准入机制，质量管理前置
代码与产品关联，用数据说话。



git原理
每次提交做快照后，保存一个指向这次快照的索引

git status, log , checkout

git branch 

git branch -r 远程分支


git checkout -b testing origin/testing 从远程分支切分出来的testing分支


git commit -m "info"

### merge

在master合并其他分支
先切回master分支
git merge testing(分支名)

git log --oneline --graph


### rebase

git checkout topic 
git reabase master

###　代码冲突及解决思路
１.　再本地仓库更新并合并代码
    git fetch origin
    git reabase origin/master
2. 依照提示分别打开冲突的文件，逐一修改冲突代码
3. 所有冲突修改完毕后，提交
    git add -u
    git rebase --continue
4. 更新patch
    git push origin HEAD:refs/for/master

### 发起评审    
代码commit后
git push origin HEAD:refs/for/master

查看最近两次提交的不同
git diff HEAD-1 HEAD


# 行间评论

可以评论，修改，别人可以看到
点击右上角打分/评论  -1 - 2分, 2分才能合入

## 代码开发环节的优秀实践

1. 远程仓库 git clone fetch pull
2. 本地工作区 git add
3. 暂存区 git commit -m ''
    git commit --amend '' 上次提交有错误代码， 这次提交修改错误代码更新使用
4. 本地仓库git push origin HEAD:refs/for/master
5. 评审区(临时分支)  合入远端仓库

提交规范 分支规范
- 善用git本地分支并行开发多个feature 每个feature创建一个分支
- 95%commit不超过400行
- 主干历史一次只提交一个commit(--amend)， reabase if nessary fast fowward only
- 提交日志中填写有效iCafe卡片id. icode-666
    git commit -m 'icode-5481 modify info'


关联需求，关联产品

每个项目下都有一个third-party,大比例的代码是重复的

重复引入第三方代码问题
    共建各主流语言的内部依赖源即依赖规范

    github mirror解决第三方代码引用问题
善用搜索功能找到所求
    加速学习和开发
    站在巨人的肩膀上
    智能化


代码准入环节的优秀实践

可维护性检查
Unit Test
P0级自动化回归测试
云端编译
增量静态代码扫描
CodeReview
代码规范
增量源码安全扫描
 

- 通过设置提交规则，达到控制入库代码质量的目的

遇到的问题：
代码没法复用
看不懂代码还要修bug
踩坑填坑
重构

解决办法：Code Review


Code Review 过程中能发现问题：
- 代码是否实现了需求定义的功能
- 设计问题： 是否满足SOLID原则，有更加优化的实现方式，方式是否满足单一职责原则
- 是否有重复代码，代码是否可被重用
- 是否存在冗余代码
- 代码可维护问题：是否有循环依赖问题，代码是否过于复杂
- 业务逻辑是否有问题
- 文档和注释是否完善
- 是否有一些不舒服的味道：注释，命名，函数等。
- Test Case是否充分？
---

Code Review中应用的态度
- 对所有review代码逻辑应可以完全看懂(掌握情况就像自己写的一样)
- 好代码的标准不仅仅是可以运行通过(正确性，可读性，可重用性，可运维性)
- Code Review和写代码一样重要： 也有产出,更高质量的代码，理解和找出问题
- 以提升代码质量为最终目标

Code Review注意事项
- 在必要时，Review双方做面对面沟通
    背景，关键点的说明，便于Reviewer理解，必要时提供设计文档
- 对关键模块，建立owner制度
    所有提交代码必须由owner做最终确认
- 对review中发现的问题一追到底
    问题没有完全改正前，不能通过
- 一行代码都不放过



推荐
- 多写行间评论
- 善于给出-2分(打回率)

### 多人协同开发工作流
主干保有完整代码 , 分支上的修改3个月内需合入主干
推荐两种分支协同模式：主干开发，分支开发

#### 主干开发
    前提：充分的本地验证，频繁提交主干，可靠的准入检查
    优势：快速集成，冲突早发现
#### 分支开发
    前提：持续集成无特殊要求，并行开发的分支会有很多
    优势：保证多人多任务多版本并行开发