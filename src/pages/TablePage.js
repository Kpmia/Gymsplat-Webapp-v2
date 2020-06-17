import { Table } from 'reactstrap';
import Page from 'components/Page';
import React from 'react';
import db from './firebase'
import ReactLoading from 'react-loading'
import FadeIn from 'react-fade-in'
import DashboardPage from './DashboardPage';
import firebase from 'firebase'


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


    var people = db.collection('gtuniversity').doc('peoplecountfromgym').collection('peoplecount').orderBy("timestamp", 'desc').limit(1)
    people.get().then(snapshot => {
      const peoplecountfromgym = []
      snapshot.forEach( doc => {
        console.log(doc.data())
        const data = doc.data()
        peoplecountfromgym.push(data)
      })
      this.setState({peoplecountfromgym :  peoplecountfromgym.People === 'number' ? parseInt(peoplecountfromgym.People) : peoplecountfromgym.People});      
      this.setState({ peoplecountfromgym : peoplecountfromgym })

    }) 
    .catch( error => console.log(error))
    window.scrollTo(0, 0);
  }


  render() {

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

    <div class="tableFixHead">
    <Table striped bordered hover style={{'borderRadius': '50px'}}>
      <tr>
        <th> Date </th>
        <th> Time </th>
        <th> Location </th>
        <th> People </th>
      </tr>
      
      <tbody style={{'fontFamily': '-apple-system'}}>
        {
            this.state.peoplecountfromgym &&
                this.state.peoplecountfromgym.map( peoplecountfromgym => {
                  return (
                    <tr> 
                    <td classname = "mb-3"> {peoplecountfromgym.Month}/{peoplecountfromgym.Day}/{peoplecountfromgym.Year}</td>
                    <td> {peoplecountfromgym.Hour}:{peoplecountfromgym.Minute}</td>
                    <td> {peoplecountfromgym.Location} </td>
                    <td> {peoplecountfromgym.People} </td>
                    </tr>
                  )
                })
              }
              
    </tbody>
    </Table>
    </div>
        </Page>
      );
    };
  }
}

export default TablePage;


