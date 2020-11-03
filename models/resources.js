const axios = require("axios");
const nconf = require("nconf");
const { v4: uuid } = require("uuid");

function createFolder(userData, folderName) {
  return new Promise((resolve, reject) => {
    let body = {
      folderId: uuid(),
      userId: userData._id,
      folderName: folderName,
      type: "folder",
    };
    axios
      .post(nconf.get("backendURL"), body)
      .then((response) => {
        resolve({
          error: false,
          data: response.data,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function createFile(userData, folderId, fileData) {
  return new Promise((resolve, reject) => {
    let body = {
      fileId: uuid(),
      userId: userData._id,
      folderId: folderId,
      fileData: fileData,
      type: "file",
    };
    axios
      .post(nconf.get("backendURL"), body)
      .then((response) => {
        resolve({
          error: false,
          data: response.data,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getFileDataById(fileId) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(nconf.get("backendURL") + "/?fileId" + "=" + fileId)
        .then((response) => {
          resolve({
            error: false,
            data: response.data.data,
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (e) {
      reject(e);
    }
  });
}

function getFolderDataById(folderId) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(nconf.get("backendURL") + "/?folderId" + "=" + folderId)
        .then((response) => {
          resolve({
            error: false,
            data: response.data.data,
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (e) {
      reject(e);
    }
  });
}

function getAllResource(userData) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(nconf.get("backendURL") + "/?userId" + "=" + userData._id)
        .then((response) => {
          resolve({
            error: false,
            data: response.data.data,
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  createFile: createFile,
  createFolder: createFolder,
  getFileDataById: getFileDataById,
  getFolderDataById: getFolderDataById,
  getAllResource: getAllResource,
};
