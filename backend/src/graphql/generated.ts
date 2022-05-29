import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Avatar = {
  __typename?: 'Avatar';
  avatar_url: Scalars['String'];
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _root?: Maybe<Scalars['String']>;
  addElementToShippingList?: Maybe<Scalars['Boolean']>;
  authUser: UserAuth;
  decryptToken: TokenDecrypted;
  deleteElementFromShippingList?: Maybe<Scalars['Boolean']>;
  updateUser?: Maybe<Scalars['Boolean']>;
};


export type MutationAddElementToShippingListArgs = {
  input: ShippingElement;
};


export type MutationAuthUserArgs = {
  input: UserLoginInput;
};


export type MutationDecryptTokenArgs = {
  token: Scalars['String'];
};


export type MutationDeleteElementFromShippingListArgs = {
  idShippingList: Scalars['Int'];
  idUser: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  idUser: Scalars['Int'];
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  _root?: Maybe<Scalars['String']>;
  getUser?: Maybe<UserData>;
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type ShippingElement = {
  element: Scalars['String'];
  idUser: Scalars['Int'];
};

export type ShippingList = {
  __typename?: 'ShippingList';
  element: Scalars['String'];
  id: Scalars['Int'];
  id_user: Scalars['Int'];
};

export type TokenDecrypted = {
  __typename?: 'TokenDecrypted';
  email: Scalars['String'];
  exp: Scalars['Int'];
  first_name: Scalars['String'];
  iat: Scalars['Int'];
  id: Scalars['Int'];
  id_shopping_cart: Scalars['Int'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
};

export type UserAuth = {
  __typename?: 'UserAuth';
  token: Scalars['String'];
};

export type UserData = {
  __typename?: 'UserData';
  Avatar?: Maybe<Avatar>;
  ShippingList?: Maybe<Array<Maybe<ShippingList>>>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  last_name?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserInput = {
  avatar?: InputMaybe<Scalars['Upload']>;
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserLoginInput = {
  password: Scalars['String'];
  userName: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Avatar: ResolverTypeWrapper<Avatar>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ShippingElement: ShippingElement;
  ShippingList: ResolverTypeWrapper<ShippingList>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TokenDecrypted: ResolverTypeWrapper<TokenDecrypted>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  UserAuth: ResolverTypeWrapper<UserAuth>;
  UserData: ResolverTypeWrapper<UserData>;
  UserInput: UserInput;
  UserLoginInput: UserLoginInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Avatar: Avatar;
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  ShippingElement: ShippingElement;
  ShippingList: ShippingList;
  String: Scalars['String'];
  TokenDecrypted: TokenDecrypted;
  Upload: Scalars['Upload'];
  UserAuth: UserAuth;
  UserData: UserData;
  UserInput: UserInput;
  UserLoginInput: UserLoginInput;
};

export type AvatarResolvers<ContextType = any, ParentType extends ResolversParentTypes['Avatar'] = ResolversParentTypes['Avatar']> = {
  avatar_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addElementToShippingList?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddElementToShippingListArgs, 'input'>>;
  authUser?: Resolver<ResolversTypes['UserAuth'], ParentType, ContextType, RequireFields<MutationAuthUserArgs, 'input'>>;
  decryptToken?: Resolver<ResolversTypes['TokenDecrypted'], ParentType, ContextType, RequireFields<MutationDecryptTokenArgs, 'token'>>;
  deleteElementFromShippingList?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteElementFromShippingListArgs, 'idShippingList' | 'idUser'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'idUser' | 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['UserData']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
};

export type ShippingListResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShippingList'] = ResolversParentTypes['ShippingList']> = {
  element?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_user?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenDecryptedResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenDecrypted'] = ResolversParentTypes['TokenDecrypted']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iat?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id_shopping_cart?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserAuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAuth'] = ResolversParentTypes['UserAuth']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserData'] = ResolversParentTypes['UserData']> = {
  Avatar?: Resolver<Maybe<ResolversTypes['Avatar']>, ParentType, ContextType>;
  ShippingList?: Resolver<Maybe<Array<Maybe<ResolversTypes['ShippingList']>>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Avatar?: AvatarResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ShippingList?: ShippingListResolvers<ContextType>;
  TokenDecrypted?: TokenDecryptedResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  UserAuth?: UserAuthResolvers<ContextType>;
  UserData?: UserDataResolvers<ContextType>;
};

