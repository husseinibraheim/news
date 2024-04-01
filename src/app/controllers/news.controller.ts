import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../middlewares/authorization/jwt.utils";
import { sendResponse } from "../utils/responseHandler";
import APIError from "../utils/apiError";
import Subscription from "../models/subscription.model";
import axios from "axios";

export const getAllNews = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {

        const endpoint = 'https://newsapi.org/v2/top-headlines/sources';

        const response = await axios.get(endpoint, {
            params: {
                apiKey: process.env.API_KEY
            }
        });
        sendResponse(res, 'you arent subscribed to any news', response.data, 201)
    } catch (err) {
        next(new APIError(err.message, err.status));
    }
}



export const getSubscribedNews = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const userSubscriptions = await Subscription.find({ author: req.userId })
        console.log("userSubscriptions : ", userSubscriptions)
        if (userSubscriptions.length === 0) throw new APIError("you aren't subscribed to any category", 404);
        const endpoint = 'https://newsapi.org/v2/top-headlines/sources';
        let news = []
        for (const subscription of userSubscriptions) {
            console.log("subscription : ", subscription)
            const response = await axios.get(endpoint, {
                params: {
                    apiKey: process.env.API_KEY,
                    category: subscription.category
                }
            });
            const responseData = await response.data
            console.log("response.data : ", responseData.sources)
            news.push(...responseData.sources)
            console.log("newsss : ", news)
        }


        sendResponse(res, "news retrieved successfully", news, 201)
    } catch (err) {
        next(new APIError(err.message, err.status));
    }
}

