import { Request, Response } from "express";

import { Post } from "../entity/Post";

import { AppDataSource } from "../data-source";

/**
 * Loads all posts from the database.
 */
export async function postGetAllAction(request: Request, response: Response) {
  // get a post repository to perform operations with post
  const postRepository = await AppDataSource.manager.find(Post);

  // load posts
  const posts = await postRepository.find();

  // return loaded posts
  response.send(posts);
}
