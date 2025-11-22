import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Token: { input: any; output: any; }
};

export type ApiArrestLogResponse = {
  __typename?: 'ApiArrestLogResponse';
  data?: Maybe<ArrestLog>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ApiArrestLogsResponse = {
  __typename?: 'ApiArrestLogsResponse';
  data?: Maybe<Array<Maybe<ArrestLog>>>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ApiLikeResponse = {
  __typename?: 'ApiLikeResponse';
  data?: Maybe<Like>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ApiUpsertUserResponse = {
  __typename?: 'ApiUpsertUserResponse';
  data?: Maybe<UpsertUserData>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ApiUsersResponse = {
  __typename?: 'ApiUsersResponse';
  data?: Maybe<Array<Maybe<User>>>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type ArrestLog = {
  __typename?: 'ArrestLog';
  AGE?: Maybe<Scalars['String']['output']>;
  ARREST_STATUS?: Maybe<Scalars['String']['output']>;
  ArrestLocationAptFlr?: Maybe<Scalars['String']['output']>;
  ArrestLocationCity?: Maybe<Scalars['String']['output']>;
  ArrestLocationStreet?: Maybe<Scalars['String']['output']>;
  ArrestLocationStreetNBR?: Maybe<Scalars['String']['output']>;
  Arrest_Charge?: Maybe<Scalars['String']['output']>;
  Arrest_ID?: Maybe<Scalars['String']['output']>;
  Case_Number?: Maybe<Scalars['String']['output']>;
  Charge_Description?: Maybe<Scalars['String']['output']>;
  Charge_Sequence?: Maybe<Scalars['String']['output']>;
  DATE_ARRESTED?: Maybe<Scalars['String']['output']>;
  DOB?: Maybe<Scalars['String']['output']>;
  Degree?: Maybe<Scalars['String']['output']>;
  FIRSTNAME?: Maybe<Scalars['String']['output']>;
  LASTNAME?: Maybe<Scalars['String']['output']>;
  MIDDLENAME?: Maybe<Scalars['String']['output']>;
  OBJECTID?: Maybe<Scalars['Int']['output']>;
  OBJECTID_1?: Maybe<Scalars['Int']['output']>;
  RACE?: Maybe<Scalars['String']['output']>;
  SEX?: Maybe<Scalars['String']['output']>;
  SUFFIX?: Maybe<Scalars['String']['output']>;
  TIME_ARREST?: Maybe<Scalars['String']['output']>;
  UNIQUEKEY?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['Token']['output'];
  user: User;
};

export type CreateArrestLogInput = {
  AGE?: InputMaybe<Scalars['String']['input']>;
  ARREST_STATUS?: InputMaybe<Scalars['String']['input']>;
  ArrestLocationAptFlr?: InputMaybe<Scalars['String']['input']>;
  ArrestLocationCity?: InputMaybe<Scalars['String']['input']>;
  ArrestLocationStreet?: InputMaybe<Scalars['String']['input']>;
  ArrestLocationStreetNBR?: InputMaybe<Scalars['String']['input']>;
  Arrest_Charge?: InputMaybe<Scalars['String']['input']>;
  Arrest_ID?: InputMaybe<Scalars['String']['input']>;
  Case_Number?: InputMaybe<Scalars['String']['input']>;
  Charge_Description?: InputMaybe<Scalars['String']['input']>;
  Charge_Sequence?: InputMaybe<Scalars['String']['input']>;
  DATE_ARRESTED?: InputMaybe<Scalars['String']['input']>;
  DOB?: InputMaybe<Scalars['String']['input']>;
  Degree?: InputMaybe<Scalars['String']['input']>;
  FIRSTNAME?: InputMaybe<Scalars['String']['input']>;
  LASTNAME?: InputMaybe<Scalars['String']['input']>;
  MIDDLENAME?: InputMaybe<Scalars['String']['input']>;
  OBJECTID?: InputMaybe<Scalars['Int']['input']>;
  OBJECTID_1?: InputMaybe<Scalars['Int']['input']>;
  RACE?: InputMaybe<Scalars['String']['input']>;
  SEX?: InputMaybe<Scalars['String']['input']>;
  SUFFIX?: InputMaybe<Scalars['String']['input']>;
  TIME_ARREST?: InputMaybe<Scalars['String']['input']>;
  UNIQUEKEY?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateLikeInput = {
  postId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePostCommentInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreatePostInput = {
  arrestLogId?: InputMaybe<Scalars['Int']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
  imageBase64?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  imageName?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role: Role;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type EmailVerificationToken = {
  __typename?: 'EmailVerificationToken';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expires?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  tokenHash?: Maybe<Scalars['String']['output']>;
  used?: Maybe<Scalars['Boolean']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type GuestPayload = {
  __typename?: 'GuestPayload';
  token: Scalars['Token']['output'];
};

export type Like = {
  __typename?: 'Like';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArrestLog: ArrestLog;
  createLike?: Maybe<ApiLikeResponse>;
  createPost: Post;
  createPostComment: PostComment;
  deleteArrestLog: ArrestLog;
  deletePost: Post;
  deletePostComment: PostComment;
  deleteUser: User;
  login: AuthPayload;
  loginGuest: GuestPayload;
  logout: Scalars['Boolean']['output'];
  registerUser: Scalars['Boolean']['output'];
  resendVerificationEmail: Scalars['Boolean']['output'];
  toggleLike?: Maybe<ApiLikeResponse>;
  updateArrestLog: ArrestLog;
  updateLike?: Maybe<ApiLikeResponse>;
  updatePost: Post;
  updatePostComment: PostComment;
  updateUser: User;
  upsertUser?: Maybe<ApiUpsertUserResponse>;
  verifyEmail: Scalars['Boolean']['output'];
};


export type MutationCreateArrestLogArgs = {
  data?: InputMaybe<CreateArrestLogInput>;
};


export type MutationCreateLikeArgs = {
  data?: InputMaybe<CreateLikeInput>;
};


export type MutationCreatePostArgs = {
  data?: InputMaybe<CreatePostInput>;
};


export type MutationCreatePostCommentArgs = {
  data?: InputMaybe<CreatePostCommentInput>;
};


export type MutationDeleteArrestLogArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePostCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  data?: InputMaybe<LoginInput>;
};


export type MutationRegisterUserArgs = {
  data?: InputMaybe<CreateUserInput>;
};


export type MutationResendVerificationEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationToggleLikeArgs = {
  data?: InputMaybe<ToggleLikeInput>;
};


export type MutationUpdateArrestLogArgs = {
  data?: InputMaybe<UpdateArrestLogInput>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateLikeArgs = {
  data?: InputMaybe<UpdateLikeInput>;
};


export type MutationUpdatePostArgs = {
  data?: InputMaybe<UpdatePostInput>;
  id: Scalars['Int']['input'];
};


export type MutationUpdatePostCommentArgs = {
  data?: InputMaybe<UpdatePostCommentInput>;
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  data?: InputMaybe<UpdateUserInput>;
  id: Scalars['ID']['input'];
};


export type MutationUpsertUserArgs = {
  data?: InputMaybe<UpsertUserInput>;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['Token']['input'];
};

export type Post = {
  __typename?: 'Post';
  arrestLog?: Maybe<ArrestLog>;
  arrestLogId?: Maybe<Scalars['Int']['output']>;
  body?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  imageUrls?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  likes: Array<Like>;
  postComments: Array<PostComment>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type PostComment = {
  __typename?: 'PostComment';
  body?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type PostsInput = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
};

export type PostsPage = {
  __typename?: 'PostsPage';
  cursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  posts: Array<Post>;
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  data?: Maybe<PostsPage>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  arrestLog?: Maybe<ApiArrestLogResponse>;
  arrestLogs?: Maybe<ApiArrestLogsResponse>;
  chatBotResponse: Scalars['String']['output'];
  me: User;
  post: Post;
  postComment: PostComment;
  postComments: Array<PostComment>;
  posts: PostsResponse;
  user: User;
  users?: Maybe<ApiUsersResponse>;
};


export type QueryArrestLogArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryChatBotResponseArgs = {
  prompt: Scalars['String']['input'];
};


export type QueryPostArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPostCommentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPostsArgs = {
  data?: InputMaybe<PostsInput>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export enum Role {
  Guest = 'GUEST',
  User = 'USER'
}

export type ToggleLikeInput = {
  postId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateArrestLogInput = {
  AGE?: InputMaybe<Scalars['String']['input']>;
  ARREST_STATUS?: InputMaybe<Scalars['String']['input']>;
  ArrestLocationAptFlr?: InputMaybe<Scalars['String']['input']>;
  ArrestLocationCity?: InputMaybe<Scalars['String']['input']>;
  ArrestLocationStreet?: InputMaybe<Scalars['String']['input']>;
  ArrestLocationStreetNBR?: InputMaybe<Scalars['String']['input']>;
  Arrest_Charge?: InputMaybe<Scalars['String']['input']>;
  Arrest_ID?: InputMaybe<Scalars['String']['input']>;
  Case_Number?: InputMaybe<Scalars['String']['input']>;
  Charge_Description?: InputMaybe<Scalars['String']['input']>;
  Charge_Sequence?: InputMaybe<Scalars['String']['input']>;
  DATE_ARRESTED?: InputMaybe<Scalars['String']['input']>;
  DOB?: InputMaybe<Scalars['String']['input']>;
  Degree?: InputMaybe<Scalars['String']['input']>;
  FIRSTNAME?: InputMaybe<Scalars['String']['input']>;
  LASTNAME?: InputMaybe<Scalars['String']['input']>;
  MIDDLENAME?: InputMaybe<Scalars['String']['input']>;
  OBJECTID?: InputMaybe<Scalars['Int']['input']>;
  OBJECTID_1?: InputMaybe<Scalars['Int']['input']>;
  RACE?: InputMaybe<Scalars['String']['input']>;
  SEX?: InputMaybe<Scalars['String']['input']>;
  SUFFIX?: InputMaybe<Scalars['String']['input']>;
  TIME_ARREST?: InputMaybe<Scalars['String']['input']>;
  UNIQUEKEY?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLikeInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdatePostCommentInput = {
  body?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertUserData = {
  __typename?: 'UpsertUserData';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type UpsertUserInput = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerificationTokens?: Maybe<Array<Maybe<EmailVerificationToken>>>;
  emailVerified?: Maybe<Scalars['DateTime']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Maybe<Post>>>;
  role: Role;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type ToggleLikeMutationVariables = Exact<{
  data: ToggleLikeInput;
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike?: { __typename?: 'ApiLikeResponse', status?: number | null, message?: string | null, data?: { __typename?: 'Like', id?: number | null, postId?: number | null, userId?: string | null, isActive?: boolean | null, createdAt?: any | null, updatedAt?: any | null } | null } | null };

export type GetPostQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPostQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: number, title?: string | null, body?: string | null, userId?: string | null, createdAt?: any | null, updatedAt?: any | null, arrestLogId?: number | null, imageUrls?: Array<string | null> | null, postComments: Array<{ __typename?: 'PostComment', id: number, body?: string | null, createdAt?: any | null, updatedAt?: any | null, user?: { __typename?: 'User', username?: string | null, role: Role } | null }>, likes: Array<{ __typename?: 'Like', id?: number | null, postId?: number | null, userId?: string | null, isActive?: boolean | null, createdAt?: any | null, updatedAt?: any | null }>, arrestLog?: { __typename?: 'ArrestLog', id?: number | null, AGE?: string | null, ARREST_STATUS?: string | null, ArrestLocationAptFlr?: string | null, ArrestLocationCity?: string | null, ArrestLocationStreet?: string | null, ArrestLocationStreetNBR?: string | null, Arrest_Charge?: string | null, Arrest_ID?: string | null, Case_Number?: string | null, Charge_Description?: string | null, Charge_Sequence?: string | null, DATE_ARRESTED?: string | null, DOB?: string | null, Degree?: string | null, FIRSTNAME?: string | null, LASTNAME?: string | null, MIDDLENAME?: string | null, OBJECTID?: number | null, OBJECTID_1?: number | null, RACE?: string | null, SEX?: string | null, SUFFIX?: string | null, TIME_ARREST?: string | null, UNIQUEKEY?: string | null, createdAt?: any | null, updatedAt?: any | null } | null, user?: { __typename?: 'User', id?: string | null, username?: string | null, role: Role } | null } };

export type GetPostsQueryVariables = Exact<{
  data?: InputMaybe<PostsInput>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostsResponse', status?: number | null, message?: string | null, data?: { __typename?: 'PostsPage', cursor?: number | null, hasNextPage: boolean, posts: Array<{ __typename?: 'Post', id: number, title?: string | null, body?: string | null, userId?: string | null, createdAt?: any | null, updatedAt?: any | null, arrestLogId?: number | null, imageUrls?: Array<string | null> | null, user?: { __typename?: 'User', id?: string | null, username?: string | null, role: Role } | null, postComments: Array<{ __typename?: 'PostComment', id: number, body?: string | null, createdAt?: any | null, updatedAt?: any | null, user?: { __typename?: 'User', username?: string | null, role: Role } | null }>, likes: Array<{ __typename?: 'Like', id?: number | null, postId?: number | null, userId?: string | null, isActive?: boolean | null, createdAt?: any | null, updatedAt?: any | null }> }> } | null } };

export type CreatePostMutationVariables = Exact<{
  data: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: number } };

export type CreatePostCommentMutationVariables = Exact<{
  data: CreatePostCommentInput;
}>;


export type CreatePostCommentMutation = { __typename?: 'Mutation', createPostComment: { __typename?: 'PostComment', id: number, postId?: number | null, body?: string | null, createdAt?: any | null, updatedAt?: any | null } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, username?: string | null, password?: string | null, role: Role, createdAt?: any | null, updatedAt?: any | null } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users?: { __typename?: 'ApiUsersResponse', status?: number | null, message?: string | null, data?: Array<{ __typename?: 'User', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, username?: string | null, password?: string | null, role: Role, createdAt?: any | null, updatedAt?: any | null } | null> | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, username?: string | null, role: Role, createdAt?: any | null, updatedAt?: any | null } };

export type RegisterUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: boolean };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['Token']['input'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: boolean };

export type ResendVerificationEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResendVerificationEmailMutation = { __typename?: 'Mutation', resendVerificationEmail: boolean };

export type UpsertUserMutationVariables = Exact<{
  data: UpsertUserInput;
}>;


export type UpsertUserMutation = { __typename?: 'Mutation', upsertUser?: { __typename?: 'ApiUpsertUserResponse', status?: number | null, message?: string | null, data?: { __typename?: 'UpsertUserData', token?: string | null, user?: { __typename?: 'User', firstname?: string | null, lastname?: string | null, email?: string | null } | null } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, username?: string | null, password?: string | null, createdAt?: any | null, updatedAt?: any | null } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, username?: string | null, role: Role, createdAt?: any | null, updatedAt?: any | null } };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: any, user: { __typename?: 'User', id?: string | null, firstname?: string | null, lastname?: string | null, email?: string | null, username?: string | null, role: Role, password?: string | null, emailVerified?: any | null, createdAt?: any | null, updatedAt?: any | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type LoginGuestMutationVariables = Exact<{ [key: string]: never; }>;


export type LoginGuestMutation = { __typename?: 'Mutation', loginGuest: { __typename?: 'GuestPayload', token: any } };


export const ToggleLikeDocument = gql`
    mutation ToggleLike($data: ToggleLikeInput!) {
  toggleLike(data: $data) {
    data {
      id
      postId
      userId
      isActive
      createdAt
      updatedAt
    }
    status
    message
  }
}
    `;
export type ToggleLikeMutationFn = Apollo.MutationFunction<ToggleLikeMutation, ToggleLikeMutationVariables>;

/**
 * __useToggleLikeMutation__
 *
 * To run a mutation, you first call `useToggleLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikeMutation, { data, loading, error }] = useToggleLikeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useToggleLikeMutation(baseOptions?: Apollo.MutationHookOptions<ToggleLikeMutation, ToggleLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, options);
      }
export type ToggleLikeMutationHookResult = ReturnType<typeof useToggleLikeMutation>;
export type ToggleLikeMutationResult = Apollo.MutationResult<ToggleLikeMutation>;
export type ToggleLikeMutationOptions = Apollo.BaseMutationOptions<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const GetPostDocument = gql`
    query GetPost($id: Int!) {
  post(id: $id) {
    id
    title
    body
    userId
    createdAt
    updatedAt
    arrestLogId
    postComments {
      id
      user {
        username
        role
      }
      body
      createdAt
      updatedAt
    }
    likes {
      id
      postId
      userId
      isActive
      createdAt
      updatedAt
    }
    arrestLog {
      id
      AGE
      ARREST_STATUS
      ArrestLocationAptFlr
      ArrestLocationCity
      ArrestLocationStreet
      ArrestLocationStreetNBR
      Arrest_Charge
      Arrest_ID
      Case_Number
      Charge_Description
      Charge_Sequence
      DATE_ARRESTED
      DOB
      Degree
      FIRSTNAME
      LASTNAME
      MIDDLENAME
      OBJECTID
      OBJECTID_1
      RACE
      SEX
      SUFFIX
      TIME_ARREST
      UNIQUEKEY
      createdAt
      updatedAt
    }
    user {
      id
      username
      role
    }
    imageUrls
  }
}
    `;

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
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables> & ({ variables: GetPostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export function useGetPostSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostSuspenseQueryHookResult = ReturnType<typeof useGetPostSuspenseQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts($data: PostsInput) {
  posts(data: $data) {
    status
    message
    data {
      posts {
        id
        title
        body
        userId
        createdAt
        updatedAt
        arrestLogId
        imageUrls
        user {
          id
          username
          role
        }
        postComments {
          id
          user {
            username
            role
          }
          body
          createdAt
          updatedAt
        }
        likes {
          id
          postId
          userId
          isActive
          createdAt
          updatedAt
        }
      }
      cursor
      hasNextPage
    }
  }
}
    `;

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
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export function useGetPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($data: CreatePostInput!) {
  createPost(data: $data) {
    id
  }
}
    `;
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
 *      data: // value for 'data'
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
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $data: UpdatePostInput!) {
  updatePost(id: $id, data: $data) {
    id
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
 *      id: // value for 'id'
 *      data: // value for 'data'
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
export const CreatePostCommentDocument = gql`
    mutation CreatePostComment($data: CreatePostCommentInput!) {
  createPostComment(data: $data) {
    id
    postId
    body
    createdAt
    updatedAt
  }
}
    `;
export type CreatePostCommentMutationFn = Apollo.MutationFunction<CreatePostCommentMutation, CreatePostCommentMutationVariables>;

/**
 * __useCreatePostCommentMutation__
 *
 * To run a mutation, you first call `useCreatePostCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostCommentMutation, { data, loading, error }] = useCreatePostCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePostCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostCommentMutation, CreatePostCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostCommentMutation, CreatePostCommentMutationVariables>(CreatePostCommentDocument, options);
      }
export type CreatePostCommentMutationHookResult = ReturnType<typeof useCreatePostCommentMutation>;
export type CreatePostCommentMutationResult = Apollo.MutationResult<CreatePostCommentMutation>;
export type CreatePostCommentMutationOptions = Apollo.BaseMutationOptions<CreatePostCommentMutation, CreatePostCommentMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  user(id: $id) {
    id
    firstname
    lastname
    email
    username
    password
    role
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    data {
      id
      firstname
      lastname
      email
      username
      password
      role
      createdAt
      updatedAt
    }
    status
    message
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    firstname
    lastname
    email
    username
    role
    createdAt
    updatedAt
  }
}
    `;

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
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($data: CreateUserInput!) {
  registerUser(data: $data)
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation verifyEmail($token: Token!) {
  verifyEmail(token: $token)
}
    `;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const ResendVerificationEmailDocument = gql`
    mutation resendVerificationEmail($email: String!) {
  resendVerificationEmail(email: $email)
}
    `;
export type ResendVerificationEmailMutationFn = Apollo.MutationFunction<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>;

/**
 * __useResendVerificationEmailMutation__
 *
 * To run a mutation, you first call `useResendVerificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendVerificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendVerificationEmailMutation, { data, loading, error }] = useResendVerificationEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResendVerificationEmailMutation(baseOptions?: Apollo.MutationHookOptions<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>(ResendVerificationEmailDocument, options);
      }
export type ResendVerificationEmailMutationHookResult = ReturnType<typeof useResendVerificationEmailMutation>;
export type ResendVerificationEmailMutationResult = Apollo.MutationResult<ResendVerificationEmailMutation>;
export type ResendVerificationEmailMutationOptions = Apollo.BaseMutationOptions<ResendVerificationEmailMutation, ResendVerificationEmailMutationVariables>;
export const UpsertUserDocument = gql`
    mutation UpsertUser($data: UpsertUserInput!) {
  upsertUser(data: $data) {
    data {
      user {
        firstname
        lastname
        email
      }
      token
    }
    status
    message
  }
}
    `;
export type UpsertUserMutationFn = Apollo.MutationFunction<UpsertUserMutation, UpsertUserMutationVariables>;

/**
 * __useUpsertUserMutation__
 *
 * To run a mutation, you first call `useUpsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertUserMutation, { data, loading, error }] = useUpsertUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpsertUserMutation(baseOptions?: Apollo.MutationHookOptions<UpsertUserMutation, UpsertUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertUserMutation, UpsertUserMutationVariables>(UpsertUserDocument, options);
      }
export type UpsertUserMutationHookResult = ReturnType<typeof useUpsertUserMutation>;
export type UpsertUserMutationResult = Apollo.MutationResult<UpsertUserMutation>;
export type UpsertUserMutationOptions = Apollo.BaseMutationOptions<UpsertUserMutation, UpsertUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $data: UpdateUserInput!) {
  updateUser(id: $id, data: $data) {
    id
    firstname
    lastname
    email
    username
    password
    createdAt
    updatedAt
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    firstname
    lastname
    email
    username
    role
    createdAt
    updatedAt
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const LoginDocument = gql`
    mutation login($data: LoginInput!) {
  login(data: $data) {
    user {
      id
      firstname
      lastname
      email
      username
      role
      password
      emailVerified
      createdAt
      updatedAt
    }
    token
  }
}
    `;
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
 *      data: // value for 'data'
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
    mutation logout {
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
export const LoginGuestDocument = gql`
    mutation loginGuest {
  loginGuest {
    token
  }
}
    `;
export type LoginGuestMutationFn = Apollo.MutationFunction<LoginGuestMutation, LoginGuestMutationVariables>;

/**
 * __useLoginGuestMutation__
 *
 * To run a mutation, you first call `useLoginGuestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginGuestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginGuestMutation, { data, loading, error }] = useLoginGuestMutation({
 *   variables: {
 *   },
 * });
 */
export function useLoginGuestMutation(baseOptions?: Apollo.MutationHookOptions<LoginGuestMutation, LoginGuestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginGuestMutation, LoginGuestMutationVariables>(LoginGuestDocument, options);
      }
export type LoginGuestMutationHookResult = ReturnType<typeof useLoginGuestMutation>;
export type LoginGuestMutationResult = Apollo.MutationResult<LoginGuestMutation>;
export type LoginGuestMutationOptions = Apollo.BaseMutationOptions<LoginGuestMutation, LoginGuestMutationVariables>;