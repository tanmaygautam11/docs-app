import { redirect } from "next/navigation"
import { v4 as uuidV4 } from "uuid"

export default function Home() {
  const id = uuidV4()

  redirect(`/document/${id}`)
}