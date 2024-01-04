const { FieldValue } = require("firebase-admin/firestore");
const { db } = require("../firebase");
const magazinesRef = db.collection("magazines");

const getAllMagazines = async (req, res) => {
  const docs = await magazinesRef.get();
  const data = [];
  docs.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  res.json({ data });
};

const getAMagazine = async (req, res) => {
  const { id } = req.params;
  const magazineRef = magazinesRef.doc(id);
  const doc = await magazineRef.get();
  if (!doc.exists) {
    return res.json({ msg: "No such document!" });
  }
  res.json({ data: { ...doc.data(), id } });
};

const createAMagazine = async (req, res) => {
  await magazinesRef.add({
    ...req.body,
    createdAt: FieldValue.serverTimestamp(),
  });
  res.send({ msg: "Magazine Added Successfully" });
};

const updateAMagazine = async (req, res) => {
  const { id } = req.params;
  const magazineRef = magazinesRef.doc(id);
  await magazineRef.update({
    ...req.body,
    updatedAt: FieldValue.serverTimestamp(),
  });
  res.send({ msg: "Magazine Updated Successfully" });
};

const deleteAMagazine = async (req, res) => {
  const { id } = req.params;
  const magazineRef = magazinesRef.doc(id);
  await magazineRef.delete();
  res.send({ msg: "Magazine Deleted Successfully" });
};

module.exports = {
  getAllMagazines,
  getAMagazine,
  createAMagazine,
  updateAMagazine,
  deleteAMagazine,
};
