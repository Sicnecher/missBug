import { bugService } from '../../services/bug.service'

import { store } from '../store'

import {
  SET_BUGS,
  ADD_BUG,
  REMOVE_BUG,
  EDIT_BUG,
  SET_FILTER,
} from './reducer'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

export async function loadBugs(filter = {}) {
  try {
    const bugs = await bugService.query()

    let filteredBugs = bugs

    if (filter.title) {
      filteredBugs = filteredBugs.filter((bug) =>
        bug.title.toLowerCase().includes(filter.title.toLowerCase())
      )
    }

    if (filter.minSeverity !== undefined && filter.minSeverity !== null) {
      filteredBugs = filteredBugs.filter(
        (bug) => bug.severity >= filter.minSeverity
      )
    }

    if (filter.sortByDate) {
      filteredBugs = filteredBugs.sort((a, b) => b.time - a.time) // Sort by date descending
    }

    await store.dispatch({ type: SET_BUGS, bugs: filteredBugs })

    showSuccessMsg('Bugs loaded and filtered!')
  } catch (err) {
    showErrorMsg('Bugs did not load')
    throw err
  }
}

export async function removeBug(bugId) {
  try {
    await bugService.remove(bugId)
    await store.dispatch({ type: REMOVE_BUG, bugId })
    showSuccessMsg('bug removed!')
  } catch (error) {
    showErrorMsg('could not remove bug!')
    throw error
  }
}

export async function addBug(bug) {
  try {
    const savedBug = await bugService.save(bug)
    await store.dispatch({ type: ADD_BUG, bug: savedBug })

    showSuccessMsg('Bug added!')
  } catch (err) {
    showErrorMsg('Bug not added!')
    throw err
  }
}

export async function editBug(bug) {
  try {
    console.log('bug from action:', bug)
    const savedBug = await bugService.save(bug)
    await store.dispatch({ type: EDIT_BUG, bug })
    showSuccessMsg('bug edited!')
  } catch (error) {
    showErrorMsg('failed to edit bug')
    throw error
  }
}

export async function setFilter(filter) {
  await store.dispatch({ type: SET_FILTER, filter: filter })
}

