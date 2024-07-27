import { useState } from 'react'
import { toast } from "sonner";
import { parseHexFloat, parseBinFloat } from './Functions'

function App() {
  const [inputType, setInputType] = useState("binary")//User Input Type
  const [sign, setSign] = useState("")//Sign bit for binary input
  const [exponent, setExponent] = useState("")//Exponent bits for binary input
  const [mantissa, setMantissa] = useState("")//Mantissa bits for binary input
  const [hexInput, setHexInput] = useState("")//Hex input
  const [output, setOutput] = useState("")//output

  //Allows the user to switch types from Binary to Hex and vice-versa
  function changeType(type) {
    setInputType(type)
    setOutput("")
    if (type == "hex") {
      setSign("")
      setExponent("")
      setMantissa("")
    }
    else {
      setHexInput("")
    }
  }

  //Checks whether the input is valid binary
  function isValidBinary(sign, exponent, mantissa) {
    // Regular expression to check if a string contains only 0s and 1s
    const binaryPattern = /^[01]+$/;

    // Validate each parameter
    return binaryPattern.test(sign) && binaryPattern.test(exponent) && binaryPattern.test(mantissa);
  }

  //Checks whether the input is valid hex
  function isValidHex(input) {
    // Regular expression to check if the input is a valid 8-character hex
    const hexPattern = /^[0-9A-Fa-f]{8}$/;

    return hexPattern.test(input);
  }

  //Function to copy to clipboard
  function copyToClipboard() {
    navigator.clipboard.writeText(output)
  }

  //Used for submitting the inputs, temporarily for checking whether the inputs are valid
  function handleSubmit() {
    /*if (inputType === "hex") {
      setOutput(isValidHex(hexInput) ? "Valid hex input" : "Invalid hex input");
    } else {
      setOutput(isValidBinary(sign, exponent, mantissa) ? "Valid binary input" : "Invalid binary input");
    }*/

    if (inputType === "hex" && isValidHex(hexInput)) {
      setOutput(parseHexFloat(hexInput))
    } else if (inputType === "binary" && isValidBinary(sign, exponent, mantissa)) {
      setOutput(parseBinFloat(sign, exponent, mantissa))
    } else {
      setOutput("Invalid input.")
    }

    copyToClipboard()

    toast('Output: ' + output + ' has been copied to clipboard.', {
      closeButton: {
      },
    });
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen bg-slate-200">
        {/* white box */}
        <div className="flex flex-col bg-white h-3/4 w-3/4 text-xl shadow-md py-8 px-40">
          {/* header */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-lg">IEEE-754 Binary-32 floating point translator</h1>
            <h2 className="text-base">Burias - Damuy - Tia - Yap</h2>
          </div>

          {/* input */}
          <div className="flex flex-col my-4">
            <h1 className='text-lg'>Input: </h1>
            {/* input buttons */}
            <div className="my-2 flex flex-row gap-2">
              <div
                className={`w-fit h-8 px-4 text-lg rounded-full border-green-500 border 2 cursor-pointer ${inputType == "binary" ? "bg-green-500 text-white" : ""}`}
                onClick={() => changeType("binary")}>Binary
              </div>
              <div
                className={`w-fit h-8 px-4 text-lg rounded-full border-green-500 border-2 cursor-pointer ${inputType == "hex" ? "bg-green-500 text-white" : ""}`}
                onClick={() => changeType("hex")}>Hex
              </div>
            </div>
            <form className="my-2" onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
              {
                inputType == "hex"
                  ?
                  <input
                    className="border-2 border-black/50 outline-none w-full text-lg px-2"
                    maxLength={8}
                    placeholder='Input a hex value... (ex. 7ADF)'
                    value={hexInput}
                    onChange={(e) => setHexInput(e.target.value)}
                  />

                  :
                  <div className="flex flex-row gap-2">
                    <input
                      className="border-2 border-black/50 outline-none w-16 text-lg px-2 h-8"
                      maxLength={1}
                      placeholder='Sign'
                      value={sign}
                      onChange={(e) => setSign(e.target.value)}
                    />
                    <input
                      className="border-2 border-black/50 outline-none w-48 text-lg px-2 h-8"
                      maxLength={8}
                      placeholder='Exponent'
                      value={exponent}
                      onChange={(e) => setExponent(e.target.value)}
                    />
                    <input
                      className="border-2 border-black/50 outline-none w-full text-lg px-2 h-8"
                      maxLength={23}
                      placeholder='Mantissa'
                      value={mantissa}
                      onChange={(e) => setMantissa(e.target.value)}
                    />
                  </div>

              }
            </form>
          </div>

          {/* Submit */}
          <div className='flex flex-row'>
            <div className='font-bold mr-2'>Submit:</div>
            {/* Fixed point submission */}
            <div
              className='w-fit h-8 px-4 text-lg rounded-full bg-sky-500 text-white font-semibold self-end border-2 cursor-pointer'
              onClick={handleSubmit}
            >Fixed Point
            </div>
            {/* With decimal submission */}
            <div
              className='w-fit h-8 px-4 text-lg rounded-full bg-sky-500 text-white font-semibold self-end border-2 cursor-pointer'
              onClick={handleSubmit}
            >With Decimal
            </div>
          </div>

          {/* Output */}
          <div className='flex flex-col my-4'>
            <h1 className='text-lg'>Output:</h1>
            <div className="w-full border-2 border-black/50 h-8 mt-2">{output}</div>
          </div>


        </div>
      </div>
    </>
  )
}

export default App
