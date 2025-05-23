const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { isValidObjectId, Types } = require('mongoose');

// Dashboard Data
exports.getDashboardData = async (req, res) => {
   try {
      const userId = req.user.id;
      const userObjectId = new Types.ObjectId(String(userId));

      // Calculate date ranges
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // ✅ Corrected
      const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000); // ✅ Corrected

      // Fetch total income
      const totalIncome = await Income.aggregate([
         { $match: { userId: userObjectId } },
         { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);

      // Fetch total expense
      const totalExpense = await Expense.aggregate([
         { $match: { userId: userObjectId } },
         { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);

      // Get income transactions in the last 60 days
      const last60DaysIncomeTransactions = await Income.find({
         userId,
         date: { $gte: sixtyDaysAgo },
      }).sort({ date: -1 });

      const incomeLast60Days = last60DaysIncomeTransactions.reduce(
         (sum, transaction) => sum + transaction.amount,
         0
      );

      // Get expense transactions in the last 30 days
      const last30DaysExpenseTransactions = await Expense.find({
         userId,
         date: { $gte: thirtyDaysAgo },
      }).sort({ date: -1 });

      const expenseLast30Days = last30DaysExpenseTransactions.reduce(
         (sum, transaction) => sum + transaction.amount,
         0
      );

      // Fetch last 5 transactions (income + expenses)
      const lastIncomeTxns = await Income.find({ userId }).sort({ date: -1 }).limit(5);
      const lastExpenseTxns = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

      const lastTransactions = [
         ...lastIncomeTxns.map((txn) => ({
            ...txn.toObject(),
            type: 'income',
         })),
         ...lastExpenseTxns.map((txn) => ({
            ...txn.toObject(),
            type: 'expense',
         })),
      ].sort((a, b) => new Date(b.date) - new Date(a.date));

      // Final Response
      res.json({
         totalBalance:
            (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
         totalIncome: totalIncome[0]?.total || 0,
         totalExpense: totalExpense[0]?.total || 0,
         last30DaysExpenses: {
            total: expenseLast30Days,
            transactions: last30DaysExpenseTransactions,
         },
         last60DaysIncome: {
            total: incomeLast60Days,
            transactions: last60DaysIncomeTransactions,
         },
         recentTransactions: lastTransactions,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
   }
};
