import axios from "axios";

const myAxios = axios.create({
  withCredentials: true, // Send cookies with requests (if needed)
});

export const bugService = {
  query,
  getById,
  save,
  remove,
};

async function query() {
  const { data } = await myAxios.get("http://localhost:3000/api/bugs");
  console.log("data:", data);
  return data;
}
async function getById(bugId) {
  const { data } = await myAxios.get(`http://localhost:3000/api/bugs/${bugId}`);
  return data;
}

async function remove(bugId) {
  const { data } = await myAxios.get(
    `http://localhost:3000/api/bugs/${bugId}/remove`
  );
  return data;
}

async function save(bug) {
  const { data } = await myAxios.post("http://localhost:3000/api/bugs", bug);
  return data;
}