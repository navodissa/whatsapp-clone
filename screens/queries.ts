/**
 * @Author: Your name
 * @Date:   2021-08-08 19:58:15
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-08-08 20:01:05
 */
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      imageUri
      status
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
          chatRoom {
              id
              chatRoomUsers {
                  items {
                      user {
                          id
                          name
                          imageUri
                          status
                      }
                  }
              }
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;