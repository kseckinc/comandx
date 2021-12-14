![image](https://user-images.githubusercontent.com/94337797/145354238-42473c28-a928-4ec5-84fb-7204db088283.png)
=====

ComandX是可观测的界面化的运维解决方案，它是BridgX和SchedulX的Web可视化展示界面，提供简洁易用的操作体验。

它具有如下关键特性：


1、支持集群创建和管理；

2、支持扩缩容任务；

3、支持K8s集群创建和管理；

4、支持服务部署和编排；

5、支持云服务器管理；

6、支持云账户管理；

7、支持费用管理；

8、支持Dashboard全局展示；

联系我们
----
[微博](https://weibo.com/galaxyfuture) | [知乎](https://www.zhihu.com/org/xing-yi-wei-lai) | [B站](https://space.bilibili.com/2057006251)
| [微信公众号](https://github.com/galaxy-future/comandx/blob/main/docs/resource/wechat_public_account.md)
| [企业微信交流群](https://github.com/galaxy-future/comandx/blob/main/docs/resource/wechat.md)

上手指南
----

#### 1、环境依赖
- [安装BridgX](https://github.com/galaxy-future/bridgx/blob/dev/README.md);
- [安装SchedulX](https://github.com/galaxy-future/schedulx/blob/master/README.md)

#### 2、安装部署  

* (1)源码下载
  - 前端工程：
  > git clone https://github.com/galaxy-future/comandx.git

* (2)macOS系统部署
  - 前端部署,在ComandX目录下运行
    > make docker-run-mac
   
  - 系统运行，在浏览器中输入 http://127.0.0.1 可以看到管理控制台界面,初始用户名root和密码为123456。

* (3)Linux安装部署
  - 以下步骤请使用 root用户 或有sudo权限的用户 sudo su - 切换到root用户后执行。
  - 1）针对使用者
    - 前端部署,在ComandX目录下运行
      > make docker-run-linux
    - 系统运行，浏览器输入 http://127.0.0.1 可以看到管理控制台界面,初始用户名root和密码为123456。

  - 2）针对开发者
    - 前端部署
      - 如果跟后端同机部署，可以直接进入下一步;如果后端单独部署，则到 `cd conf` 下修改对应的配置ip和port信息。
      - 进入ComandX目录下，然后使用以下命令
        > docker-compose up -d //启动BridgX前端服务 <br>
        > docker-compose down //停止BridgX前端服务  <br>

      - 系统运行，浏览器输入 http://127.0.0.1 可以看到管理控制台界面,初始用户名root和密码为123456。

    
#### 3、快速上手  
通过[快速上手指南](https://github.com/galaxy-future/comandx/blob/main/docs/getting-started.md)，可以掌握基本的集群创建、快速扩缩容、K8s集群等操作流程。  


#### 4、用户手册  
通过[用户手册](https://github.com/galaxy-future/comandx/blob/main/docs/user-manual.md)，用户可以掌握BridgX的功能使用全貌，方便快速查找使用感兴趣的功能。


行为准则
------
[贡献者公约](https://github.com/galaxy-future/comandx/blob/main/CODE_OF_CONDUCT)

授权
-----

ComandX使用[Apache License 2.0](https://github.com/galaxy-future/comandx/blob/main/LICENSE)授权协议进行授权



