import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const storySchema = new Schema(
    {
        title:{
            type:"String",
            required:true,
            index:true
        },
        description:{
            type:"String",
            required:true,
            index:true
        },
        story:{
            type:"String",
            required:true,
            index:true 
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },{timestamps:true}
)

storySchema.plugin(mongooseAggregatePaginate)

export const Story = mongoose.model("Story", storySchema)