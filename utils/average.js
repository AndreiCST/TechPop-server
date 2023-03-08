const average = (array) => {
    const avg = array.reduce((a, b) => (a + b)) / array.length
    return avg.toFixed(1)
}

module.exports = average