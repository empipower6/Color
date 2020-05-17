import React,{ createRef } from 'react';
import './App.css';
import Color from './Color.js';
import "./Color.css";
import { TweenMax } from 'gsap/all';

class App extends React.Component {
  constructor(props) {
     super(props);
     this.state={col1:"",col2:"",render:false,empty:"",key:0};
     this.colors = [];
     this.colorChange = this.colorChange.bind(this);
     this.colorAdded = this.colorAdded.bind(this);
     this.arrayModified = this.arrayModified.bind(this);
     this.updateArray = this.updateArray.bind(this);
     this.firstinput= createRef();
     this.secondinput =createRef();
}

  async updateArray(){

    this.colors=[];
    const result = await fetch(`/color`);
    const data = await result.json();
    this.arrayModified(data);
    this.setState({render:true});
  }
  arrayModified(data){
    let maxKey=0;
  data.map(({key,color1,color2,lock})=>{
     (key>maxKey)? maxKey=key : maxKey=maxKey;
     this.colors.push({key:key,first:color1,second:color2,lock:lock});//********
  });
    maxKey+=1;
    this.setState({key:maxKey});

}

  componentDidMount(){

    this.updateArray();
    if(process.env.NODE_ENV === 'production') {
     console.log("It's production");
      } else {
        console.log("It's development");
     }


}

  colorChange(e){

        this.setState({[e.target.name]:e.target.value});

  }

 async colorAdded(e){

   let colorJson= {
    "key":this.state.key,
   	"color1" :this.state.col1,//******
   	"color2" :this.state.col2,
    "lock" :false

   }

   this.setState({key:this.state.key+1});

      fetch(`/newcolor`,{
         method:'POST',
         headers: {
        'Content-Type': 'application/json'
    },
         body: JSON.stringify(colorJson)})

    setTimeout(()=>{console.log("Done");this.updateArray()}, 100);
    this.firstinput.value="";
    this.secondinput.value="";


  }

  render(){
     return(

       <div className="biggerPicture">

       <div className="pickcolor">
       <label className="firstlabel"> First: <input className="firstlabel-input" ref={el => this.firstinput = el} name="col1" type="text" onChange={this.colorChange}  /> </label>
       <label className="secondlabel"> Second: <input className="secondlabel-input" ref={el => this.secondinput = el} type="reset" name="col2" type="text"  onChange={this.colorChange}  /> </label>
       <button className="button" onClick={this.colorAdded}>Add Color</button>
       </div>
       {this.colors.map(({key,first,second,lock})=>(
            <Color keyColor={key} color1={first} color2={second} lock={lock} update={this.updateArray} />
        )
      )}

      </div>


      );

 }
}

export default App;
