import React, { Component } from 'react'
import {getAllServiceInWaitingList} from '../api'
import {getInfo}  from '../login/decodeToken'
import WaitingService from './WaitingService'
export default class ContainerOfWaitingService extends Component {
    constructor(props){
        super(props)
        this.state={
            WaitingList:[]
        }
    }
    componentDidMount(){
        // Mack API call 
        let mId = getInfo().data._id
        getAllServiceInWaitingList(mId)
        .then((res)=>{
            this.setState({WaitingList:res.data})
        })
        .catch( (error)=>{
            console.log(' API error: ',error );
        })
    }
    render() {
        let AllWaitingList =  <div className="main-container">
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
        if(this.state.WaitingList.length > 0 ){
            AllWaitingList = this.state.WaitingList.map((WaitingLists , index )=> {
            return(
            <WaitingService 
            id={WaitingLists._id}
            ServiceType={WaitingLists.ServiceType}
            ServiceState={WaitingLists.ServiceState}
            ServiceDescription={WaitingLists.ServiceDescription}
            key={index} /> 
            );
        })}
      return(
          <div className="allServices">
              {AllWaitingList}    
          </div>
          );
    }
}
