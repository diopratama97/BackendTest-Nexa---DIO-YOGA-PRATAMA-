const responseHandler = require("../../helpers/responseHandler");
const { knex } = require("../../config/db");
const moment = require("moment");
const { createEmployee, listEmployee, updateEmployee } = require("./schema");
const { createLog } = require("../../helpers/logApi");

exports.create = async (req, res) => {
  try {
    const { error, value } = createEmployee.validate(req.body);
    if (error) {
      return responseHandler.jsonError(res, error.message);
    }

    const checkName = await knex("karyawan")
      .select("nip")
      .where("nama", value.name)
      .first();

    if (checkName) {
      return responseHandler.duplicated(res, "Karyawan sudah terdaftar!");
    }

    const datas = {
      nip: `${moment().year()}${Math.floor(1000 + Math.random() * 9000)}`,
      nama: value.name,
      alamat: value.address,
      gend: value.gender,
      photo: Buffer.from(value.photo).toString("base64"),
      tgl_lahir: moment(value.dateOfBirth).format("YYYY-MM-DD"),
      insert_by: req.user.username,
    };

    await Promise.all([
      knex("karyawan").insert(datas),
      createLog(req, value, req.user.id, {
        message: "Berhasil",
        error: false,
        data: datas,
      }),
    ]);

    return responseHandler.jsonSuccess(res, datas, "Berhasil");
  } catch (error) {
    await createLog(req, req.body, req.user.id, {
      message: error.message,
      error: true,
      errorDetail: error,
    });
    return responseHandler.serverError(res);
  }
};

exports.list = async (req, res) => {
  try {
    const { error, value } = listEmployee.validate(req.query);
    if (error) {
      return responseHandler.jsonError(res, error.message);
    }
    const offset = (value.start - 1) * value.count;

    const builder = knex("karyawan").orderBy("insert_at", "desc");

    if (value.keyword) {
      builder.whereRaw(
        `lower(nama) LIKE '%${String(value.keyword).toLowerCase()}%'`
      );
    }

    const [count, data] = await Promise.all([
      builder.clone().count("nip as total").first(),
      builder.select("*").limit(value.count).offset(offset),
    ]);

    const resp = {
      start: value.start,
      count: value.count,
      totalPage: Math.ceil(Number(count.total) / value.count),
      total: Number(count.total),
      rows: data,
    };

    await createLog(req, value, req.user.id, {
      message: "Berhasil",
      error: false,
      data: resp,
    });

    return responseHandler.jsonSuccess(res, resp, "Berhasil");
  } catch (error) {
    await createLog(req, req.body, req.user.id, {
      message: error.message,
      error: true,
      errorDetail: error,
    });
    return responseHandler.serverError(res);
  }
};

exports.detail = async (req, res) => {
  try {
    if (!req.params.nip) {
      return responseHandler.notFound(res, "nip tidak ditemukan!");
    }

    const data = await knex("karyawan")
      .select("*")
      .where("nip", req.params.nip)
      .first();

    if (!data) {
      return responseHandler.notFound(res, "data tidak ditemukan!");
    }

    await createLog(req, req.params, req.user.id, {
      message: "Berhasil",
      error: false,
      data,
    });

    return responseHandler.jsonSuccess(res, data, "Berhasil");
  } catch (error) {
    await createLog(req, req.params, req.user.id, {
      message: error.message,
      error: true,
      errorDetail: error,
    });
    return responseHandler.serverError(res);
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.params.nip) {
      return responseHandler.notFound(res, "nip tidak ditemukan!");
    }

    const { error, value } = updateEmployee.validate(req.body);
    if (error) {
      return responseHandler.jsonError(res, error.message);
    }

    const checkNip = await knex("karyawan")
      .select("*")
      .where("nip", req.params.nip)
      .first();

    if (!checkNip) {
      return responseHandler.notFound(res, "data tidak ditemukan!");
    }
    if (value.name && checkNip.nama !== value.name) {
      const checkName = await knex("karyawan")
        .select("nip")
        .where("nama", value.name)
        .first();
      if (checkName) {
        return responseHandler.duplicated(res, "Nama sudah terdaftar!");
      }
    }

    const datas = {
      nama: value.name ? value.name : checkNip.nama,
      alamat: value.address ? value.address : checkNip.alamat,
      gend: value.gender ? value.gender : checkNip.gend,
      photo: value.photo
        ? Buffer.from(value.photo).toString("base64")
        : checkNip.photo,
      tgl_lahir: value.dateOfBirth
        ? moment(value.dateOfBirth).format("YYYY-MM-DD")
        : checkNip.tgl_lahir,
      update_by: req.user.username,
      update_at: new Date(),
    };

    await Promise.all([
      knex("karyawan").update(datas).where("nip", checkNip.nip),
      createLog(req, { params: req.params, body: req.body }, req.user.id, {
        message: "Berhasil",
        error: false,
        data: datas,
      }),
    ]);

    return responseHandler.jsonSuccess(res, datas, "Berhasil");
  } catch (error) {
    await createLog(req, { params: req.params, body: req.body }, req.user.id, {
      message: error.message,
      error: true,
      errorDetail: error,
    });
    return responseHandler.serverError(res);
  }
};

exports.nonactive = async (req, res) => {
  try {
    if (!req.params.nip) {
      return responseHandler.notFound(res, "nip tidak ditemukan!");
    }

    const data = await knex("karyawan")
      .select("*")
      .where("nip", req.params.nip)
      .first();

    if (!data) {
      return responseHandler.notFound(res, "data tidak ditemukan!");
    }

    await Promise.all([
      knex("karyawan").update("status", 9).where("nip", req.params.nip),
      createLog(req, req.params, req.user.id, {
        message: "Berhasil",
        error: false,
        data: req.params,
      }),
    ]);

    return responseHandler.jsonSuccess(res, req.params, "Berhasil");
  } catch (error) {
    await createLog(req, req.params, req.user.id, {
      message: error.message,
      error: true,
      errorDetail: error,
    });
    return responseHandler.serverError(res);
  }
};
