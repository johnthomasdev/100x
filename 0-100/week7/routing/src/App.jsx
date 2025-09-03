// import './App.css'
// import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'

// const Dashboard = React.lazy( () => import('./components/Dashboard'))
// const Landing = React.lazy( () => import('./components/Landing'))

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <AppBar></AppBar>
//         <Routes>
//           <Route path = "/dashboard" element = {<Dashboard></Dashboard>}></Route>
//           <Route path = "/" element = {<Landing></Landing>}></Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// function AppBar(){
//   const navigate = useNavigate();
//   return (
//     <div style = {{border: 'black 2px solid', padding: '10px'}}>
//         <div style = {{border: 'black 2px solid'}}>
//           <button onClick = {() => {navigate('/')}}>Landing</button>
//           <button onClick = {() => {navigate('/dashboard')}}>DashBoard</button>
//         </div>
//     </div>
//   )
// }

// export default App

// import {useContext, useState} from 'react'
// import { CountContext } from './context';
// 
// export default function App() {
  // const [count, setCount] = useState(0);
  // return (
    // <>
      {/* <CountContext.Provider value = {count}> */}
        {/* <Count setCount = {setCount}></Count> */}
      {/* </CountContext.Provider> */}
    {/* </> */}
  // )
// }
// 
// function Count({setCount}){
  // return <div>
    {/* <CountRenderer> </CountRenderer> */}
    {/* <Button setCount = {setCount}></Button> */}
  {/* </div> */}
// }
// 
// function CountRenderer(){
  // const count = useContext(CountContext);
  // return <div>
    {/* {count} */}
  {/* </div> */}
// }
// 
// function Button({setCount}){
  // const count = useContext(CountContext);
  // return <div>
    {/* <button onClick = {() => { */}
      // setCount(count + 1)
    // }} >Increase</button>
    {/* <button onClick = {() => { */}
      // setCount(count - 1)
    // }} >Decrease</button>
  {/* </div> */}
// }

import { countAtom } from './store/atoms/count';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';

export default function App() {
  
  return (
    <>
      <RecoilRoot>
        <Count></Count>
      </RecoilRoot>
    </>
  )
}

function Count(){
  return <div>
    <CountRenderer> </CountRenderer>
    <Button></Button>
  </div>
}

function CountRenderer(){
  const count = useRecoilValue(countAtom);
  return <div>
    {count} 
    {(count % 2 == 0) ? <span > hi </span>: null}
  </div>
}

function Button(){
  const [count,setCount] = useRecoilState(countAtom);
  return <div>
    <button onClick = {() => {
      setCount(count + 1)
    }} >Increase</button>
    <button onClick = {() => {
      setCount(count - 1)
    }} >Decrease</button>
  </div>
}
