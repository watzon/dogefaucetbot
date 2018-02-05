const getUsername = (ctx) => {
  const from = ctx.message.from

  if (from.username) {
    return from.username
  }

  return [from.first_name, from.last_name].filter(x => !!x).join(' ')
}

const generateRandom = (start, end) => {
  return ((Math.random() * end) + start).toFixed(2)
}

const weightedRandom = (min = 0, max = 100, bias = 5.274) => {
  // return Math.floor(Math.abs(Math.random() - Math.random()) * (1 + max - min) + min)
  return (min + (max - min) * Math.pow(Math.random(), bias)).toFixed(2)
}

module.exports = {
  getUsername,
  generateRandom,
  weightedRandom
}
  