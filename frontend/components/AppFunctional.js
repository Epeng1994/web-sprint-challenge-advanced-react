import React, {useState} from 'react'
import axios from 'axios'


const initialGrid = {
  gridArr:['','','','','B','','','',''],
  steps: 0,
  x: 2,
  y: 2,
  email: '',
  message: ''
} 

export default function AppFunctional(props) {

  const [grid, setGrid] = useState(initialGrid)
  
  const onChange = e =>{
    const {value} = e.target
    setGrid({...grid, email:value})
  }

  const onLeft = () =>{
    let place = grid.gridArr.indexOf('B')//
    let clone = ['','','','','','','','','']//
    let limit = [0,3,6]
    if(limit.includes(place)){//
      setGrid({...grid, message: 'You can\'t go left'})
    }else{
      clone[place-1] = 'B'
      let sum = grid.steps + 1
      setGrid({...grid, x: grid.x - 1, steps: sum, message: '',gridArr: clone})
    }
  }

  const onRight = () =>{
    let place = grid.gridArr.indexOf('B')
    let clone = ['','','','','','','','','']
    let limit = [2,5,8]
    if(limit.includes(place)){
      setGrid({...grid, message: 'You can\'t go right'})
    }else{
      clone[place+1] = 'B'
      let sum = grid.steps + 1
      setGrid({...grid, x: grid.x + 1, steps: sum, message: '',gridArr: clone})
    }
  }

  const onUp = () =>{
    let place = grid.gridArr.indexOf('B')
    let clone = ['','','','','','','','','']
    let limit = [0,1,2]
    if(limit.includes(place)){
      setGrid({...grid, message: 'You can\'t go up'})
    }else{
      clone[place-3] = 'B'
      let sum = grid.steps + 1
      setGrid({...grid, y: grid.y - 1, steps: sum, message: '',gridArr: clone})
    }
  }

  const onDown = () =>{
    let place = grid.gridArr.indexOf('B')
    let clone = ['','','','','','','','','']
    let limit = [6,7,8]
    if(limit.includes(place)){
      setGrid({...grid, message: 'You can\'t go down'})
    }else{
      clone[place+3] = 'B'
      let sum = grid.steps + 1
      setGrid({...grid, y: grid.y + 1, steps: sum, message: '',gridArr: clone})
    }
  }

  const onReset = e =>{
    setGrid(initialGrid)
  }


  const onSubmit = (e) =>{
    e.preventDefault()
    //post
    let clone ={
      x: grid.x,
      y: grid.y,
      steps: grid.steps,
      email: grid.email,
    } 
    axios.post('http://localhost:9000/api/result',clone)
    .then(res=>{
      setGrid({...grid, message: res.data.message, email: ''})
    })
    .catch(err=>{
      setGrid({...grid, message: err.response.data.message})
    })
  }


  return (
      <div id="wrapper" className={props.className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {`(${grid.x},${grid.y})`}</h3>
          <h3 id="steps">You moved {grid.steps === 1 ? grid.steps + ' time': grid.steps + ' times'}</h3>
        </div>
        <div id="grid">
          {
            grid.gridArr.map((a,i)=>{
              return(
                <div key = {i} className= {a ? 'square active' : 'square'}>{a}</div>
              )
            })
          }

        </div>
        <div className="info">
          <h3 id="message">{grid.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={onLeft}>LEFT</button>
          <button id="up" onClick={onUp}>UP</button>
          <button id="right" onClick={onRight}>RIGHT</button>
          <button id="down" onClick={onDown}>DOWN</button>
          <button id="reset" onClick={onReset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" onChange={onChange} value = {grid.email}></input>
          <input id="submit" type="submit" onClick = {onSubmit}></input>
        </form>
      </div>
    )
}
