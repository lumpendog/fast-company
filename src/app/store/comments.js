import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) state.entities = [];
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            if (action.payload.content === null) {
                state.entities = state.entities.filter(
                    (c) => c._id !== action.payload.id
                );
            }
        }
    }
});

const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateFailed = createAction("comments/commentCreateFailed");
const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const commentRemoveFailed = createAction("comments/commentRemoveFailed");

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsRecieved,
    commentsRequestFailed,
    commentCreated,
    commentRemoved
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsRecieved(content));
    } catch (error) {
        dispatch(commentsRequestFailed());
    }
};

export const createComment =
    ({ data, userId, currentUserId }) =>
    async (dispatch) => {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            userId: currentUserId,
            created_at: Date.now()
        };
        dispatch(commentCreateRequested());
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(commentCreated(content));
        } catch (error) {
            dispatch(commentCreateFailed(error.message));
        }
    };

export const removeComment = (id) => async (dispatch) => {
    dispatch(commentRemoveRequested());
    try {
        const { content } = await commentService.removeComment(id);
        dispatch(commentRemoved({ content, id }));
    } catch (error) {
        dispatch(commentRemoveFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
