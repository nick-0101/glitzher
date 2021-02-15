module.exports = {
  shuffle: function (req, res, next) {
    if (res) {
      console.log(res);
    }
    next();
  },
};
