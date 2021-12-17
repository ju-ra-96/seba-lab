const express = require("express");
const router = express.Router();

const {
  createCluster,
  getClusters,
  getCluster,
  deleteCluster,
  getNamespaces,
  getNodes,
  getPods,
  getServices
} = require("../controllers/cluster");


router.route("/createCluster").post(createCluster);
router.route("/getClusters").get(getClusters);
router.route("/getCluster/:id").get(getCluster);
router.route("/deleteCluster/:id").delete(deleteCluster);
router.route("/getNamespaces/:id").get(getNamespaces);
router.route("/getServices/:id").get(getServices);
router.route("/getPods/:id").get(getPods);
router.route("/getNodes/:id").get(getNodes);

module.exports = router;
