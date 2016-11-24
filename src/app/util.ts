// Produces a random integer[0, n].
// effect
const random = (n: number): number =>
  Math.floor(Math.random() * (n + 1))

// Inserts x into xs.
// effect: The position of x is determined by Math.random.
const insert = <X> (x: X, xs: Array<X>): Array<X> => {
  const i = random(xs.length)

  return [ ...xs.slice(0, i)
         , x
         , ...xs.slice(i)
         ]
}

// Given an array, produces a shuffled array.
// effect
const shuffle = <X> (xs: Array<X>): Array<X> =>
  xs.length <= 1
    ? xs
    : insert(xs[0], shuffle(xs.slice(1)))

// Produces a random hex color code.
// effect
const randomColor = (): string => {
  const digits = '0123456789ABCDEF'

  let code = '#'

  for (let i = 0; i < 6; i++) {
    code += digits[random(15)]
  }

  return code
}


export { shuffle
       , randomColor
       }
