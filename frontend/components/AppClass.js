import React from 'react'
import axios from 'axios'

const initialGrid = {
  //pointer to current coordinate
  //counter for moves
  //class active, textcontent = b
  //onclick left, right, up, left  & check if out of bounds else print error
  grid:['','','','','B','','','',''],
  steps: 0,
  x: 2,
  y: 2,
  email: '',
  message: ''
} 
  

export default class AppClass extends React.Component {
  constructor(){
    super(); //allows use of methods from extend
  }

  state = initialGrid

  onChange = e =>{
    const {value} = e.target
    this.setState({email:value})
  }

  stepIncrease = () =>{
    let sum = this.state.steps + 1
    this.setState({steps: sum, message: ''})
  }

  onLeft = () =>{
    let place = this.state.grid.indexOf('B')//
    let clone = ['','','','','','','','','']//
    let limit = [0,3,6]
    if(limit.includes(place)){//
      this.setState({message: 'You can\'t go left'})
    }else{
      clone[place-1] = 'B'
      this.setState({x: this.state.x - 1, grid: clone})
      this.stepIncrease()
    }
  }

  onRight = () =>{
    let place = this.state.grid.indexOf('B')
    let clone = ['','','','','','','','','']
    let limit = [2,5,8]
    if(limit.includes(place)){
      this.setState({message: 'You can\'t go right'})
    }else{
      clone[place+1] = 'B'
      this.setState({x: this.state.x + 1, grid: clone})
      this.stepIncrease()
    }
  }

  onUp = () =>{
    let place = this.state.grid.indexOf('B')
    let clone = ['','','','','','','','','']
    let limit = [0,1,2]
    if(limit.includes(place)){
      this.setState({message: 'You can\'t go up'})
    }else{
      clone[place-3] = 'B'
      this.setState({y: this.state.y - 1, grid: clone})
      this.stepIncrease()
    }
  }

  onDown = () =>{
    let place = this.state.grid.indexOf('B')
    let clone = ['','','','','','','','','']
    let limit = [6,7,8]
    if(limit.includes(place)){
      this.setState({message: 'You can\'t go down'})
    }else{
      clone[place+3] = 'B'
      this.setState({y: this.state.y + 1, grid: clone})
      this.stepIncrease()
    }
  }

  onReset = e =>{
    this.setState(initialGrid)
  }


  onSubmit = (e) =>{
    e.preventDefault()
    //post
    let clone ={
      x: this.state.x,
      y: this.state.y,
      steps: this.state.steps,
      email: this.state.email,
    } 
    axios.post('http://localhost:9000/api/result',clone)
    .then(res=>{
      this.setState({message: res.data.message, email: ''})
    })
    .catch(err=>{
      this.setState({message: err.response.data.message})
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {`(${this.state.x},${this.state.y})`}</h3>
          <h3 id="steps">You moved {this.state.steps === 1 ? this.state.steps + ' time': this.state.steps + ' times'}</h3>
        </div>
        <div id="grid">
          {
            this.state.grid.map((a,i)=>{
              return(
                <div key = {i} className= {a ? 'square active' : 'square'} onClick = {this.onChange}>{a}</div>
              )
            })
          }

        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.onLeft}>LEFT</button>
          <button id="up" onClick={this.onUp}>UP</button>
          <button id="right" onClick={this.onRight}>RIGHT</button>
          <button id="down" onClick={this.onDown}>DOWN</button>
          <button id="reset" onClick={this.onReset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value = {this.state.email}></input>
          <input id="submit" type="submit" onClick = {this.onSubmit}></input>
        </form>
      </div>
    )
  }
}
