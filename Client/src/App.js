import React,{ createRef } from 'react';
import './App.css';
import Color from './Color.js';
import "./Color.css";


class App extends React.Component {
  constructor(props) {
     super(props);
     this.state={col1:"",col2:"",render:false,empty:"",key:0};
     this.colors = [];
     this.colorChange = this.colorChange.bind(this);
     this.colorAdded = this.colorAdded.bind(this);
     this.arrayModified = this.arrayModified.bind(this);
     this.updateArray = this.updateArray.bind(this);
     this.validColor = this.validColor.bind(this);
     this.firstinput= createRef();
     this.secondinput =createRef();


     this.verifiedColors =[];
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
  data.map(({key,keyColor,color1,color2,lock})=>{
     (keyColor>maxKey)? maxKey=keyColor : maxKey=maxKey;
     this.colors.push({key:key,keyColor:key,first:color1,second:color2,lock:lock});//********
  });
    maxKey+=1;
    this.setState({key:maxKey});

}

  componentDidMount(){

    this.updateArray();

     this.verifiedColors.push("antiquewhite","aqua","aquamarine","azure",
"beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral",
"cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki",
"darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey",
"darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen",
"fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo",
"ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray",
"lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime",
"limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen",
"mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin",
"navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise",
"palevioletred","papayawhip","peachpuff","peru","pink","plum",
"powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell",
"sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato",
"turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen",
)

}

  colorChange(e){


        this.setState({[e.target.name]:e.target.value});

  }
  validColor(col){


    for(let i=0;i<this.verifiedColors.length;i++){
        if(col=== this.verifiedColors[i]){
           return true;
        }
    }
    return false;
  }


 async colorAdded(e){
   let valid1 =false;
   let valid2= false;

//Capitalize the non # colors
   if(this.state.col1[0] !== "#"){
     if(this.validColor(this.state.col1)){valid1=true;}
     this.state.col1 =this.state.col1[0].toUpperCase()+this.state.col1.slice(1);
   }if(this.state.col2[0]!=="#"){
     if(this.validColor(this.state.col2)){valid2=true;}
     this.state.col2 =this.state.col2[0].toUpperCase()+this.state.col2.slice(1);
   }
   if(this.state.col1[0] === "#"){valid1=true;}
   if(this.state.col2[0] === "#"){valid2=true;}
   if(valid1 && valid2){
   let colorJson= {
    "key":this.state.key,
    "keyColor":this.state.key,
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

    setTimeout(()=>{this.updateArray()}, 100);


  }
  else if(!valid1){
    alert(this.state.col1 +"  is not a valid color. Please try again :)");
  }
  else if(!valid2){
    alert(this.state.col2 +"  is not a valid color. Please try again :)");
  }
  this.setState({[this.firstinput.name]:""});
  this.setState({[this.secondinput.name]:""});
  this.firstinput.value="";
  this.secondinput.value="";
  }

  render(){
     return(

       <div className="biggerPicture">
       <h1 className="welcome-header"> Emre's Colors </h1>
       <p className="welcome-text"> Welcome to my color palette! I created this website to have a space to put the color combinations I like in everyday life. I hope you enjoy it! Feel free to try it, but please delete the colors you create!! Have a good one :) </p>
       <div className="pickcolor">
       <label className="firstlabel"> First: <input className="firstlabel-input" ref={el => this.firstinput = el} name="col1" type="text" onChange={this.colorChange}  />
          <div className="firstbox"style={{backgroundColor:this.state.col1}}> </div>
       </label>
       <label className="secondlabel"> Second: <input className="secondlabel-input" ref={el => this.secondinput = el} type="reset" name="col2" type="text"  onChange={this.colorChange}  />
       <div className="secondbox" style={{backgroundColor:this.state.col2}}> </div>

        </label>
       <button className="button" onClick={this.colorAdded}>Add Color</button>
       </div>
       {this.colors.map(({key,first,second,lock,index})=>(
            <Color key={key} keyColor={key} color1={first} color2={second} lock={lock} update={this.updateArray} />
        )
      )}

      </div>


      );

 }
}

export default App;
