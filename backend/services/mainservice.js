import { makeId, readJsonFile, writeJsonFile } from './utils.js'

export const mainService = {
  query,
  getById,
  remove,
  save,
}

const bugs = readJsonFile('./data/data.json')

async function query() {
  try {
    return bugs
  } catch (err) {
    throw new Error('Failed to query bugs')
  }
}

async function getById(bugId) {
  try {
    const bug = bugs.find((bug) => bug._id === bugId)
    return bug
  } catch (err) {
    throw new Error('Failed to get bug by ID')
  }
}

async function remove(bugId) {
  try {
    const idx = bugs.findIndex((bug) => bug._id === bugId)
    bugs.splice(idx, 1)

    await writeJsonFile('./data/data.json', bugs)
  } catch (err) {
    throw new Error('Failed to remove bug')
  }
}

async function save(bugToSave) {
  try {
    if (bugToSave._id) {
      const idx = bugs.findIndex((bug) => bug._id === bugToSave._id)
      bugs.splice(idx, 1, bugToSave)
    } else {
      bugToSave._id = makeId()
      bugToSave.time = Date.now()
      console.log(bugToSave, 'from server')

      bugs.push(bugToSave)
    }
  
    await writeJsonFile('./data/data.json', bugs)
    return bugToSave
  } catch (err) {
    console.log(err)
    throw new Error('Failed to save bug')
  }
}
