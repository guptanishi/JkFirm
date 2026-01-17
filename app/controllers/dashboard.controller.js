const db = require("../models");
const Invoice = db.invoices;

// GET /api/dashboard/sales-by-item?year=YYYY&month=MM(optional)
exports.getSalesByItem = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year) {
      return res.status(400).send({ message: "Year parameter is required!" });
    }

    const yearNum = parseInt(year);
    const monthNum = month ? parseInt(month) : null;

    // Build date range for ISO string matching
    let startDate, endDate;
    
    if (monthNum) {
      // Monthly view: match specific year and month
      startDate = new Date(yearNum, monthNum - 1, 1).toISOString();
      endDate = new Date(yearNum, monthNum, 0, 23, 59, 59, 999).toISOString();
    } else {
      // Yearly view: match only year
      startDate = new Date(yearNum, 0, 1).toISOString();
      endDate = new Date(yearNum, 11, 31, 23, 59, 59, 999).toISOString();
    }

    const pipeline = [
      { 
        $match: { 
          invoiceDate: { 
            $gte: startDate, 
            $lte: endDate 
          } 
        } 
      },
      { $unwind: "$products" },
      {
        $addFields: {
          dateObj: { $toDate: "$invoiceDate" }
        }
      }
    ];

    if (monthNum) {
      // Monthly view: Group by product only
      pipeline.push(
        {
          $group: {
            _id: {
              productCode: "$products.productCode",
              productName: "$products.productName"
            },
            totalQuantity: { $sum: { $toDouble: "$products.quantity" } }
          }
        },
        {
          $project: {
            _id: 0,
            productCode: "$_id.productCode",
            productName: "$_id.productName",
            totalQuantity: 1
          }
        },
        { $sort: { totalQuantity: -1 } }
      );
    } else {
      // Yearly view: Group by product and month
      pipeline.push(
        {
          $group: {
            _id: {
              productCode: "$products.productCode",
              productName: "$products.productName",
              month: { $month: "$dateObj" }
            },
            totalQuantity: { $sum: { $toDouble: "$products.quantity" } }
          }
        },
        {
          $group: {
            _id: {
              productCode: "$_id.productCode",
              productName: "$_id.productName"
            },
            monthlyData: {
              $push: {
                month: "$_id.month",
                quantity: "$totalQuantity"
              }
            },
            totalQuantity: { $sum: "$totalQuantity" }
          }
        },
        {
          $project: {
            _id: 0,
            productCode: "$_id.productCode",
            productName: "$_id.productName",
            monthlyData: 1,
            totalQuantity: 1
          }
        },
        { $sort: { totalQuantity: -1 } }
      );
    }

    const result = await Invoice.aggregate(pipeline);
    res.send(result);
  } catch (err) {
    console.error("Dashboard sales error:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving sales data."
    });
  }
};

// GET /api/dashboard/top-customers-quantity?year=YYYY
exports.getTopCustomersByQuantity = async (req, res) => {
  try {
    const { year } = req.query;

    if (!year) {
      return res.status(400).send({ message: "Year parameter is required!" });
    }

    const yearNum = parseInt(year);
    const startDate = new Date(yearNum, 0, 1).toISOString();
    const endDate = new Date(yearNum, 11, 31, 23, 59, 59, 999).toISOString();

    const pipeline = [
      { 
        $match: { 
          invoiceDate: { 
            $gte: startDate, 
            $lte: endDate 
          } 
        } 
      },
      { $unwind: "$products" },
      {
        $group: {
          _id: {
            customerId: "$customerId",
            customerName: "$customerName"
          },
          totalQuantity: { $sum: { $toDouble: "$products.quantity" } }
        }
      },
      {
        $project: {
          _id: 0,
          customerId: "$_id.customerId",
          customerName: "$_id.customerName",
          totalQuantity: 1
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 }
    ];

    const result = await Invoice.aggregate(pipeline);
    res.send(result);
  } catch (err) {
    console.error("Dashboard top customers quantity error:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving top customers by quantity."
    });
  }
};

// GET /api/dashboard/top-customers-revenue?year=YYYY
exports.getTopCustomersByRevenue = async (req, res) => {
  try {
    const { year } = req.query;

    if (!year) {
      return res.status(400).send({ message: "Year parameter is required!" });
    }

    const yearNum = parseInt(year);
    const startDate = new Date(yearNum, 0, 1).toISOString();
    const endDate = new Date(yearNum, 11, 31, 23, 59, 59, 999).toISOString();

    const pipeline = [
      { 
        $match: { 
          invoiceDate: { 
            $gte: startDate, 
            $lte: endDate 
          } 
        } 
      },
      {
        $group: {
          _id: {
            customerId: "$customerId",
            customerName: "$customerName"
          },
          totalRevenue: { $sum: { $toDouble: "$totalAmount" } }
        }
      },
      {
        $project: {
          _id: 0,
          customerId: "$_id.customerId",
          customerName: "$_id.customerName",
          totalRevenue: 1
        }
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 10 }
    ];

    const result = await Invoice.aggregate(pipeline);
    res.send(result);
  } catch (err) {
    console.error("Dashboard top customers revenue error:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving top customers by revenue."
    });
  }
};
