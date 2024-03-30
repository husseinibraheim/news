import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import * as postsController from "../controllers/posts.controller"
import path from "path";
import fs from "fs";
import {  CustomRequest, auth } from "../middlewares/authorization/jwt.utils";
import { upload } from "../middlewares/uploadImage.middleware";
import postModel from "../models/post.model";
import { sendResponse } from "../utils/responseHandler";
import APIError from "../utils/apiError";
const router = Router();
interface post {
    author : any;
    title : string;
    body : string;
    image ?: string;
}

// Create post
router.post('/',auth,postsController.create);
//get all posts 

router.get("/posts",postsController.getAllPosts)

//get all posts for specific user
router.get("/",auth,postsController.getPosts)

//get single post
router.get("/:id",postsController.getPost)

//update post 
router.patch("/:id",auth, postsController.updatePost)

//delete post
router.delete("/:id",auth, postsController.deletePost)

//post with image 
router.post("/image",auth,upload.single("image") , async (req:CustomRequest , res:Response , next:NextFunction)=>{
    try{
        const author = req.token._id;
        const postBody = req.body
        const fileName = req.file.filename;
        const fullPost : post = {
                author,
                title: postBody.title,
                body: postBody.body,
                image:fileName
        }
        const createPost = new postModel(fullPost)
        const post = await postModel.create(createPost)
        sendResponse(res, 'Post Created', post, 201)

    }catch(err){
        next(new APIError(err.message, err.statusCode))
    }
} )


// //get post with image 
// router.get('/testimage/:id',async(req:Request, res:Response,next:NextFunction)=>{
// try{
//     const postID = req.params.id
//     const post = await postModel.findById({postID});
//     console.log(post);  
//     if(!post) throw new APIError("post not found",409)
//     const imagePreview = path.join(__dirname, '../../../dist/upload/', post.image);
//     sendResponse(res, 'Post Created', post, 201 , imagePreview);
// }catch(err){
//     next(new APIError(err.message,err.statusCode));
// }

// })

//get single image 
router.get("/image/:filename", (req:Request , res:Response)=>{
        const { filename } = req.params;
        const imagePath = path.join(__dirname, '../../../dist/upload/', filename);
        res.sendFile(imagePath);
      });
export default router;
