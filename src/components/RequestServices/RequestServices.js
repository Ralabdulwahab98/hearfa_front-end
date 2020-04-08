import React from "react";
import RequestService from "./RequestService";
import { getRequestService, OnProgressService } from "../api";
// import './SendTickets.css';
import { getInfo } from "../login/decodeToken";
export default class RequestServices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cus_RequestServices: [],
    };
  }

  componentDidMount() {
    // Take the id of curretn user

    let mId = getInfo().data._id;
    // Mack API call
    getRequestService(mId)
      .then((reponse) => {
        const openServiecs = reponse.data.filter((Service) => {
          if(Service.ServiceState === 'Open' || Service.ServiceState === 'Waiting') {
            return reponse.data;
          }
        });
        this.setState({ cus_RequestServices: openServiecs });
      })
      .catch((error) => {
      });
  }

  changeStateToProgressService = (id) => {
    // Make an API Call to change the state if the  service  to on Progress
    OnProgressService(id);

    const newList = this.state.cus_RequestServices.filter((Service) => {
      return Service._id !== id;
    });
    this.setState({ cus_RequestServices: newList });
  };

  render() {
    // variable to show when there no Services in the array 
    let allServices = <h3> No Services! :( </h3>;
 // if condtion to check the array is greater than zero return and pass the data to RequestService components 
    if (this.state.cus_RequestServices.length > 0) {
      allServices = this.state.cus_RequestServices.map((Services, index) => {
        return (
          <RequestService
            id={Services._id}
            ServiceType={Services.ServiceType}
            ServiceState={Services.ServiceState}
            ServiceDescription={Services.ServiceDescription}
            AllPrice={Services.AllPrice}
            workerId={Services.AllPrice[0]}
            ProgressService={this.changeStateToProgressService}
            key={index}
          />
        );
      });
    }
//display all the services
    return <div className="allServices">{allServices}</div>;
  }
}
