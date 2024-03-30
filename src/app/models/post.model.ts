import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

postSchema.virtual("imagePath").get(function () {
  return "http://localhost:3000/" + this.image;
});
const Post = mongoose.model("Post", postSchema);
export default Post;
