"use client"

import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthButton() {

  const { data: session } = useSession()

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
    )
  }

  return (
    <div className="flex items-center gap-4">
      {session.user?.image ? (
        <Image
          src={session.user.image}
          alt={session.user?.name ?? "User avatar"}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
          {session.user?.name?.[0] ?? "?"}
        </div>
      )}

      <span>{session.user?.name}</span>

      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  )
}