import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../middlewares/authorization/jwt.utils";
import { sendResponse } from "../utils/responseHandler";
import APIError from "../utils/apiError";
import Subscription from "../models/subscription.model";
import axios from "axios";
interface Subscribe {
    author: any;
    category: string;
    language: string;
    country: string;
}

export const createSubscribe = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const author = req.userId
        const subscribeBody = req.body
        const subscribeData: Subscribe = {
            author,
            category: subscribeBody.category,
            language: subscribeBody.language,
            country: subscribeBody.country
        }
        const createSubscribe = new Subscription(subscribeData)
        const subscribe = await Subscription.create(createSubscribe)
        sendResponse(res, `you subscribed ${subscribe.category} category in ${subscribe.country} in ${subscribe.language} langauge`, subscribe, 201)
    } catch (err) {
        next(new APIError(err.message, err.statusCode))
    }
}

//get all posts 
export const getAllSubscription = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const subscriptions = await Subscription.find({ author: req.userId })
        if (subscriptions.length === 0) throw new APIError("there aren't any Subscriptions", 409)
        sendResponse(res, 'Subscriptions retrieved successfully', subscriptions, 201)
    } catch (err) {
        next(new APIError(err.message, err.status));
    }
}


export const unsubscribe = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const author = req.userId;
        const subscriptionId = req.params.id;
        const subscription = await Subscription.findByIdAndDelete({ _id: subscriptionId, author: author })
        if (!subscription) throw new APIError("subscription not found", 404)
        sendResponse(res, `you are unsubscribe ${subscription.category} category  successfully`, subscription.category, 201)
    } catch (err) {
        next(new APIError(err.message, err.status));
    }
}








