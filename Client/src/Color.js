import React from 'react';
import './Color.css';
import { TweenMax } from "gsap";

class Color extends React.Component {

  constructor(props){
    super(props);
    this.closed=this.closed.bind(this);
    this.state={color:"black",lock:this.props.lock};
    this.lock = this.lock.bind(this);
    this.animate= null;
  }

  componentDidMount(){

    TweenMax.fromTo(this.animate,1,{opacity:"0",marginTop:"20vw"},{opacity:"1",marginTop:"0vw"});

    if(this.props.color2 === "black" ){

       this.setState({color:"white"});
    }




  }

  async lock(){

    const result = await fetch(`http://localhost:4000/ps`);
    const data = await result.json();

    setTimeout(()=>{

      let answer= prompt("Enter the maggiiiic keeey");

      if(answer === data[0]["password"]){

        this.setState({lock:!this.state.lock});
        let colorJson= {
          "key":this.props.keyColor,
          "color1" :this.props.color1,
          "color2" :this.props.color2,
          "lock":this.state.lock

        }

           fetch(`http://localhost:4000/updateColor`,{
              method:'POST',
              headers: {
             'Content-Type': 'application/json'
         },
              body: JSON.stringify(colorJson)})
        }

      else{

          alert("Magic word not correct");
      }


  },100);


}

  async closed(){
   if(!this.state.lock){
    let colorJson= {
      "key":this.props.keyColor,
      "color1" :this.props.color1,
      "color2" :this.props.color2,
      "lock":this.state.lock

    }

       fetch(`http://localhost:4000/deletecolor`,{
          method:'POST',
          mode: 'cors',
          headers: {
         'Content-Type': 'application/json'
     },
          body: JSON.stringify(colorJson)})
        setTimeout(()=>{console.log("Done");this.props.update();}, 200);
  }
  else{
     alert("You can't delete the color without unlocking it!");
  }
}

  render(){
    return(

      <div className="each-color-composition" ref={div => this.animate = div} >
         <div className="lock" onClick={this.lock} style={{color:this.state.color}}>{this.state.lock?"locked":"unlocked"}</div>
         <div className="close" onClick={this.closed} style={{color:this.state.color}}> X </div>
        <div className="left-compose" style={{backgroundColor:this.props.color1}}>
        </div>
        <div className="right-compose" style={{backgroundColor:this.props.color2}}>
        </div>

      </div>

    )
  }


}


export default Color;
