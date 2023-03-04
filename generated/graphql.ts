/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Artist = {
  __typename?: 'Artist';
  created_at: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Auth = {
  __typename?: 'Auth';
  access_token: Scalars['String'];
  expires_in: Scalars['Float'];
  refresh_token: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  auth?: Maybe<Auth>;
  errors?: Maybe<Array<FieldError>>;
  spotify_auth?: Maybe<SpotifyAuth>;
  user?: Maybe<User>;
};

export type Barre = {
  __typename?: 'Barre';
  fret: Scalars['Float'];
  fromString: Scalars['Float'];
  toString: Scalars['Float'];
};

export type ChangeForgotPasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type Chord = {
  __typename?: 'Chord';
  barres: Array<Barre>;
  fingers: Array<Array<Scalars['Float']>>;
  position: Scalars['Float'];
  title: Scalars['String'];
};

export type CreateRemasterInput = {
  artist: Scalars['String'];
  duration: Scalars['Float'];
  key: KeyInput;
  name: Scalars['String'];
  tuning: TuningInput;
  videoID: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Key = {
  __typename?: 'Key';
  colour: Scalars['String'];
  id: Scalars['Float'];
  note: Scalars['String'];
};

export type KeyInput = {
  colour: Scalars['String'];
  id: Scalars['Float'];
  note: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Loop = {
  __typename?: 'Loop';
  chord?: Maybe<Chord>;
  end: Scalars['Float'];
  id: Scalars['Float'];
  key: Key;
  name: Scalars['String'];
  start: Scalars['Float'];
  tab?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeEmail: UserResponse;
  changeForgotPassword: AuthResponse;
  changePassword: UserResponse;
  changeUsername: UserResponse;
  createRemaster: Remaster;
  forgotPassword: Scalars['Boolean'];
  login: AuthResponse;
  loginWithGoogle: AuthResponse;
  loginWithGuestAccess: SpotifyAuth;
  register: AuthResponse;
  registerWithGoogle: AuthResponse;
  sendVerifyEmail: Scalars['Boolean'];
  verifyEmail: UserResponse;
};


export type MutationChangeEmailArgs = {
  email: Scalars['String'];
};


export type MutationChangeForgotPasswordArgs = {
  changeForgotPasswordOptions: ChangeForgotPasswordInput;
};


export type MutationChangePasswordArgs = {
  changePasswordOptions: ChangePasswordInput;
};


export type MutationChangeUsernameArgs = {
  username: Scalars['String'];
};


export type MutationCreateRemasterArgs = {
  remasterInput: CreateRemasterInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  loginOptions: LoginInput;
};


export type MutationRegisterArgs = {
  registerOptions: RegisterInput;
};


export type MutationRegisterWithGoogleArgs = {
  username: Scalars['String'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  remaster?: Maybe<Remaster>;
  remasters: Array<Remaster>;
  userRemaster?: Maybe<Remaster>;
  userRemasters: Array<Remaster>;
  users: Array<User>;
};


export type QueryRemasterArgs = {
  id: Scalars['Float'];
};


export type QueryUserRemasterArgs = {
  id: Scalars['Float'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Remaster = {
  __typename?: 'Remaster';
  artist: Artist;
  artist_id: Scalars['Float'];
  created_at: Scalars['String'];
  creator_id: Scalars['Float'];
  duration: Scalars['Float'];
  id: Scalars['Float'];
  key: Key;
  likes: Scalars['Float'];
  loops: Array<Loop>;
  name: Scalars['String'];
  tuning: Tuning;
  updated_at: Scalars['String'];
  video_id: Scalars['String'];
};

export type SpotifyAuth = {
  __typename?: 'SpotifyAuth';
  spotify_access_token?: Maybe<Scalars['String']>;
  spotify_expires_in?: Maybe<Scalars['Float']>;
};

export type Tuning = {
  __typename?: 'Tuning';
  id: Scalars['Float'];
  name: Scalars['String'];
  notes: Array<Scalars['String']>;
};

export type TuningInput = {
  id: Scalars['Float'];
  name: Scalars['String'];
  notes: Array<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  updated_at: Scalars['String'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type ChangeEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, email: string, username: string, created_at: string, updated_at: string } | null } };

export type ChangeForgotPasswordMutationVariables = Exact<{
  changeForgotPasswordOptions: ChangeForgotPasswordInput;
}>;


export type ChangeForgotPasswordMutation = { __typename?: 'Mutation', changeForgotPassword: { __typename?: 'AuthResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, email: string, username: string, created_at: string, updated_at: string } | null, auth?: { __typename?: 'Auth', access_token: string, refresh_token: string, expires_in: number } | null, spotify_auth?: { __typename?: 'SpotifyAuth', spotify_access_token?: string | null, spotify_expires_in?: number | null } | null } };

export type ChangePasswordMutationVariables = Exact<{
  changePasswordOptions: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, email: string, username: string, created_at: string, updated_at: string } | null } };

export type ChangeUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type ChangeUsernameMutation = { __typename?: 'Mutation', changeUsername: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, email: string, username: string, created_at: string, updated_at: string } | null } };

export type CreateRemasterMutationVariables = Exact<{
  remasterInput: CreateRemasterInput;
}>;


export type CreateRemasterMutation = { __typename?: 'Mutation', createRemaster: { __typename?: 'Remaster', id: number, name: string, artist_id: number, video_id: string, duration: number, likes: number, creator_id: number, created_at: string, updated_at: string, key: { __typename?: 'Key', id: number, note: string, colour: string }, tuning: { __typename?: 'Tuning', id: number, name: string, notes: Array<string> }, loops: Array<{ __typename?: 'Loop', id: number, name: string, type: string, start: number, end: number, tab?: string | null, key: { __typename?: 'Key', id: number, note: string, colour: string }, chord?: { __typename?: 'Chord', title: string, fingers: Array<Array<number>>, position: number, barres: Array<{ __typename?: 'Barre', fromString: number, toString: number, fret: number }> } | null }> } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  loginOptions: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, email: string, username: string, created_at: string, updated_at: string } | null, auth?: { __typename?: 'Auth', access_token: string, refresh_token: string, expires_in: number } | null, spotify_auth?: { __typename?: 'SpotifyAuth', spotify_access_token?: string | null, spotify_expires_in?: number | null } | null } };

export type LoginWithGoogleMutationVariables = Exact<{ [key: string]: never; }>;


export type LoginWithGoogleMutation = { __typename?: 'Mutation', loginWithGoogle: { __typename?: 'AuthResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, email: string, username: string, created_at: string, updated_at: string } | null, auth?: { __typename?: 'Auth', access_token: string, refresh_token: string, expires_in: number } | null, spotify_auth?: { __typename?: 'SpotifyAuth', spotify_access_token?: string | null, spotify_expires_in?: number | null } | null } };

export type LoginWithGuestAccessMutationVariables = Exact<{ [key: string]: never; }>;


export type LoginWithGuestAccessMutation = { __typename?: 'Mutation', loginWithGuestAccess: { __typename?: 'SpotifyAuth', spotify_access_token?: string | null, spotify_expires_in?: number | null } };

export type RegisterMutationVariables = Exact<{
  registerOptions: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, email: string, username: string, created_at: string, updated_at: string } | null, auth?: { __typename?: 'Auth', access_token: string, refresh_token: string, expires_in: number } | null, spotify_auth?: { __typename?: 'SpotifyAuth', spotify_access_token?: string | null, spotify_expires_in?: number | null } | null } };

export type RegisterWithGoogleMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type RegisterWithGoogleMutation = { __typename?: 'Mutation', registerWithGoogle: { __typename?: 'AuthResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, email: string, username: string, created_at: string, updated_at: string } | null, auth?: { __typename?: 'Auth', access_token: string, refresh_token: string, expires_in: number } | null, spotify_auth?: { __typename?: 'SpotifyAuth', spotify_access_token?: string | null, spotify_expires_in?: number | null } | null } };

export type SendVerifyEmailMutationVariables = Exact<{ [key: string]: never; }>;


export type SendVerifyEmailMutation = { __typename?: 'Mutation', sendVerifyEmail: boolean };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, verified: boolean, email: string, username: string, created_at: string, updated_at: string } | null } };

export type UserRemastersQueryVariables = Exact<{ [key: string]: never; }>;


export type UserRemastersQuery = { __typename?: 'Query', userRemasters: Array<{ __typename?: 'Remaster', id: number, name: string, artist_id: number, video_id: string, duration: number, likes: number, creator_id: number, created_at: string, updated_at: string, artist: { __typename?: 'Artist', id: number, name: string, created_at: string, updated_at: string }, key: { __typename?: 'Key', id: number, note: string, colour: string }, tuning: { __typename?: 'Tuning', id: number, name: string, notes: Array<string> }, loops: Array<{ __typename?: 'Loop', id: number, name: string, type: string, start: number, end: number, tab?: string | null, key: { __typename?: 'Key', id: number, note: string, colour: string }, chord?: { __typename?: 'Chord', title: string, fingers: Array<Array<number>>, position: number, barres: Array<{ __typename?: 'Barre', fromString: number, toString: number, fret: number }> } | null }> }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, verified: boolean, email: string, username: string, created_at: string, updated_at: string }> };


export const ChangeEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangeForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changeForgotPasswordOptions"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeForgotPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeForgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"changeForgotPasswordOptions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changeForgotPasswordOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"expires_in"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spotify_auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spotify_access_token"}},{"kind":"Field","name":{"kind":"Name","value":"spotify_expires_in"}}]}}]}}]}}]} as unknown as DocumentNode<ChangeForgotPasswordMutation, ChangeForgotPasswordMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changePasswordOptions"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"changePasswordOptions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changePasswordOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<ChangeUsernameMutation, ChangeUsernameMutationVariables>;
export const CreateRemasterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRemaster"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"remasterInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRemasterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRemaster"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"remasterInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"remasterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"artist_id"}},{"kind":"Field","name":{"kind":"Name","value":"video_id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"key"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tuning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"loops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"key"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"chord"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"fingers"}},{"kind":"Field","name":{"kind":"Name","value":"barres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromString"}},{"kind":"Field","name":{"kind":"Name","value":"toString"}},{"kind":"Field","name":{"kind":"Name","value":"fret"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tab"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"creator_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<CreateRemasterMutation, CreateRemasterMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginOptions"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginOptions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"expires_in"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spotify_auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spotify_access_token"}},{"kind":"Field","name":{"kind":"Name","value":"spotify_expires_in"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LoginWithGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginWithGoogle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWithGoogle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"expires_in"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spotify_auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spotify_access_token"}},{"kind":"Field","name":{"kind":"Name","value":"spotify_expires_in"}}]}}]}}]}}]} as unknown as DocumentNode<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>;
export const LoginWithGuestAccessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginWithGuestAccess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWithGuestAccess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spotify_access_token"}},{"kind":"Field","name":{"kind":"Name","value":"spotify_expires_in"}}]}}]}}]} as unknown as DocumentNode<LoginWithGuestAccessMutation, LoginWithGuestAccessMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerOptions"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerOptions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerOptions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"expires_in"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spotify_auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spotify_access_token"}},{"kind":"Field","name":{"kind":"Name","value":"spotify_expires_in"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const RegisterWithGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterWithGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerWithGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"expires_in"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spotify_auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spotify_access_token"}},{"kind":"Field","name":{"kind":"Name","value":"spotify_expires_in"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterWithGoogleMutation, RegisterWithGoogleMutationVariables>;
export const SendVerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendVerifyEmail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendVerifyEmail"}}]}}]} as unknown as DocumentNode<SendVerifyEmailMutation, SendVerifyEmailMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const UserRemastersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserRemasters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userRemasters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"artist_id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video_id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"key"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tuning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"loops"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"key"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"chord"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"fingers"}},{"kind":"Field","name":{"kind":"Name","value":"barres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fromString"}},{"kind":"Field","name":{"kind":"Name","value":"toString"}},{"kind":"Field","name":{"kind":"Name","value":"fret"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tab"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"creator_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<UserRemastersQuery, UserRemastersQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;