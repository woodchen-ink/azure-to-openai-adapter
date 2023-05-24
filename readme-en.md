<div align="center">
<h1 align="center">Azure-To-Openai-Adapter</h1>
[English](./readme-en.md) / [简体中文](./readme.md)
</div>
# Deploy a proxy using node.js(node>=16) to call the Azure openai interface in openai.

## Usage
1. Download this project and modify it according to the instructions in app.js.
![image](https://img.cdn.czl.net/i/2023/05/25/9t3ev.webp)

2. Run the following command to install the dependencies:
    ``` 
    npm install express cors node-fetch
    ```

3. Run the following command to start the service (it is recommended to use tools such as `pm2` to run it in the background in a production environment):
    ```
    node app.js
    ```

4. Call the Azure interface in the same way as calling `openai`.

> The API endpoint is: http://localhost:3000/v1/chat/completions
> Enter the Azure key for the key.