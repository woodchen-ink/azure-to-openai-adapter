import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
const app = express();
const port = 3000;
// 这里修改为你想用的端口号
// Please modify the port number to the one you want to use.

app.use(cors());
app.use(express.json());

const resourceName = "test-czl";
// 这里是你azure账号的OPENAI资源名称
// Here is the name of your OPENAI resource on your Azure account.
const mapper = {
  "gpt-3.5-turbo": "test0",
  //这个的右边是你部署的3.5模型的名称
  // On the right side of this is the name of the deployed 3.5 model.
  "gpt-4": "test1",
  //这个的右边是你部署的4模型的名称
  //On the right side of this is the name of the deployed 4 model.
};
const apiVersion = "2023-03-15-preview";

app.options("*", cors());

app.post("/v1/chat/completions", async (req, res) => {
  await handleRequest(req, res, "chat/completions");
});

app.post("/v1/completions", async (req, res) => {
  await handleRequest(req, res, "completions");
});

app.get("/v1/models", async (req, res) => {
  await handleModels(req, res);
});

async function handleRequest(req, res, path) {
  const body = req.body;
  const modelName = body?.model;
  const deployName = mapper[modelName] || "";

  if (deployName === "") {
    return res.status(403).send("Missing model mapper");
  }

  const fetchAPI = `https://${resourceName}.openai.azure.com/openai/deployments/${deployName}/${path}?api-version=${apiVersion}`;

  const authKey = req.headers.authorization;
  if (!authKey) {
    return res.status(403).send("Not allowed");
  }

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": authKey.replace("Bearer ", ""),
    },
    body: typeof body === "object" ? JSON.stringify(body) : "{}",
  };

  try {
    const response = await fetch(fetchAPI, payload);
    const jsonResponse = await response.json();
    res.json(jsonResponse);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function handleModels(req, res) {
  const data = {
    object: "list",
    data: [],
  };

  for (let key in mapper) {
    data.data.push({
      id: key,
      object: "model",
      created: 1677610602,
      owned_by: "openai",
    });
  }

  res.json(data);
}

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
