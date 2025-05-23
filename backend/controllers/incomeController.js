const xlsx = require('xlsx');
const Income = require('../models/Income');

// Add income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all income sources
exports.getAllIncome = async (req, res) => { // Fixed function name
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete income source
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: 'Income source deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Download income data as Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const incomeData = income.map((item) => ({
            icon: item.icon,
            source: item.source,
            amount: item.amount,
            date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(incomeData); // Fixed variable name
        xlsx.utils.book_append_sheet(wb, ws, 'Income');

        const filePath = './income_details.xlsx';
        xlsx.writeFile(wb, filePath);
        
        res.download(filePath, 'income_details.xlsx', (err) => {
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
