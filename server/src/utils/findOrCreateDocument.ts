import Document from "../models/Document"

export const findOrCreateDocument = async (id: string) => {
  if (id == null) return

  const document = await Document.findById(id)

  if (document) return document

  return await Document.create({
    _id: id,
    data: "",
  })
}