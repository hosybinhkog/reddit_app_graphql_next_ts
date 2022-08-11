import { Upvote } from "./../entities/Upvote";
import { PaninatedPosts } from "./../types/PaninatedPosts";
import { User } from "./../entities/User";
import { Context } from "./../types/Context";
import { checkAuth } from "./../middleware/checkAuth";
import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Post } from "./../entities/Post";
import { CreatePostInput } from "./../types/CreatePostInput";
import { PostMutationResponse } from "./../types/PostMutationResponse";
import { UpdatePostInput } from "./../types/UpdatePostInput";
import { FindOptionsOrderValue, LessThan } from "typeorm";
import { VoteType } from "../types/VoteTypeEnum";
import { UserInputError } from "apollo-server-core";

registerEnumType(VoteType, {
  name: "VoteType",
});

@Resolver((_of) => Post)
export class PostResovler {
  @FieldResolver((_return) => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 50);
  }

  @FieldResolver((_return) => User)
  async user(@Root() root: Post) {
    return await User.findOne({ where: { id: root.userId } });
  }

  @Mutation((_returns) => PostMutationResponse)
  @UseMiddleware(checkAuth)
  async createPost(
    @Arg("createPostInput") { title, text }: CreatePostInput,
    @Ctx() { req }: Context
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

      newPost.userId = req.session.userId as string;

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

  @Query((_returns) => PaninatedPosts, { nullable: true })
  async getPosts(
    @Arg("limit", (_type) => Int) limit: number,
    @Arg("cursor", { nullable: true }) cursor?: string
  ): Promise<PaninatedPosts | null> {
    try {
      const totalCount = await Post.count();
      const realtLimit = Math.min(10, limit);

      const findOptions: { [key: string]: any } = {
        order: {
          createdAt: "DESC" as FindOptionsOrderValue | undefined,
        },
        take: realtLimit,
      };

      let lastPost: Post[] = [];

      if (cursor) {
        findOptions.where = {
          createdAt: LessThan(cursor),
        };

        lastPost = await Post.find({
          order: { createdAt: "ASC" },
          take: 1,
        });
      }

      const posts = await Post.find(findOptions);
      console.log(posts);

      return {
        totalCount,
        cursor: posts[posts.length - 1].createdAt,
        hashMore: cursor
          ? posts[posts.length - 1].createdAt.toString() !==
            lastPost[0].createdAt.toString()
          : posts.length !== totalCount,
        paninatedPosts: posts,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Query((_return) => Post, { nullable: true })
  async getPost(@Arg("id", (_type) => ID) id: number): Promise<Post | null> {
    try {
      const post = await Post.findOne({ where: { id } });

      return post;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Mutation((_returns) => PostMutationResponse)
  @UseMiddleware(checkAuth)
  async updatePost(
    @Arg("updatePostInput") { title, text, id }: UpdatePostInput,
    @Ctx() { req }: Context
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

      if ((req.session.userId as String) !== updatePost.userId) {
        return {
          code: 401,
          success: false,
          message: "U only can update your post",
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

  @Mutation((_returns) => PostMutationResponse)
  @UseMiddleware(checkAuth)
  async deletePost(
    @Arg("id", (_type) => ID) id: number,
    @Ctx() { req }: Context
  ): Promise<PostMutationResponse> {
    try {
      const deletePost = await Post.findOne({ where: { id } });

      if (!deletePost) {
        return {
          code: 404,
          message: "not found delete post",
          success: false,
        };
      }

      if ((req.session.userId as String) !== deletePost.userId) {
        return {
          code: 401,
          success: false,
          message: "U only can update your post",
        };
      }

      await deletePost?.remove();

      return {
        code: 200,
        success: true,
        message: "delete post success",
      };
    } catch (error) {
      console.log("delete post ", error);
      return {
        code: 500,
        message: "server internal",
        success: false,
      };
    }
  }

  @Mutation((_return) => PostMutationResponse)
  @UseMiddleware(checkAuth)
  async vote(
    @Arg("postId", (_type) => ID) postId: number,
    @Arg("inputVoteValue", (_type) => VoteType) inputVoteValue: VoteType,
    @Ctx()
    {
      req: {
        session: { userId },
      },
      connection,
    }: Context
  ): Promise<PostMutationResponse> {
    return await connection.transaction(async (transactionEntityManager) => {
      // check if post exists
      let post = await transactionEntityManager.findOne(Post, {
        where: { id: postId },
      });
      if (!post) {
        throw new UserInputError("Post not found");
      }

      // check if user has voted or not
      const existingVote = await transactionEntityManager.findOne(Upvote, {
        where: { postId, userId },
      });

      if (existingVote && existingVote.value !== inputVoteValue) {
        await transactionEntityManager.save(Upvote, {
          ...existingVote,
          value: inputVoteValue,
        });

        post = await transactionEntityManager.save(Post, {
          ...post,
          poins: post.poins + 2 * inputVoteValue,
        });
      }

      if (!existingVote) {
        const newVote = transactionEntityManager.create(Upvote, {
          userId,
          postId,
          value: inputVoteValue,
        });
        await transactionEntityManager.save(newVote);

        post.poins = post.poins + inputVoteValue;
        post = await transactionEntityManager.save(post);
      }

      return {
        code: 200,
        success: true,
        message: "Post voted",
        post,
      };
    });
  }
}
