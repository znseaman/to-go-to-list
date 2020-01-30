import xss from 'xss';

const escapeUserInputs = model => {
  for (let att in model.dataValues) {
    // escape all user inputs that are strings in the DB
    if (model.rawAttributes[att].type.STRING) {
      // @ts-ignore
      model.dataValues[att] = xss(model.dataValues[att]);
    }
  }
  return model;
}

export default escapeUserInputs;