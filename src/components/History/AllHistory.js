// All History

import React from "react";
import HistoryList from "./HistoryList"
import { getAllClosedService , deleteOneService } from "../api";
import { getInfo } from '../login/decodeToken';
import Swal from "sweetalert2";
export default class AllHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          History: [],
        };
    }

    // Function to set data in History state
    componentDidMount(){

        /// get the id of current user 
        let ID = getInfo().data._id

        // Mack API call to get all the service of close state
        getAllClosedService(ID)
        .then( (reponse)=>{
            this.setState({History: reponse.data})
        })
        .catch( (error)=>{
        })
    }
    // Function filter and set data in History state
    delete = (id) => {

        // Mack API call to delete a service by id 
        deleteOneService(id)
           .then((res) => {

               // Filter the set to remove the service was deleted 
               const History = this.state.History.filter((History) => {
                   return History._id !== id; 
               });

               Swal.fire(`The Service Deleted`,"",'success')
               this.setState({ History});
           })
           .catch((err) => {
           })
   }

    render(){ 
      let AllHistory =  
      <div className="main-container">
      <div className="first-container share">
                  <h1> <span>N</span>
                 <span>O</span>
                 <span>S</span>
                 <span>E</span>
                 <span>R</span>
                 <span>V</span>
                 <span>I</span>
                 <span>C</span>
                 <span>E</span>
                 <span>S</span>
                      </h1></div>
                      </div>
          if(this.state.History.length > 0 ){
            AllHistory= this.state.History.map( (Services , index)=> {
              return(
              <HistoryList
              id={Services._id}
              ServiceType={Services.ServiceType}
              ServiceState={Services.ServiceState}
              ServiceDescription={Services.ServiceDescription}
              deletOneSerives={this.delete}
              key={index} /> 
              );
          })}

      return(
          <div className="allServices">
          {AllHistory}
          </div>);
      
  }


}
