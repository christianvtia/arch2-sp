import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [inputType, setInputType] = useState("binary")

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
              <div className={`w-fit h-8 px-4 text-lg rounded-full border-green-500 border 2 cursor-pointer ${inputType == "binary" ? "bg-green-500 text-white" : ""}`} onClick={() => setInputType("binary")}>Binary</div>
              <div className={`w-fit h-8 px-4 text-lg rounded-full border-green-500 border-2 cursor-pointer ${inputType == "hex" ? "bg-green-500 text-white" : ""}`} onClick={() => setInputType("hex")}>Hex</div>
            </div>
            <form className="my-2">
            {
              inputType == "hex" 
              ? 
                <input className="border-2 border-black/50 outline-none w-full text-lg px-2" placeholder='Input a hex value... (ex. 7ADF)'></input> 
              
              : 
              <div className="flex flex-row gap-2">
                <input className="border-2 border-black/50 outline-none w-16 text-lg px-2 h-8" maxLength={1} placeholder='Sign'></input> 
                <input className="border-2 border-black/50 outline-none w-48 text-lg px-2 h-8" maxLength={8} placeholder='Exponent'></input> 
                <input className="border-2 border-black/50 outline-none w-full text-lg px-2 h-8" maxLength={23} placeholder='Mantissa'></input> 
              </div>
              
            }              
            </form>
          </div>

          {/* Submit */}
          <div className='w-fit h-8 px-4 text-lg rounded-full bg-sky-500 text-white font-semibold self-end border 2 cursor-pointer'>Submit</div>

          {/* Output */}
          <div className='flex flex-col my-4'>
            <h1 className='text-lg'>Output:</h1>
            <div className="w-full border-2 border-black/50 h-8 mt-2"></div>
          </div>

          

        </div>
      </div>
    </>
  )
}

export default App
