import {getAllTEs} from '@/serverCalls/timeEntries'
import {Report} from "@/components/Report";

async function getData() {
  const res = await getAllTEs()
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return (
    <>
      <h1>Reports</h1>
      <Report timeEntries={data}/>
    </>
  )
}