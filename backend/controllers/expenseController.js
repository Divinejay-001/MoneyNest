const xlsx = require('xlsx');
const Expense = require('../models/Expense');

// Add income source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newExpense = new Expense({
            icon,
            userId: req.user.id,
            amount: Number(req.body.amount),           // ✅ converts to number
            category: req.body.category,
            date: new Date(req.body.date),             // ✅ converts to real Date object
          });
          

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all expense sources
exports.getAllExpense = async (req, res) => { // Fixed function name
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete Expense source
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense source deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Download income data as Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data); // Fixed variable name
        xlsx.utils.book_append_sheet(wb, ws, 'Expense');

        const filePath = './expense_details.xlsx';
        xlsx.writeFile(wb, filePath);
        
        res.download(filePath, 'expense_details.xlsx', (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error downloading file' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
