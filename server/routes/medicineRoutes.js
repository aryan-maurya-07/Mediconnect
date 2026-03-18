const express = require("express");
const router = express.Router();
const multer = require("multer");
const medicineController = require("../controllers/medicineController");
const { uploadMedicine, getMedicines } = require("../controllers/medicineController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), uploadMedicine);
router.get("/user", getMedicines);
router.put("/update-status/:id", medicineController.updateStatus);
router.get("/all", medicineController.getAllMedicines);
router.get("/analytics", medicineController.getAnalytics);
module.exports = router;