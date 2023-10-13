import { useRef } from 'react'
import './App.css'
import { useState } from 'react';

function App() {
  const [score, setScore] = useState(0)
  const numberRef = useRef(null);
  const inputRef = useRef(null);
  const romanNumerals = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1
  };
  function generateAndCheckNumber(){
    if (inputRef.current.disabled) {
      inputRef.current.disabled = false;
      inputRef.current.classList.add('active');
    } else {
      const value = inputRef.current.value
      let arabic = 0;
      for (let i = 0; i < value.length; i++) {
        const currentRoman = romanNumerals[value[i]];
        const nextRoman = romanNumerals[value[i + 1]];
        if (nextRoman && currentRoman < nextRoman) {
          arabic -= currentRoman;
        } else {
          arabic += currentRoman;
        }
      }
      if(Number(numberRef.current.innerText) === arabic) {
        setScore(score+1);
      } else {
        setScore(0);
        inputRef.current.disabled = true;
        inputRef.current.classList.remove('active');
        numberRef.current.innerHTML = '&nbsp;';
      }
    }
    numberRef.current.innerText = Math.floor(Math.random() * 1000) + 1;
    inputRef.current.value = ''
  }

  return (
    <>
      <h1>Roman Numeric Training</h1>
      <h2>Рахунок: {score}</h2>
      <div className='holder'>
        <h2 ref={numberRef} id='arabic_number'>&nbsp;</h2>
        <input ref={inputRef} placeholder='Введіть римське число' disabled></input>
        <button onClick={()=>generateAndCheckNumber()}>Сгенерувати число</button>
      </div>
    </>
  )
}

export default App
