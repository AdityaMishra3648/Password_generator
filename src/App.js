import { useState , useCallback ,useEffect, useRef} from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  let [password, setPassword] = useState("")
  let [length, setLength] = useState(0)
  let [numbers, setNumbers] = useState(false)
  let [symbols, setSymbols] = useState(false)
  let reference = useRef(null);
  let copypass = ()=> {
    reference.current?.select();
    window.navigator.clipboard.writeText(password);
  }
  let newPass = useCallback(()=>{
    let s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numbers)s += "12345678901234567890";
    if(symbols)s += "!@#$%^&!@#$%^&";
    let n = s.length;
    let temp = "";
    for(let i=0;i<length;i++){
      let idx = Math.floor(Math.random()*n);
      temp += s.charAt(idx);
    }
    setPassword(temp);
  },[length,numbers,symbols])
  useEffect(()=>{
    newPass();
  },[length,numbers,symbols]);
  return (
    <>
    <div className='flex justify-center'>

    <div className='bg-black pb-10 w-auto pl-10 pr-10 text-center rounded-2xl'>
    <h1 className='text-4xl text-center mb-5 font-serif mt-5 pt-5'>Password Manager</h1>
    <input type="text" className='w-1/2 h-10 p-3 text-lg rounded-l bg-slate-50 mb-4 text-black' readonly="readonly" ref={reference} value={password}/><button onClick={()=>copypass()} className='bg-blue-500 p-2 h-10 rounded-r hover:bg-teal-600 active:bg-slate-50 '>Copy</button><br />
    <button className='text-4xl' onClick={()=>setLength(length<50?length+1:50)}>⬆️</button>
    &nbsp;&nbsp;&nbsp;
    <span className='text-4xl font-semibold'>Length : {length}</span>
    &nbsp;&nbsp;&nbsp;
    <button className='text-4xl' onClick={()=>setLength(length>0?length-1:0)}>⬇️</button>
    <input type="checkbox" className='h-6 w-6' onClick={()=>setNumbers(!numbers)}/><span className='font-semibold text-3xl'>Numbers</span> &nbsp;
    <input type="checkbox" className='h-6 w-6' onClick={()=>setSymbols(!symbols)} /><span className='font-semibold text-3xl'>Symbols</span> 
    </div>
    </div>
    </>
  )
}

export default App
