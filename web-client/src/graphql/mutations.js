/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: MessageInput) {
    createMessage(input: $input) {
      id
      content
      owner
      createdAt
      roomId
      __typename
    }
  }
`;
export const createRoom = /* GraphQL */ `
  mutation CreateRoom($input: RoomInput) {
    createRoom(input: $input) {
      id
      name
      messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
