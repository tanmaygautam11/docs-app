import mongoose from "mongoose"

const DocumentSchema = new mongoose.Schema({
  _id: String,
  data: {
    type: Object,
    default: {},
  },
})

export default mongoose.model("Document", DocumentSchema)