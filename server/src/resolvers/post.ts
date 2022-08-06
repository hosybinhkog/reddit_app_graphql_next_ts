import { checkAuth } from './../middleware/checkAuth';
import { Arg, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Post } from "./../entities/Post";
import { CreatePostInput } from "./../types/CreatePostInput";
import { PostMutationResponse } from "./../types/PostMutationResponse";
import { UpdatePostInput } from "./../types/UpdatePostInput";


@Resolver()
export class PostResovler {
  @Mutation((_returns) => PostMutationResponse)
  @UseMiddleware(checkAuth)
  async createPost(
    @Arg("createPostInput") { title, text }: CreatePostInput
  ): Promise<PostMutationResponse> {
    try {
      const newPost = await Post.create({ title, text });

      if (!newPost) {
        return {
          code: 500,
          success: false,
          message: "create post error server",
        };
      }

      await newPost.save();

      return {
        code: 200,
        message: "create post successfully",
        success: true,
        post: newPost,
      };
    } catch (error) {
      return {
        code: 500,
        message: "server interal create Post",
        success: false,
      };
    }
  }

  @Query((_returns) => [Post] , { nullable: true })
  async getPosts(): Promise<Post[] | null> {
    try {
      return await Post.find();
    } catch (error) {
      console.log(error)
      return null
    }
  }

  @Query((_return) => Post, { nullable: true })
  async getPost(@Arg("id", (_type) => ID) id: number): Promise<Post | null> {
   try {
    const post = await Post.findOne({ where: { id } });

    return post;
   } catch (error) {
    console.log(error)
    return null
   }
  }

  @Mutation((_returns) => PostMutationResponse)
  @UseMiddleware(checkAuth)
  async updatePost(
    @Arg("updatePostInput") { title, text, id }: UpdatePostInput
  ): Promise<PostMutationResponse> {
    try {
      const updatePost = await Post.findOne({ where: { id } });

      if (!updatePost) {
        return {
          code: 404,
          success: false,
          message: "Post not found",
        };
      }

      updatePost.text = text;
      updatePost.title = title;
      updatePost.updatedAt = new Date(Date.now());

      await updatePost.save();

      return {
        code: 200,
        success: true,
        message: "update post successfully",
        post: updatePost,
      };
    } catch (error) {
      return {
        code: 500,
        message: "server interal UpdatePost",
        success: false,
      };
    }
  }

  @Mutation(_returns => PostMutationResponse)
  @UseMiddleware(checkAuth)
  async deletePost(@Arg('id', (_type) => ID) id: number):Promise<PostMutationResponse>{
    try {
      const deletePost = await Post.findOne({ where: { id } });
      
      if(!deletePost){
        return {
          code: 404,
          message: 'not found delete post',
          success: false
        }
      }

      await deletePost?.remove()

      return {
        code: 200,
        success: true,
        message: 'delete post success'
      }

    } catch (error) {
      console.log('delete post ', error)
      return {
        code: 500,
        message: 'server internal',
        success: false,
      }
    }
  }
}
