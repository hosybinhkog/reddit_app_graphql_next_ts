import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
};

export type CreatePostInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserMutationResponse;
  createPost: PostMutationResponse;
  deletePost: PostMutationResponse;
  forgotPassword: Scalars['Boolean'];
  login?: Maybe<UserMutationResponse>;
  logout: Scalars['Boolean'];
  register?: Maybe<UserMutationResponse>;
  updatePost: PostMutationResponse;
  vote: PostMutationResponse;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
  token: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationUpdatePostArgs = {
  updatePostInput: UpdatePostInput;
};


export type MutationVoteArgs = {
  inputVoteValue: VoteType;
  postId: Scalars['ID'];
};

export type MutationResponse = {
  code: Scalars['Float'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type PaninatedPosts = {
  __typename?: 'PaninatedPosts';
  cursor: Scalars['DateTime'];
  hashMore: Scalars['Boolean'];
  paninatedPosts: Array<Post>;
  totalCount: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  poins: Scalars['Float'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type PostMutationResponse = MutationResponse & {
  __typename?: 'PostMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message: Scalars['String'];
  post?: Maybe<Post>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  getPost?: Maybe<Post>;
  getPosts?: Maybe<PaninatedPosts>;
  hello: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryGetPostArgs = {
  id: Scalars['ID'];
};


export type QueryGetPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdatePostInput = {
  id: Scalars['ID'];
  text: Scalars['String'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  posts: Array<Post>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export enum VoteType {
  Downvote = 'Downvote',
  Upvote = 'Upvote'
}

export type FieldErrorFragmentsFragment = { __typename?: 'FieldError', field: string, message: string };

export type PostAndUserInfoFragmentsFragment = { __typename?: 'Post', id: string, text: string, title: string, createdAt: any, updatedAt: any, textSnippet: string, userId: string, poins: number, user: { __typename?: 'User', id: string, username: string, email: string } };

export type PostMutaionResponseFragmentsFragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message: string };

type StatusMutationResponse_PostMutationResponse_Fragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message: string };

type StatusMutationResponse_UserMutationResponse_Fragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message: string };

export type StatusMutationResponseFragment = StatusMutationResponse_PostMutationResponse_Fragment | StatusMutationResponse_UserMutationResponse_Fragment;

export type UserMuationResponseFragmentsFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message: string, user?: { __typename?: 'User', id: string, username: string, email: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type UserInfoFragment = { __typename?: 'User', id: string, username: string, email: string };

export type ChangePasswordMutationVariables = Exact<{
  userId: Scalars['String'];
  token: Scalars['String'];
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserMutationResponse', code: number, success: boolean, message: string, user?: { __typename?: 'User', id: string, username: string, email: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreatePostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostMutationResponse', code: number, success: boolean, message: string, post?: { __typename?: 'Post', id: string, text: string, title: string, createdAt: any, updatedAt: any, textSnippet: string, userId: string, poins: number, user: { __typename?: 'User', id: string, username: string, email: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'PostMutationResponse', code: number, success: boolean, message: string } };

export type ForgotPasswordMutationVariables = Exact<{
  forgotPasswordInput: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserMutationResponse', code: number, success: boolean, message: string, user?: { __typename?: 'User', id: string, username: string, email: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'UserMutationResponse', code: number, success: boolean, message: string, user?: { __typename?: 'User', id: string, username: string, email: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } | null };

export type UpdatePostMutationVariables = Exact<{
  updatePostInput: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'PostMutationResponse', success: boolean, code: number, message: string, post?: { __typename?: 'Post', title: string, text: string, textSnippet: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', username: string, id: string, email: string } } | null } };

export type VotePMutationVariables = Exact<{
  inputVoteValue: VoteType;
  postId: Scalars['ID'];
}>;


export type VotePMutation = { __typename?: 'Mutation', vote: { __typename?: 'PostMutationResponse', code: number, success: boolean, message: string } };

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost?: { __typename?: 'Post', id: string, text: string, title: string, createdAt: any, updatedAt: any, textSnippet: string, userId: string, poins: number, user: { __typename?: 'User', id: string, username: string, email: string } } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, email: string } | null };

export type PostIdsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type PostIdsQuery = { __typename?: 'Query', getPosts?: { __typename?: 'PaninatedPosts', paninatedPosts: Array<{ __typename?: 'Post', id: string }> } | null };

export type GetPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts?: { __typename?: 'PaninatedPosts', totalCount: number, cursor: any, hashMore: boolean, paninatedPosts: Array<{ __typename?: 'Post', id: string, text: string, title: string, createdAt: any, updatedAt: any, textSnippet: string, userId: string, poins: number, user: { __typename?: 'User', id: string, username: string, email: string } }> } | null };

export const PostAndUserInfoFragmentsFragmentDoc = gql`
    fragment postAndUserInfoFragments on Post {
  id
  text
  title
  createdAt
  updatedAt
  textSnippet
  userId
  poins
  user {
    id
    username
    email
  }
}
    `;
export const PostMutaionResponseFragmentsFragmentDoc = gql`
    fragment postMutaionResponseFragments on PostMutationResponse {
  code
  success
  message
}
    `;
export const StatusMutationResponseFragmentDoc = gql`
    fragment statusMutationResponse on MutationResponse {
  code
  success
  message
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  username
  email
}
    `;
export const FieldErrorFragmentsFragmentDoc = gql`
    fragment fieldErrorFragments on FieldError {
  field
  message
}
    `;
export const UserMuationResponseFragmentsFragmentDoc = gql`
    fragment userMuationResponseFragments on UserMutationResponse {
  code
  success
  message
  user {
    ...userInfo
  }
  errors {
    ...fieldErrorFragments
  }
}
    ${UserInfoFragmentDoc}
${FieldErrorFragmentsFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($userId: String!, $token: String!, $changePasswordInput: ChangePasswordInput!) {
  changePassword(
    userId: $userId
    token: $token
    changePasswordInput: $changePasswordInput
  ) {
    ...userMuationResponseFragments
  }
}
    ${UserMuationResponseFragmentsFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      token: // value for 'token'
 *      changePasswordInput: // value for 'changePasswordInput'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($createPostInput: CreatePostInput!) {
  createPost(createPostInput: $createPostInput) {
    code
    success
    message
    post {
      ...postAndUserInfoFragments
    }
    errors {
      ...fieldErrorFragments
    }
  }
}
    ${PostAndUserInfoFragmentsFragmentDoc}
${FieldErrorFragmentsFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostInput: // value for 'createPostInput'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: ID!) {
  deletePost(id: $id) {
    code
    success
    message
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
  forgotPassword(forgotPasswordInput: $forgotPasswordInput)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      forgotPasswordInput: // value for 'forgotPasswordInput'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    ...userMuationResponseFragments
  }
}
    ${UserMuationResponseFragmentsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    ...userMuationResponseFragments
  }
}
    ${UserMuationResponseFragmentsFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($updatePostInput: UpdatePostInput!) {
  updatePost(updatePostInput: $updatePostInput) {
    success
    code
    message
    post {
      title
      text
      textSnippet
      createdAt
      updatedAt
      user {
        username
        id
        email
      }
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      updatePostInput: // value for 'updatePostInput'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const VotePDocument = gql`
    mutation voteP($inputVoteValue: VoteType!, $postId: ID!) {
  vote(inputVoteValue: $inputVoteValue, postId: $postId) {
    ...postMutaionResponseFragments
  }
}
    ${PostMutaionResponseFragmentsFragmentDoc}`;
export type VotePMutationFn = Apollo.MutationFunction<VotePMutation, VotePMutationVariables>;

/**
 * __useVotePMutation__
 *
 * To run a mutation, you first call `useVotePMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVotePMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [votePMutation, { data, loading, error }] = useVotePMutation({
 *   variables: {
 *      inputVoteValue: // value for 'inputVoteValue'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVotePMutation(baseOptions?: Apollo.MutationHookOptions<VotePMutation, VotePMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VotePMutation, VotePMutationVariables>(VotePDocument, options);
      }
export type VotePMutationHookResult = ReturnType<typeof useVotePMutation>;
export type VotePMutationResult = Apollo.MutationResult<VotePMutation>;
export type VotePMutationOptions = Apollo.BaseMutationOptions<VotePMutation, VotePMutationVariables>;
export const GetPostDocument = gql`
    query getPost($id: ID!) {
  getPost(id: $id) {
    ...postAndUserInfoFragments
  }
}
    ${PostAndUserInfoFragmentsFragmentDoc}`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostIdsDocument = gql`
    query PostIds($limit: Int!, $cursor: String) {
  getPosts(limit: $limit, cursor: $cursor) {
    paninatedPosts {
      id
    }
  }
}
    `;

/**
 * __usePostIdsQuery__
 *
 * To run a query within a React component, call `usePostIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostIdsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostIdsQuery(baseOptions: Apollo.QueryHookOptions<PostIdsQuery, PostIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostIdsQuery, PostIdsQueryVariables>(PostIdsDocument, options);
      }
export function usePostIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostIdsQuery, PostIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostIdsQuery, PostIdsQueryVariables>(PostIdsDocument, options);
        }
export type PostIdsQueryHookResult = ReturnType<typeof usePostIdsQuery>;
export type PostIdsLazyQueryHookResult = ReturnType<typeof usePostIdsLazyQuery>;
export type PostIdsQueryResult = Apollo.QueryResult<PostIdsQuery, PostIdsQueryVariables>;
export const GetPostsDocument = gql`
    query getPosts($limit: Int!, $cursor: String) {
  getPosts(limit: $limit, cursor: $cursor) {
    totalCount
    cursor
    hashMore
    paninatedPosts {
      ...postAndUserInfoFragments
    }
  }
}
    ${PostAndUserInfoFragmentsFragmentDoc}`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;