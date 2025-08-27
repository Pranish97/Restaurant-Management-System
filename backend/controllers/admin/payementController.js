const transactionModel = require("../../models/transactionModel");
const { EsewaPaymentGateway, EsewaCheckStatus } = require("esewajs");
const { v4: uuidv4 } = require("uuid");
const tableModel = require("../../models/tableModel");

const EsewaInitiatePayment = async (req, res) => {
  const { amount, tableId } = req.body;

  try {
    if (!amount || !tableId) {
      return res
        .status(400)
        .json({ message: "Amount and tableId are required" });
    }

    const transactionUuid = uuidv4();

    const reqPayment = await EsewaPaymentGateway(
      amount,
      0,
      0,
      0,
      transactionUuid,
      process.env.MERCHANT_ID,
      process.env.SECRET,
      process.env.SUCCESS_URL,
      process.env.FAILURE_URL,
      process.env.ESEWAPAYMENT_URL
    );

    if (!reqPayment)
      return res.status(400).json({ message: "Error sending data to eSewa" });

    if (reqPayment.status === 200) {
      const transaction = new transactionModel({
        table: tableId,
        amount: amount,
        transaction_uuid: transactionUuid,
      });
      await transaction.save();

      return res.status(200).json({ url: reqPayment.request.res.responseUrl });
    }
  } catch (error) {
    console.error("Error in EsewaInitiatePayment:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const paymentStatus = async (req, res) => {
  const { transaction_uuid } = req.body;

  try {
    const transaction = await transactionModel.findOne({ transaction_uuid });
    if (!transaction)
      return res.status(400).json({ message: "Transaction not found" });

    const paymentStatusCheck = await EsewaCheckStatus(
      transaction.amount,
      transaction.transaction_uuid,
      process.env.MERCHANT_ID,
      process.env.ESEWAPAYMENT_STATUS_CHECK_URL
    );

    if (paymentStatusCheck.status === 200) {
      transaction.status = paymentStatusCheck.data.status;
      await transaction.save();

      if (transaction.status === "COMPLETE") {
        await tableModel.findByIdAndUpdate(transaction.table, {
          menu: [],
          status: "available",
        });
      }

      return res
        .status(200)
        .json({ message: "Transaction status updated successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Failed to verify payment status" });
    }
  } catch (error) {
    console.error("Error in paymentStatus:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { EsewaInitiatePayment, paymentStatus };
