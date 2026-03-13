// "use client"

// import { useParams } from "next/navigation"
// import Editor from "@/src/components/Editor"

// export default function DocumentPage() {
//   const params = useParams()
//   const id = params?.id as string

//   return (
//     <div>
//       <Editor documentId={id} />
//     </div>
//   )
// }
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"

export default async function Page() {

  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>Please login</div>
  }

  return (
    <div>
      Welcome {session.user.name}
    </div>
  )
}