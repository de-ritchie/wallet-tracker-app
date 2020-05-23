const { Router } = require("express");
const { joi } = require("../util");

const records = require("../model/records");

const router = Router();

router
  .route("/records")
  .get((req, res) => res.json(records.getRecords()))
  .put((req, res, next) => {
    let { value, error } = joi.validateUpdateRecords(req.body.records);
    if (error) {
      next({
        status: 400,
        message: error
      });
      return;
    }
    records.updateRecords(value);
    res.status(204).send();
  })
  .delete((req, res, next) => {
    let { value, error } = joi.validateIds(req.body.ids);
    if (error) {
      next({
        status: 400,
        message: error
      });
      return;
    }
    records.deleteRecords(value);
    res.status(204).send();
  });

router.post("/record", (req, res, next) => {
  let { value, error } = joi.validateNewRecord(req.body);
  if (error) {
    next({
      status: 400,
      message: error
    });
    return;
  }
  let data = records.addRecord(value);
  res.status(201).json(data);
});

router
  .route("/record/:id")
  .put((req, res, next) => {
    if (req.params.id !== req.body.id) {
      next({
        status: 400,
        message: "update id in url & data mismatch"
      });
      return;
    }
    let { value, error } = joi.validateUpdateRecord(req.body);
    if (error) {
      next({
        status: 400,
        message: error
      });
      return;
    }
    let data = records.updateRecord(req.params.id, value);
    res.status(200).json(data);
  })
  .delete((req, res, next) => {
    let { error } = joi.validateId(req.params.id);
    if (error) {
      next({
        status: 400,
        message: error
      });
      return;
    }
    records.deleteRecord(req.params.id);
    res.status(204).send();
  });

// router.use("*", (req, res, next) => {
//   next({
//     status: 404,
//     message: "You're lost..."
//   });
// });

module.exports = router;
