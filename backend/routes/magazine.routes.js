const router = require("express").Router();
const {
  getAllMagazines,
  getAMagazine,
  createAMagazine,
  updateAMagazine,
  deleteAMagazine,
} = require("../controllers/magazine.controllers");

router.route("/").get(getAllMagazines).post(createAMagazine);
router
  .route("/:id")
  .get(getAMagazine)
  .patch(updateAMagazine)
  .delete(deleteAMagazine);

module.exports = router;
