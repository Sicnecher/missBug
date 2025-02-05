import express from "express";
import cors from "cors";
import { mainService } from "./services/mainservice.js";

const app = express();

const corsOptions = {
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions), express.json(), express.static("public"));

app.get("/", async (req, res) => {
  const bugs = await mainService.query();
  res.send(bugs);
});

app.get("/api/bugs", async (req, res) => {
  const bugs = await mainService.query();
  res.send(bugs);
});

app.post("/api/bugs", async (req, res) => {
  const bugToSave = req.body;
  const bugs = await mainService.save(bugToSave);
  res.send(bugs);
});

app.get('/api/bugs/:bugId', async (req, res) => {
  const bugId = req.params.bugId
  const bug = await mainService.getById(bugId);

  res.send(bug);
})

app.get('/api/bugs/:bugId/remove', async (req, res) => {
  const bugId = req.params.bugId
  await mainService.remove(bugId)

  res.send(`car with id:${req.params.bugId} deleted`)
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
