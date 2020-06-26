
import axios from 'axios'
import React from 'react'
import { MdThumbsUpDown } from 'react-icons/md';
import db from './firebase'


class ServerManager extends React.Component {

    constructor() {
        super();
        this.state= {
            poptimes: "",
            allMachineData: "",
            currentReservations: "",
        }
    }

    getWeightsCount() {
        const weights= []
        const ref = db.collection("fitnessonbroughton").doc("weights").collection("peoplecount").orderBy("timestamp", 'desc').limit(1)
        ref.get().then((snapshot) => {
          snapshot.docs.forEach(doc => {
            let array = doc.data();

            weights.push(array)

            this.setState({ weights : weights })
          })        
        })
      }

}


export default ServerManager