const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        content: { type: String, required: true },
        // На чьей странице оставлен коммент
        pageId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        // Пользователь который оставил коммент
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
    },
    {
        timestamps: true
    }
);

module.exports = model("Comment", schema);
