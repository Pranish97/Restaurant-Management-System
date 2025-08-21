const tableModel = require("../../models/tableModel");

const addTable = async (req, res) => {
  try {
    const { tableNumber, seats } = req.body;

    const newTable = new tableModel({
      tableNumber,
      seats,
      status: "available",
      menu: [],
    });

    await newTable.save();

    res.status(200).json({
      message: "Table Added Successfully!",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const updateTable = async (req, res) => {
  try {
    const { id } = req.params;
    const { tableNumber, seats, status } = req.body;

    const updateTable = await tableModel.findByIdAndUpdate(id);

    if (!updateTable) {
      res.status(400).json({
        message: "Table Not found!",
        success: false,
        error: true,
      });
    }

    updateTable.tableNumber = tableNumber || updateTable.tableNumber;
    updateTable.seats = seats || updateTable.seats;
    updateTable.status = status || updateTable.status;

    await updateTable.save();

    res.status(200).json({
      message: "Table Updated Successfully!",
      data: updateTable,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const getAllTable = async (req, res) => {
  try {
    const allTableList = await tableModel.find();

    res.status(200).json({
      data: allTableList,
      success: true,
      message: "All Table List",
      error: fasle,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTable = await tableModel.findByIdAndDelete(id);

    if (!deleteTable) {
      res.status(400).json({
        message: "Table Not Found!",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = { addTable, updateTable, getAllTable, deleteTable };
