//ALL Received Service 

import React from 'react';
import ReceivedService from './ReceivedService'
import { getAllServiceInOnProgress } from '../api';
import { getInfo } from '../login/decodeToken'


export default class ReceivedServices extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            Emp_ReceivedServices: [],
        };
    }
    
    componentDidMount() {
        // get the id of curretn user
        let ID = getInfo().data._id

        // Mack API call to get all Service os state OnProgress
        getAllServiceInOnProgress(ID)
            .then((reponse) => {
                this.setState({ Emp_ReceivedServices: reponse.data });
            })
            .catch((error) => {
            })
    }
    render() {
         // variable to show when there no Services in the array 
        let allServices =  
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

 // if condtion to check the array is greater than zero return and pass the data to ReceivedService components 
        if (this.state.Emp_ReceivedServices.length > 0) {
            allServices = this.state.Emp_ReceivedServices.map((Services, index) => {
                return (
                    <ReceivedService
                        id={Services._id}
                        ServiceType={Services.ServiceType}
                        ServiceState={Services.ServiceState}
                        ServiceDescription={Services.ServiceDescription}
                        key={index} />
                );
            })
        }

        return (
            <div className="allServices">
            {allServices}    
            </div>);
    }

} 