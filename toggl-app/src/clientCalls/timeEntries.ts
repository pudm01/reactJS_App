import {generateLocalUrl, generateUrl} from '@/helpers/generate_url'
import { TimeEntry } from '@/types/timeEntry'

export const createTE = async (timeEntry: TimeEntry) => {
  return await fetch(generateLocalUrl('/time-entries'), {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(timeEntry)
  })
}

export const updateTE = async (timeEntry: TimeEntry) => {
  const user = {...timeEntry, user_name: process.env.NEXT_PUBLIC_USERNAME!}
  return await fetch(generateUrl('/time-entries'), {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
}


export const deleteTE = async (timeEntry: TimeEntry) => {
  const user = {...timeEntry, user_name: process.env.NEXT_PUBLIC_USERNAME!}
  return await fetch(generateUrl('/time-entries'), {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
}