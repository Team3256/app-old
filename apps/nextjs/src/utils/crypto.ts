function dec2hex(dec: number) {
  return dec.toString(16).padStart(2, "0");
}

function hex2dec(hex: string) {
  return parseInt(hex, 16);
}

// generateId :: Integer -> String
function generateId(len: number) {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}
