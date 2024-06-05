import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'
import arrowup from './images/arrow-up.png'
import arrowdown from './images/down.png'

function App() {

  // these are all States 
  const [password, setPassword] = useState("");
  const [length, setLength] = useState();
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numbersAllowed === true)
    {
      // adding numbers from 0-9 to the string if the numbersAllowed is checked
      str += "0123456789";
    }

    if(charactersAllowed === true)
    {
      // adding special symbols to the string if the charctersAllowed is checked
      str += "[]{}()?/><~\|=+-_@#$%^&*!"; 
    }

    for(let i = 0 ; i < length ; i++)
    {
      // we are getting the random number which is also the index number of the string from 0 to length of the string
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numbersAllowed, charactersAllowed, setPassword])
   // these are the dependencies array. if any change is happend in these values the this useCallback function runs again 
   // this is used for the opptimization 

  const copyPasswordToClipboard = useCallback(() => {

    passwordRef.current?.select(); // selecting the text from input field and highlighting that text which is selected 
    passwordRef.current?.setSelectionRange(0, length);  // selecting range that how many characters should be selected
    window.navigator.clipboard.writeText(password);  // this is the main line which is actually copying the text of input field to the clipboard
  }, [password])

  // we have to call password generator again and again if the dependencies given in the useEffect is changes
  // and also we used the useCallback function for writing the code for the passwordGenerator so for that reason we couldn't directly call 
  // the passwordGenerator() function thats why for calling this passowordGenerator() function we have to use the useEffect Hook 
  // by using the useEffect hook we can easily call the passwordGenerator() function 
  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charactersAllowed, passwordGenerator])


  return (

   <>
      {/* Main div */}
      <div className='bg-slate-600 flex flex-col gap-4'>
        {/* main div's child 1 */}
        <div>
            <h1 className='text-2xl text-white py-4'>Password Generator</h1>
            <div className='w-full flex justify-center sm:flex-row flex-col align-middle'>
              <input type="text" 
                    value={password}
                    className='border-solid border-2
                                border-indigo-600
                                sm:w-96 w-full h-10 px-2'
                    placeholder='Password'
                    readOnly
                    ref={passwordRef}
                            
              />
              <div>
                    <button className='border-solid 
                                border-2
                              border-green-600
                                bg-green-500
                                w-20 h-10
                                text-white
                                text-xl cursor-pointer
                                hover:bg-green-600'
                                
                      onClick={copyPasswordToClipboard} >Copy</button>
              </div>
              
            </div>
        </div>
        {/* main div's child 1 ends */}

        {/* main div's child 2 */}
        <div className='flex sm:justify-center sm:flex-row flex-col'>
                {/* 1st div */}
            <div className='flex justify-center'>
              <input type="range"
                    min={1}
                    max={100} 
                    value={length}
                    onChange={(e) => {setLength(e.target.value)}}
                    // we have attached here if the range is changes than based on that the length of our password is changes
              />
            </div>

            {/* 2nd div */}
            <div className='flex justify-center'>

              
              <div className='text-white flex text-xl w-30 h-max my-2'>
                <div>
                 length=
                </div>

                <div>
                ({length})
                </div>
                 
              </div>

              <div className='w-max h-max  mr-2 pt-1'>
                <img src={arrowup} 
                    alt="arrup" 
                    width={20} height={20}
                    onClick={(e) => {
                      let currentLength = +length;
                      if(currentLength < 100){
                        currentLength++;
                        setLength(currentLength);
                      }
                    }}
                  />
                <img src={arrowdown} 
                    alt="arrdown" 
                    width={20} height={20}
                    onClick={(e) => {
                      let currentLength = +length;
                      if(currentLength > 1){
                        currentLength--;
                        setLength(currentLength);
                      }
                      
                    }}/>
              </div>
            </div>

            {/* 3th div */}
            <div className='flex justify-center'>
                    <input type="checkbox" 
                    id='idcheckbox1' 
                    className='w-4 h-4 my-4'
                    onChange={(e) => {
                      setNumbersAllowed((prev) => !prev)
                    }}
                    />
                  <label htmlFor="idcheckbox1" className='text-white text-xl w-max h-max my-2'>Numbers</label>
            </div>
              
            {/* 4th div */}
            <div className='flex justify-center'>
                  <input type="checkbox" 
                    id='idcheckbox2' 
                    className='w-4 h-4 my-4 ml-2'
                    onChange={(e) => {
                      setCharactersAllowed((prev) => !prev) // by using a callback function we can easily get the previous value and by using it 
                                                            // we can set the new value to it
                    }}
                  />
                  <label htmlFor="idcheckbox2" className='text-white text-xl w-max h-max my-2'>Characters</label>
            </div>
        </div>
        {/* main div's child 2 end */}
        

          
      </div>
   </>
  )
}

export default App
