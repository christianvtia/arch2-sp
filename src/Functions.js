export function parseHexFloat(input, isFloating) {
  let binFloat = hexToBin(input) 
  if (isFloating) return parseBinFloatFloating(binFloat[0], binFloat[1], binFloat[2])
  return parseBinFloatFixed(binFloat[0], binFloat[1], binFloat[2])
}

export function parseBinFloatFixed(sign, exp, mantissa) {
  let specialCase = checkSpecialCases(sign, exp, mantissa)
  if (specialCase !== -1) return specialCase

  exp = getExp(exp)
  mantissa = getMantissa(mantissa)
  let mag = mantissa * 2**exp
  return sign === "0" ? mag : -mag
}

export function parseBinFloatFloating(sign, exp, mantissa) {
  let specialCase = checkSpecialCases(sign, exp, mantissa)
  if (specialCase !== -1) return specialCase

  exp = getExp(exp)
  mantissa = getMantissa(mantissa)
  return sign === "0" ? mantissa+"*2^"+exp : -mantissa+"*2^"+exp
}

function checkSpecialCases(sign, exp, mantissa) {
  if (exp === "11111111" && mantissa === "00000000000000000000000") {
    return sign === "0" ? "Infinity" : "Negative Infinity"
  } else if (exp === "11111111" && mantissa !== "00000000000000000000000") {
    return "NaN"
  } else if (exp === "00000000" && mantissa === "00000000000000000000000") {
    return sign === "0" ? "0" : "-0"
  } else if (exp === "00000000" && mantissa !== "00000000000000000000000") {
    return "Denormalized"
  }
  return -1
}

function hexToBinNibble(hex) {
  const lookupTable = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111'
  };
  return lookupTable[hex.toUpperCase()] || null;
}

function hexToBin(hex) {
  let bin = "";
  for (let i = 0; i < hex.length; i++)
    bin = bin.concat(hexToBinNibble(hex[i]));

  let split_bin = []
  split_bin.push(bin[0])          // Sign bit
  split_bin.push(bin.slice(1,9))  // Exp
  split_bin.push(bin.slice(9))    // Mantissa

  return split_bin;
}

function binToDec(bin) {
  let dec = 0;
  let power = 0;
  for (let i = bin.length - 1; i >= 0; i--) {
    dec += parseInt(bin[i]) * 2**power;
    power++;
  }
  return dec;
}

function getMantissa(bin) {
  let mantissa = 1;
  for (let i = 0; i < bin.length; i++)
    mantissa += parseInt(bin[i]) * 2**(-1-i)

  return mantissa;
}

function getExp(bin) {
  const bias = 127
  let exp = binToDec(bin)
  return exp - bias
}