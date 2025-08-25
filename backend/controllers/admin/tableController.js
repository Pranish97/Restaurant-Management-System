const menuModel = require("../../models/menuModel");
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
    res.status(200).json({
      message: "Table Removed Successfully!",
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

const addMenuToTable = async (req, res) => {
  try {
    const { tableId, menuId, quantity = 1 } = req.body;

    const table = await tableModel.findById(tableId);
    if (!table) {
      return res
        .status(404)
        .json({ success: false, message: "Table not found" });
    }

    const existingIndex = table.menu.findIndex(
      (item) => item.data.toString() === menuId
    );

    if (existingIndex !== -1) {
      table.menu[existingIndex].quantity += quantity;
    } else {
      table.menu.push({ data: menuId, quantity });
    }

    await table.save();

    const populatedTable = await tableModel
      .findById(tableId)
      .populate({
        path: "menu.data",
        select: "name price description category image",
      })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Menu added to table successfully",
      data: populatedTable,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const getTableById = async (req, res) => {
  try {
    const { id } = req.params;

    const table = await tableModel.findById(id).populate({
      path: "menu.data",
      model: "Menu",
      select: "name price description category image",
    });

    res.status(200).json({
      data: table,
      message: "Table By Id",
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

const removeMenuFromTable = async (req, res) => {
  try {
    const { tableId, menuId } = req.body;

    const table = await tableModel.findById(tableId);
    if (!table) {
      return res
        .status(404)
        .json({ success: false, message: "Table not found" });
    }

    table.menu.pull(menuId);
    await table.save();

    const updatedTable = await tableModel.findById(tableId).populate("menu");

    return res.status(200).json({
      success: true,
      message: "Menu deleted from table successfully",
      data: updatedTable,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addTable,
  updateTable,
  getAllTable,
  deleteTable,
  addMenuToTable,
  getTableById,
  removeMenuFromTable,
};
