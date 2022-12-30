import React, { Component } from 'react'

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchvalue : '',
      data : null
    }
  }
  
  componentDidMount(){
    fetch('https://api.unsplash.com/photos/?client_id=R57UYIBEZ5OQuFkJEAiJy-ZsDWDpClip4wdSSC-gt3Q')
    .then((result)=>result.json())
    .then((data)=>this.setState((prevState)=>{
      return{
        ...prevState,      
        data:data
      }
    }))
  }
  
  componentDidUpdate(previousProps,prevousState){
    if(this.state.searchvalue !==""){
      fetch(`https://api.unsplash.com/search/photos?page=1&query=${this.state.searchvalue}&client_id=R57UYIBEZ5OQuFkJEAiJy-ZsDWDpClip4wdSSC-gt3Q&per_page=10`)
      // fetch('https://api.unsplash.com/photos/?client_id=uNhnkhSETEwSOEHLS7OzkfhHxPSQnH0R1CWESYupdXc')
    .then((result)=>{return result.json()})
      .then((update) =>{ 
        if(prevousState.searchvalue !== this.state.searchvalue){
          this.setState((prevState)=>{
            return {
              ...prevState,
              data : update.results
            }
          },()=>console.log(this.state.searchvalue))
        }
      })
    }
    
    
  }

  searchValue = (event)=>{
    let query = event.target.value
    this.setState((prevState)=>{
      return{
        ...prevState,
        searchvalue : query

      }
    })
  }

  // handelSearchValue = (event)=>{
  //   if(event.target.matches("button")){
  //     if(this.state.searchvalue !== ""){
  //       let searchURL = `https://api.unsplash.com/search/photos?page=1&query=${this.state.searchvalue}&client_id=uNhnkhSETEwSOEHLS7OzkfhHxPSQnH0R1CWESYupdXc&per_page=10`
  //       fetch(searchURL)
  //       .then ((obj) => obj.json())
  //       .then((data)=>{
  //         this.setState((prevState) => {
  //           return {
  //             ...prevState,
  //             data: data.results
  //           }
  //         })
  //       })
  //     }
  //   }
  // }


  render() {
    // console.log(this.state.searchvalue)
    if(!this.state.data){
      return (
        <div>
          <div className='search'>
            <input id='search' type={'search'}  placeholder={'Search'}></input>
            <button type='submit'>search</button>
               <p>{this.state.searchvalue}</p> 
          </div> 
        <h1 style={{textAlign:'center',fontSize:'50px'}}>Loading...</h1>
        </div>
      )
    }
    else{
      return(
        <div>
          <div className='search'>
          <input id='search' type={'search'}  onChange={this.searchValue} placeholder={'Search'}></input>
          <button type='submit' >
            {/* onClick={this.handelSearchValue} */}
            Search
          </button>
        </div>
        <div className='imagediv'>
          {
            this.state.data.map((dt)=>{
              return (
                <div className='imagescontainer'>
                  <img className='images' src={dt.urls.regular} alt={dt.id} key={dt.id}/>
                 </div> 
              )
            })
          }
        </div>

        </div>
      )
      
    }
    
  }
}

export default App;
