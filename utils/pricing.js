const calculatePrice = (days) => {
    if (days >= 30) return 20000;
    if (days >= 7) return 6000;
    return days * 1000;
};

module.exports = { calculatePrice };
