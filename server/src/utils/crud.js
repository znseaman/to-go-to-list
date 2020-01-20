export const getOne = model => async (req, res) => {
  try {
    const hasUserId = model.rawAttributes['userId'];
    const where = !hasUserId ? { id: req.user.id } : { userId: req.user.id, id: req.params.id };
    const row = await model
      .findOne({ where })

    if (!row) {
      return res.status(400).end();
    }
    return res.status(200).json({ data: row })
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
}

export const getMany = model => async (req, res) => {
  try {
    const rows = await model.findAll({
      where: {
        userId: req.user.id
      }
    });
    return res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
}

export const createOne = model => async (req, res) => {
  const userId = req.user.id;
  try {
    const row = await model.create({ ...req.body, userId });
    res.status(201).json({ data: row });
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
}

export const removeOne = model => async (req, res) => {
  const userId = req.user.id;
  try {
    const removed = await model.destroy({ where: { id: req.params.id, userId } });
    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: req.params.id });
  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
}

export const crudControllers = model => ({
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  removeOne: removeOne(model),
})