import { bugService } from "./bug.service.js";

export async function queryBugs(req, res) {
  try {
    const bugs = await bugService.query();
    console.log(bugs)
    res.send(bugs);
  } catch (error) {
    console.log("Error fetching bugs: ", error);
    res.status(400).send({ error: "Couldn't get bugs", details: err.message });
  }
}

export async function saveBug(req, res) {
  const bugToSave = req.body;
  const bugs = await bugService.save(bugToSave);
  res.send(bugs);
}

export async function getBugById(req, res) {
  const bugId = req.params.bugId;
  const bug = await bugService.getById(bugId);

  res.send(bug);
}


export async function removeBug(req, res) {
    const loggedInUser = req.loggedInUser;

    await bugService.remove(req.params.bugId, loggedInUser);
    res.send({ message: "Deleted successfully" });
}

export async function updateBug(req, res) {
    const loggedInUser = req.loggedInUser;

    const bugToSave = { ...req.body };
    const savedBug = await bugService.save(bugToSave, loggedInUser);

    res.send(savedBug);
}