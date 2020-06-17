
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
        const ref = db.collection("fitnessonbroughton").doc("weights").collection("peoplecount").limit(1)
        ref.get().then((snapshot) => {
          snapshot.docs.forEach(doc => {
            let array = doc.data();

            weights.push(array)

            console.log(array)

            this.setState({ weights : weights })
          })        
        })
      }

      getSquatRackCount() {
        const squats = []
        const ref = db.collection('gtuniversity').doc('squatracks').collection('peoplecount').orderBy('timestamp', 'desc').limit(1)
        ref.get().then((snapshot) => {
          snapshot.docs.forEach(doc => {
            let squat = doc.data();

            squats.push(squat)

            this.setState({ squat : squats })
  
          })        
        })
      }

    getPopularTimes() {
        axios.get('https://fast-atoll-53367.herokuapp.com/https://poptimes.herokuapp.com', { headers: { 'Access-Control-Allow-Origin': true } })
        .then(res => {
         this.setState({ poptimes : res.data.populartimes })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    getMachineData() {
        var array = [] 
        var currentNumReserv = 0
        axios.get('https://fast-atoll-53367.herokuapp.com/https://gymsplat.herokuapp.com/machines')
            .then(res => {
                for(var i = 0; i < res.data.length; i++) {
                    currentNumReserv += res.data[i].queue.length
                  }
                  this.setState({ currentReservations : currentNumReserv })
                  this.setState({ allMachineData : res.data})
            })
            .catch(function (error) {
                console.log(error);
        })
    }
}


export default ServerManager