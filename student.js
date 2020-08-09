const mysql = require("./mysql");
const _ = require("lodash");
const { response } = require("express");
const fs = require("fs");

function writeFile(filename, text) {
  return new Promise((resolve, reject) => {
    try {
      let stream = fs.createWriteStream(`./image/${filename}`);
      stream.once("open", function (fd) {
        stream.write(text);
        stream.end();
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
}

function readFile(filename) {
  try {
    let content = fs.readFileSync(filename, "utf8");
    return content;
  } catch (err) {
    return "";
  }
}

exports.getListStudent = async function (req, res, next) {
  let list = await mysql.query("SELECT * FROM sinhvien");
  for (let sv of list) {
    sv.image = readFile(`./image/${sv.image}.txt`);
  }
  res.json({
    status: 200,
    data: list,
  });
};

exports.addStudent = async function (req, res, next) {
  let { msv, ho_ten, lop, sdt, ngay_sinh, dia_chi, image } = req.body;
  // console.log(req.body);
  let filename = `image-${new Date().getTime()}`;
  if (image) {
    await writeFile(`${filename}.txt`, image);
  }
  let result = await mysql.query(
    "INSERT INTO sinhvien(msv, ho_ten, lop, dia_chi, so_dien_thoai, ngay_sinh, image) VALUES (?,?,?,?,?,?,?)",
    [msv, ho_ten, lop, dia_chi, sdt, ngay_sinh, filename]
  );
  res.json({
    status: 200,
    data: result,
  });
};

exports.getStudentById = async function (req, res, next) {
  let id = req.params.id;
  let sv = await mysql.query("SELECT * FROM sinhvien WHERE msv = ? LIMIT 1", [
    id,
  ]);
  if (sv.length) {
    sv = sv[0];
    sv.image = readFile(`./image/${sv.image}.txt`);
  }
  res.json({
    status: 200,
    data: sv,
  });
};

exports.deleteStudent = async function (req, res, next) {
  let id = req.params.id;
  await mysql.query("DELETE FROM sinhvien WHERE msv = ?", [id]);
  res.json({
    status: 200,
    data: [],
  });
};
