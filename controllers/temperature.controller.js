const Temperature = require("../models/temperature");

const getAllTemperatures = async (req, res) => {
  try {
    const temperatures = await Temperature.findAll();
    res.json(temperatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTemperaturesByCompanyId = async (req, res) => {
  const { companyId } = req.params;
  try {
    const temperatures = await Temperature.findAll({
      where: { companyId }
    });
    res.json(temperatures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createTemperature = async (req, res) => {
  const { range } = req.body;

  try {
    const createdTemperatures = [];
    const errors = [];

    for (const rangeItem of range) {
      const { company_id, temperatures } = rangeItem;

      for (const tempData of temperatures) {
        const { id, name, min, max } = tempData;
        let newTemperature;

        try {
          if (id) {
            const [updatedCount, updatedTemperature] = await Temperature.update(
              {
                name,
                min,
                max,
                companyId: company_id
              },
              {
                where: { id },
                returning: true
              }
            );

            if (updatedCount > 0) {
              newTemperature = updatedTemperature[0];
            } else {
              throw new Error(`No se encontró ninguna temperatura con la id ${id}.`);
            }
          } else {
            newTemperature = await Temperature.create({
              name,
              min,
              max,
              companyId: company_id
            });
          }
          createdTemperatures.push(newTemperature);
        } catch (error) {
          errors.push({ id, error: error.message });
        }
      }
    }

    if (errors.length > 0) {
      res.status(207).json({
        message: "Algunas temperaturas no se pudieron procesar.",
        createdTemperatures,
        errors
      });
    } else {
      res.status(201).json(createdTemperatures);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTemperatures,
  getTemperaturesByCompanyId,
  createTemperature
};
