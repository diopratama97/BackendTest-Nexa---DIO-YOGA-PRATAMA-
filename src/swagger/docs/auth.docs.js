exports.login = () => ({
  tags: ["Auth"],
  description: "Login system",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          examples: {
            success: {
              value: `
                {
                "message": "Berhasil",
                "error": false,
                "data": {
                    "id_admin": 5,
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJ0ZXN0ZGF0YSIsImlhdCI6MTY4OTA2NjU0OH0.tWSQdNkpwh_FjaQlYeTf7FSw9Q9PL7gmLlc6k4Gud1U",
                    "expired_at": "2023-07-13 16:09:08"
                }
                }`,
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
    },
    401: {
      description: "Unauthorized",
    },
  },
});

// export const AgeList = () => ({
//   tags: ["Age"],
//   description: "List Age",
//   responses: {
//     200: {
//       description: "Success",
//       content: {
//         "application/json": {
//           examples: {
//             success: {
//               value: `
//                 {
//                 "message": "Success",
//                 "error": false,
//                 "data": [
//                     {
//                     "id": "e2c3ea40-6495-47ab-aff5-0cd553ea056f",
//                     "startAge": 18,
//                     "endAge": 22
//                     },
//                     {
//                     "id": "0165e9cd-2107-42f0-bcc9-84964ecec09b",
//                     "startAge": 22,
//                     "endAge": 30
//                     }
//                 ]
//                 }`,
//             },
//           },
//         },
//       },
//     },
//     500: {
//       description: "Internal server error",
//     },
//   },
// });

// export const updateAge = (adminAuth: any) => ({
//   tags: ["Age"],
//   security: [
//     {
//       adminAuth,
//     },
//   ],
//   parameters: [
//     {
//       name: "id",
//       in: "path",
//       schema: {
//         type: "string",
//         format: "uuid",
//       },
//       required: true,
//     },
//   ],
//   description: "Update Data Age",
//   requestBody: {
//     content: {
//       "application/json": {
//         schema: {
//           type: "object",
//           properties: {
//             startAge: {
//               type: "integer",
//               example: 18,
//             },
//             endAge: {
//               type: "integer",
//               example: 22,
//             },
//           },
//         },
//       },
//     },
//   },
//   responses: {
//     200: {
//       description: "Success",
//       content: {
//         "application/json": {
//           examples: {
//             success: {
//               value: `
//                 {
//                 "message": "Success",
//                 "error": false,
//                 "data": {
//                     "id": "e2c3ea40-6495-47ab-aff5-0cd553ea056f",
//                     "startAge": 19,
//                     "endAge": 22
//                 }
//                 }`,
//             },
//           },
//         },
//       },
//     },
//     400: {
//       description: "Bad Request",
//     },
//     401: {
//       description: "Unauthorized",
//     },
//   },
// });

// export const deletedAge = (adminAuth: any) => ({
//   tags: ["Age"],
//   security: [
//     {
//       adminAuth,
//     },
//   ],
//   parameters: [
//     {
//       name: "id",
//       in: "path",
//       schema: {
//         type: "string",
//         format: "uuid",
//       },
//       required: true,
//     },
//   ],
//   description: "delete Age",
//   responses: {
//     200: {
//       description: "Success",
//       content: {
//         "application/json": {
//           examples: {
//             success: {
//               value: `
//               {
//                 "message": "Success",
//                 "error": false,
//                 "data": {
//                   "id": "8591ab47-e9f9-4b00-bc7c-9d8a9f0bef92"
//                 }
//               }`,
//             },
//           },
//         },
//       },
//     },
//     400: {
//       description: "Bad Request",
//     },
//     401: {
//       description: "Unauthorized",
//     },
//   },
// });

// export const detailAge = (adminAuth: any) => ({
//   tags: ["Age"],
//   security: [
//     {
//       adminAuth,
//     },
//   ],
//   parameters: [
//     {
//       name: "id",
//       in: "path",
//       schema: {
//         type: "string",
//         format: "uuid",
//       },
//       required: true,
//     },
//   ],
//   description: "detail Age ",
//   responses: {
//     200: {
//       description: "Success",
//       content: {
//         "application/json": {
//           examples: {
//             success: {
//               value: `
//                 {
//                 "message": "Success",
//                 "error": false,
//                 "data": {
//                     "id": "e2c3ea40-6495-47ab-aff5-0cd553ea056f",
//                     "startAge": 18,
//                     "endAge": 22,
//                     "createdAt": "2023-06-20T13:54:34.000Z",
//                     "createdBy": {
//                     "id": "50676d67-7e2b-4db5-841e-1fe352841de4",
//                     "name": "Super Admin",
//                     "role": "SUPERADMIN",
//                     "address": "Milky Way",
//                     "username": "superadmin"
//                     },
//                     "updatedAt": null,
//                     "updatedBy": null
//                 }
//                 }`,
//             },
//           },
//         },
//       },
//     },
//     400: {
//       description: "Bad Request",
//     },
//     401: {
//       description: "Unauthorized",
//     },
//   },
// });
