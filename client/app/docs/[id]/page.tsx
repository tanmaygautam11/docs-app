import Editor from "@/src/components/Editor"

export default function DocumentPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Document ID: {params.id}
      </h1>

      <Editor />
    </div>
  )
}