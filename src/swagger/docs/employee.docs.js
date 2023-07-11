exports.create = (auth) => ({
  security: [
    {
      auth,
    },
  ],
  tags: ["Employee"],
  description: "Pendaftaran karyawan",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            address: {
              type: "string",
            },
            gender: {
              type: "string",
            },
            photo: {
              type: "string",
            },
            dateOfBirth: {
              type: "string",
              example: "2022-02-02",
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
                    "nip": "20233481",
                    "nama": "string",
                    "alamat": "string",
                    "gend": "L",
                    "photo": "c3RyaW5n",
                    "tgl_lahir": "2022-02-02",
                    "insert_by": "testdata"
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

exports.list = (auth) => ({
  tags: ["Employee"],
  security: [
    {
      auth,
    },
  ],
  parameters: [
    {
      name: "start",
      in: "query",
      schema: {
        type: "integer",
      },
      description: "start untuk memulai dari angka 1, default 1",
    },
    {
      name: "count",
      in: "query",
      schema: {
        type: "integer",
      },
      description: "count untuk jumlah data yang akan ditampilkan, default 10",
    },
    {
      name: "keyword",
      in: "query",
      schema: {
        type: "string",
      },
      description: "mencari karyawan berdasarkan nama karyawan",
    },
  ],
  description: "List Karyawan pagination, order by insert_at DESC",
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
                    "start": 1,
                    "count": 2,
                    "totalPage": 50,
                    "total": 99,
                    "rows": [
                    {
                        "nip": "20230120",
                        "nama": "Oyaji kampret",
                        "alamat": "Pati",
                        "gend": "P",
                        "photo": null,
                        "tgl_lahir": "2023-05-26T17:00:00.000Z",
                        "status": 1,
                        "insert_at": "2023-05-24T07:56:40.000Z",
                        "insert_by": "admindata",
                        "update_at": "2023-05-24T09:40:24.000Z",
                        "update_by": "admindata"
                    },
                    {
                        "nip": "20230119",
                        "nama": "Taqin",
                        "alamat": "Jepara",
                        "gend": "P",
                        "photo": null,
                        "tgl_lahir": "2023-05-23T17:00:00.000Z",
                        "status": 0,
                        "insert_at": "2023-05-24T07:52:31.000Z",
                        "insert_by": "admindata",
                        "update_at": "2023-05-24T09:49:13.000Z",
                        "update_by": "admindata"
                    }
                    ]
                }
                }`,
            },
          },
        },
      },
    },
    500: {
      description: "Internal server error",
    },
  },
});

exports.detail = (auth) => ({
  tags: ["Employee"],
  security: [
    {
      auth,
    },
  ],
  parameters: [
    {
      name: "nip",
      in: "path",
      schema: {
        type: "string",
      },
      required: true,
    },
  ],
  description: "detail karyawan berdasarkan nip",
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
                    "nip": "20230120",
                    "nama": "Oyaji kampret",
                    "alamat": "Pati",
                    "gend": "P",
                    "photo": null,
                    "tgl_lahir": "2023-05-26T17:00:00.000Z",
                    "status": 1,
                    "insert_at": "2023-05-24T07:56:40.000Z",
                    "insert_by": "admindata",
                    "update_at": "2023-05-24T09:40:24.000Z",
                    "update_by": "admindata"
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

exports.update = (auth) => ({
  tags: ["Employee"],
  security: [
    {
      auth,
    },
  ],
  parameters: [
    {
      name: "nip",
      in: "path",
      schema: {
        type: "string",
      },
      required: true,
    },
  ],
  description: "Update Data karyawan",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            address: {
              type: "string",
            },
            gender: {
              type: "string",
            },
            photo: {
              type: "string",
            },
            dateOfBirth: {
              type: "string",
              example: "2022-02-02",
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
                    "nama": "string1234",
                    "alamat": "string",
                    "gend": "P",
                    "photo": "c3RyaW5nMTIzNA==",
                    "tgl_lahir": "2022-02-09",
                    "update_by": "testdata",
                    "update_at": "2023-07-11T15:09:44.185Z"
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

exports.nonactive = (auth) => ({
  tags: ["Employee"],
  security: [
    {
      auth,
    },
  ],
  parameters: [
    {
      name: "nip",
      in: "path",
      schema: {
        type: "string",
      },
      required: true,
    },
  ],
  description: "nonactive karyawan berdasarkan nip",
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
                    "nip": "20237457"
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
