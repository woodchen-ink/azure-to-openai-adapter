[English](./readme-en.md) / [简体中文](./readme.md)

# 使用node.js(node>=16)部署代理，以调用openai的方式，调用azure的openai接口

本项目旨在帮助开发者通过使用Node.js部署一个代理服务器，实现用OpenAI的方式调用Azure的OpenAI接口。跟随以下步骤来配置和使用：

# 广告
- [CZL Chat](https://chat.czl.net)，稳定商业版AI服务。
- [CZLOapi](https://oapi.czl.net)，OPENAI代理服务，无需翻墙。

## 使用方法
1. 下载本项目,按照app.js里的说明进行修改
![image](https://img.cdn.czl.net/i/2023/05/25/9t3ev.webp)

2. 执行以下命令安装依赖
    ``` 
    npm install express cors node-fetch
    ```

3. 执行以下命令来启动服务(正式使用环境建议使用`pm2`等工具以后台运行)
    ```
    node app.js
    ```
4. 按照调用`openai`的方式调用`azure`接口
> 接口地址为：http://localhost:3000/v1/chat/completions
> key输入azure的密钥
