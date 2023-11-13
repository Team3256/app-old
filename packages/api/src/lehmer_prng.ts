// We use the PRNG to generate a *predictable* random nonce for the QR code.

function rng(seed: number) {
  let t = seed % 2147483647;

  if (t <= 0) {
    t += 2147483646;
  }

  return {
    next: function () {
      return (t = (16807 * t) % 2147483647);
    },
    nextFloat: function () {
      return (this.next() - 1) / 2147483646;
    },
    shuffleArray: function (array: any[]) {
      if (array.length == 0) {
        return array;
      }

      for (let i = array.length - 1; i != 0; i--) {
        const r = Math.floor(this.nextFloat() * (i + 1));
        [array[i], array[r]] = [array[r], array[i]];
      }

      return array;
    },
  };
}

export default rng;
