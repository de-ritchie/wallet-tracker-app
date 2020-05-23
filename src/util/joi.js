const Joi = require("@hapi/joi");

const idSchema = Joi.string()
  .min(3)
  .required();

const recordSchema = Joi.object({
  desc: Joi.string()
    .min(5)
    .required(),
  date: Joi.date().required(),
  type: Joi.string()
    .valid("expense", "income")
    .required(),
  amount: Joi.number().required(),
  id: idSchema.optional()
});

const validateId = id => idSchema.validate(id);

const validateIds = ids =>
  Joi.array()
    .items(idSchema)
    .required()
    .validate(ids);

const validateNewRecord = (record, strip = true) =>
  recordSchema.validate(record, { stripUnknown: strip });

const validateUpdateRecord = record => {
  let result = validateId(record.id);

  if (result.error) return result;
  result = validateNewRecord(record, false);

  if (result.error) return result;
  result.value.id = record.id;
  return result;
};

const validateUpdateRecords = records => {
  if (!Array.isArray(records))
    return {
      error: {
        ValidationError: "Not an array"
      }
    };
  let results = [];
  for (let record of records) {
    let { value, error } = validateUpdateRecord(record);
    if (error) return { error };
    results.push(value);
  }
  return { value: results };
};

module.exports = {
  validateId,
  validateIds,
  validateNewRecord,
  validateUpdateRecord,
  validateUpdateRecords
};
