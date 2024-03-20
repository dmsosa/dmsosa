import axios, { AxiosError } from "axios"
import { TComment } from "../types/Comment"
import { errorHandler } from "./handleError";

export type TCommentData = {
    comments: TComment[],
    commentsCount: number
}


let instance = axios.create({
    baseURL:"/api/articles/comments",
    timeout: 1000
});

export async function getCommentsOfArticle({ slug } : {
    slug: string
}) : Promise<TCommentData> {

    try {
        const { data }: { data: TCommentData } = await instance.request({
             method: "GET",
             params: { slug: slug }
            });
        return data;

    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}

export async function postComment({ body, headers, slug } : {
    body: string,
    headers: object,
    slug: string | undefined
}) : Promise<TCommentData> {
    try {

        const { data } = await instance.request({
            method: "POST",
            headers: headers,
            params: { slug: slug },
            data: { body: body }
        })

        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}

export async function editComment({ headers, commentId } : {
    headers: object,
    commentId: number
}) : Promise<TComment> {
    try {
        const { data } = await instance.request({
            method: "PUT",
            url: `/${commentId}`,
            headers: headers
        })

        return data;

    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}