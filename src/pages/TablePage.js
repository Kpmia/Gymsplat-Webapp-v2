import { Table, Button } from 'reactstrap';
import Page from 'components/Page';
import React from 'react';
import db from './firebase'
import ReactLoading from 'react-loading'
import FadeIn from 'react-fade-in'
import DashboardPage from './DashboardPage';
import firebase from 'firebase'
import axios from 'axios'


class TablePage extends DashboardPage {

  constructor() {
    super();
    this.state = {
      peoplecountfromgym: null,
      done: false
      }
    }


  componentDidMount() {


    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user)
      } else {
        console.log('none')
      }
    });

    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => this.setState({ done: true }));
    }, 1200);

    let date = new Date()


    // var people = db.collection('fitnessonbroughton').doc('weights').collection('peoplecount').where('Day', '==', date.getDate())
    // people.get().then(snapshot => {
    //   const peoplecountfromgym = []
    //   snapshot.forEach( doc => {
    //     console.log(doc.data())
    //     const data = doc.data()
        
    //     console.log(data)

    //     peoplecountfromgym.push(data)

    //     peoplecountfromgym.sort()
        
        
    //   })
    // })
  //     this.setState({peoplecountfromgym :  peoplecountfromgym.People === 'number' ? parseInt(peoplecountfromgym.People) : peoplecountfromgym.People});      
  //     this.setState({ peoplecountfromgym : peoplecountfromgym })

  //   }) 
  //   .catch( error => console.log(error))
  //   window.scrollTo(0, 0);
  // }
  }


  render() {

    var date = new Date().toLocaleDateString()

    if(!this.state.done) {
      return (
          <div>
              Loading 
          </div>
      )
  } else {

    return (

    <Page title= "" breadcrumbs={[{ name: 'Reports', active: true }]} className="Reports" >



{!this.state.done ? (
          <ReactLoading type={'bars'} color={"#6B7CF7"} />
        ) : (
            <FadeIn>
            <div>
         <br></br>
            <h1 style={{'fontFamily': '-apple-system, BlinkMacSystemFont', 'fontSize': '35px', 'fontWeight': 'bold', 'color': '#0A0D18'}}> Reports </h1>
            <br></br>
            </div>
            </FadeIn>
            )}

    <Button onClick={() => window.location.href = 'https://us-central1-fitnessonbroughton-6994c.cloudfunctions.net/csvJsonReport'} style={{color: 'white'}}> CSV File for {date} </Button>
        </Page>
      );
    };
  }
}

export default TablePage;


