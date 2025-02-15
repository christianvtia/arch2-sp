//main function for converting hex inputs to the desired output
export function parseHexFloat(input, isFloating) {
  let binFloat = hexToBin(input)  //convert to binary 

  //call the appropriate function based on the output type
  if (isFloating) return parseBinFloatFloating(binFloat[0], binFloat[1], binFloat[2])     
  return parseBinFloatFixed(binFloat[0], binFloat[1], binFloat[2])
}

//function to parse binary output for fixed point output 
//also helper function for the hex input to output function
export function parseBinFloatFixed(sign, exp, mantissa) {
  let specialCase = checkSpecialCases(sign, exp, mantissa)      //check for special cases
  if (specialCase !== -1) return specialCase

  exp = getExp(exp)                       //convert the binary exponent with bias to actual decimal
  mantissa = getMantissa(mantissa)        //convert the binary mantissa to decimal
  let mag = mantissa * 2**exp             //calculate the magnitude of the fixed point by multiplying with the exponent
  return sign === "0" ? mag : -mag        //check sign and return the final output
}

//function to pass the answer in floating point output
//also helper function for the hex input to output function
export function parseBinFloatFloating(sign, exp, mantissa) {
  let ans = parseBinFloatFixed(sign, exp, mantissa).toExponential().toString();   //get the fixed point output and convert to exponential notation
  ans = ans.replace("e", "*10^");                                                 //replace the 'e' with '*10^' for better readability for copy-pasting

  return ans;
}

//helper function to check for special cases
//since there are only a few special cases, this can be hardcoded
function checkSpecialCases(sign, exp, mantissa) {
  if (exp === "11111111" && mantissa === "00000000000000000000000") {
    return sign === "0" ? "Postitive Infinity" : "Negative Infinity"
  } else if (exp === "11111111" && mantissa !== "00000000000000000000000") {
    return "NaN"
  } else if (exp === "00000000" && mantissa === "00000000000000000000000") {
    return sign === "0" ? "+0" : "-0"
  } else if (exp === "00000000" && mantissa !== "00000000000000000000000") {
    return "Denormalized"
  }
  return -1
}

//helper function to convert hex digits to binary nibbles (4 bits)
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

//helper function to convert hex input to binary
//splits the binary into an array where the first element is the sign, 
//the second is the exponent, and the last is the mantissa
function hexToBin(hex) {
  let bin = "";
  for (let i = 0; i < hex.length; i++)
    bin = bin.concat(hexToBinNibble(hex[i]));

  let split_bin = []
  split_bin.push(bin[0])          // sign bit
  split_bin.push(bin.slice(1,9))  // exponent
  split_bin.push(bin.slice(9))    // mantissa

  return split_bin;
}

//converts binary to decimal (for whole numbers, in this case, the exponent)
function binToDec(bin) {
  let dec = 0;
  let power = 0;
  for (let i = bin.length - 1; i >= 0; i--) {
    dec += parseInt(bin[i]) * 2**power;
    power++;
  }
  return dec;
}

//converts the mantissa in binary to its corresponding fractional part
//returns the fractional part + 1
function getMantissa(bin) {
  let mantissa = 1;
  for (let i = 0; i < bin.length; i++)
    mantissa += parseInt(bin[i]) * 2**(-1-i)

  return mantissa;
}

//gets the actual exponent from the binary input given the bias
function getExp(bin) {
  const bias = 127
  let exp = binToDec(bin)
  return exp - bias
}