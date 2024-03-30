import { Request, Response, NextFunction } from "express";
import postModel from "../models/post.model";
import { CustomRequest } from "../middlewares/authorization/jwt.utils";
import { sendResponse } from "../utils/responseHandler";
import APIError from "../utils/apiError";
interface post {
    author : any;
    title : string;
    body : string;
    image ?: string;
}

// Create post
export const create =async (req : CustomRequest,res:Response , next:NextFunction)=>{
    try{
        const author = req.token._id;
        const postBody = req.body
        const fullPost : post = {
                author,
                title: postBody.title,
                body: postBody.body
        }
        const createPost = new postModel(fullPost)
        const post = await postModel.create(createPost)
        sendResponse(res, 'Post Created', post, 201)
    }catch(err){
        next(new APIError(err.message, err.statusCode))
    }
}

//get all posts 
export const getAllPosts =async(req : CustomRequest,res:Response , next:NextFunction)=>{
    try{
        const posts = await postModel.find()
        if(posts.length === 0) throw new APIError("there aren't any posts" , 409)
        sendResponse(res, 'Posts retrieved successfully', posts, 201)
    }catch(err){
    next(new APIError(err.message, err.status));
    }
}
//get all posts for specific user
export const getPosts =async(req : CustomRequest,res:Response , next:NextFunction)=>{
    try{
        const author = req.token._id;
        const posts = await postModel.find({author: author})
        if(posts.length === 0) throw new APIError("there aren't any posts for this user" , 409)
        sendResponse(res, 'Posts retrieved successfully', posts, 201)
    }catch(err){
    next(new APIError(err.message, err.status));
    }
}

//get single post by post_ID
export const getPost = async(req:CustomRequest, res:Response)=>{
    const postId = req.params.id
    const post = await postModel.findOne({_id:postId})
    if(!post) throw new APIError("post not found", 404)
    sendResponse(res, 'Post retrieved successfully', post, 201)
}

//update post
export const updatePost = async(req:CustomRequest, res:Response, next:NextFunction)=>{
    try{
        const author = req.token._id;
        const postId = req.params.id;

        const post = await postModel.findOneAndUpdate({_id: postId, author: author}, req.body, {new: true})
        if(!post) throw new APIError("post not found", 404)
        sendResponse(res, 'Post updated successfully', post, 201)
    }catch(err){
        next(new APIError(err.message, err.status));
    }
    // const postId = req.params.id
    // const post = await postModel.findOne({_id:postId})
    // if(!post) throw new APIError("post not found", 404)
    // post.title = req.body.title
    // post.body = req.body.body
    // const updatedPost = await post.save()
    // sendResponse(res, 'Post updated successfully', updatedPost, 201)
}

//delete post
export const deletePost = async (req:CustomRequest, res:Response, next:NextFunction)=>{
    try{
        const author = req.token._id;
        const postId = req.params.id;
        const post = await postModel.findOneAndDelete({_id: postId, author: author})
        if(!post) throw new APIError("post not found", 404)
        sendResponse(res, 'Post deleted successfully', post, 201)
    }catch(err){
        next(new APIError(err.message, err.status));
    }
}

