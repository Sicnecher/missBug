import { dbService } from '../../data/db.service.js'
import { makeId } from '../../services/utils.js'

export const bugService = {
  query,
  getById,
  remove,
  save,
} 

async function query(filterBy = {}, sortBy = {}) {
    try {
      const criteria = {}  

      if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        criteria.title = { $regex: regExp, $options: 'i' }
      }
      if (filterBy.minSeverity) {
        criteria.balance = { $gte: filterBy.minSeverity }
      }
  
      if (filterBy.labels && filterBy.labels.length) {
        bugsToReturn = bugsToReturn.filter((bug) =>
          filterBy.labels.every((label) => bug.labels.includes(label))
        )
      }

      const collection = await dbService.getCollection('bugs')
      const bugs = await collection.find(criteria).toArray()
      return bugs
    } catch (err) {
      loggerService.error('Couldnt get bugs : ', err)
      throw err
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

async function remove(bugId, loggedinUser) {
    const bugToRemove = await getById(bugId)
    try {
      if (bugToRemove?.owner?._id !== loggedinUser._id && !loggedinUser.isAdmin)
        throw new Error('failed to remove')
  
      const idx = bugs.findIndex((bug) => bug._id === bugId)
      bugs.splice(idx, 1)
  
    } catch (err) {
      throw new Error('Failed to remove bug')
    }
  }

async function save(bugToSave, loggedinUser) {
    try {
      if (!loggedinUser) throw 'loggedinUser is required'
  
      if (bugToSave._id) {
        if (loggedinUser._id !== bugToSave.owner?._id && !loggedinUser.isAdmin)
          throw 'cant save bug'
        const idx = bugs.findIndex((bug) => bug._id === bugToSave._id)
        if (idx === -1) throw 'Bug not found'
        bugs.splice(idx, 1, bugToSave)
      } else {
        do {
          bugToSave._id = makeId()
        } while (bugs.some((bug) => bug._id === bugToSave._id))
        bugToSave.time = Date.now()
        bugToSave.owner = {
          _id: loggedinUser._id,
          fullname: loggedinUser.fullname,
        }
        bugs.push(bugToSave)
      }
      return bugToSave
    } catch (err) {
      console.error('Error saving bug:', err)
      throw err
    }
  }