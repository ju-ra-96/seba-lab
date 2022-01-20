const express = require("express");
const router = express.Router();

const {
  createCluster,
  getClusters,
  getCluster,
  deleteCluster,
  getPods,
} = require("../controllers/cluster");


router.route("/createCluster").post(createCluster);
router.route("/getClusters").get(getClusters);
router.route("/getCluster/:id").get(getCluster);
router.route("/deleteCluster/:id").delete(deleteCluster);
router.route("/getPods/:id").get(getPods);

module.exports = router;
