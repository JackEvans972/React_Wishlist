import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { WishlistBanner } from './WishlistBanner';
import { WishlistRow } from './WishlistRow';
import { WishlistCreator } from './WishlistCreator';
import {VisibilityControl} from './VisibilityControl';


export default class App extends Component {


  constructor(props){
    super(props);
    
    this.state = {
        userName: "Jack", 
        wishlistCars: [
          {
            car: "Lamborghini Aventador",
            purchased: false
          },
          {
            car: "Tesla Model S",
            purchased: false
          },
          {
            car: "Ferrari 488 ",
            purchased: true
          },
          {
            car: "Camaro SS",
            purchased: false
          },
          {
            car: "Dodge Hellcat",
            purchased: true
          }
        ]
        , showCompleted: true
        
    }
  }

  changeStateData = () => {
    this.setState(
      {userName: this.state.userName === "Jack" ? "Chris" : "Jack"}
    )
  }


  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value});
  }


  createNewCar = (task) => {
    if(!this.state.wishlistCars.find(x => x.car === this.state.newItemText)){
      this.setState({
       
        wishlistCars: [...this.state.wishlistCars, { car: task,
        purchased:false }]
      },
      () => localStorage.setItem("cars", JSON.stringify(this.state)
      )
      );
    }
  }

  toggleCar = (todo) => this.setState(
    {
      wishlistCars: this.state.wishlistCars.map(item => item.car === todo.car ? {...item, purchased: !item.purchased} : item)
    },
    () => localStorage.setItem("cars", JSON.stringify(this.state))
  );

  wishlistTableRows = (purchasedValue) => this.state.wishlistCars.filter(item => item.purchased === purchasedValue).map(item =>

    <WishlistRow  key={ item.car } item={ item } callback={ this.toggleCar } />
    );

    componentDidMount = () => {
      let data = localStorage.getItem("cars");
      this.setState(data != null ? JSON.parse(data) : {
          userName:"Jack",
          wishlistCars: [
              {car: "Tesla Model S", purchased: false},
              {car: "Lamborghini Aventador", purchased:false},
              {car: "Ferrari 488", purchased:true},
              {car: "Dodge Hellcat", purchased:false},
          ],
          showCompleted: true
      });
  }    
  render = () =>
  <div>

<WishlistBanner name={this.state.userName} tasks={this.state.wishlistCars} />
    <div className="container-fluid">
      <WishlistCreator callback={ this.createNewCar } />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Car</th>
            <th>Purchased</th>
          </tr>
        </thead>
        <tbody>{this.wishlistTableRows(false)}</tbody>
      </table>
      <div className="bg-danger text-white text-center p-2">
        <VisibilityControl description="Cars That I Already Have" isChecked=
        {this.state.showCompleted} callback={ (checked) => this.setState({showCompleted: checked})}/>
      </div>
      {this.state.showCompleted &&
        <table className="table table-striped table bordered">
          <thead>
            <tr>
              <th>Cars</th>
              <th>Purchased</th>
            </tr>
            </thead>
            <tbody>
              {this.wishlistTableRows(true)}
            </tbody>
        </table>
      }
    </div>
  </div>
  

}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
