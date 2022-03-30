const express = require("express");
const auth = require("../middleware/auth.middleware");
const Comment = require("../models/Comment");
const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(auth, async (req, res) => {
        try {
            const { orderBy, equalTo } = req.query;
            const list = await Comment.find({ [orderBy]: equalTo });
            res.send(list);
        } catch (e) {
            res.status(500).json({
                message: "There is an error on server. Please try again later"
            });
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newComment = await Comment.create({
                ...req.body,
                userId: req.user._id
            });
            res.status(201).send(newComment);
        } catch (e) {
            res.status(500).json({
                message: "There is an error on server. Please try again later"
            });
        }
    });

router.delete("/:commentId", auth, async (req, res) => {
    try {
        const { commentId } = req.params;
        const removedComment = await Comment.findById(commentId);

        if (removedComment.userId.toString() !== req.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await removedComment.remove();

        res.send(null);
    } catch (e) {
        res.status(500).json({
            message: "There is an error on server. Please try again later"
        });
    }
});

module.exports = router;
