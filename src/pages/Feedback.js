import React from 'react'
import { Table } from 'reactstrap';
import Page from 'components/Page';
import ReactLoading from "react-loading";
import FadeIn from 'react-fade-in';
import DashboardPage from './DashboardPage';
import firebase from 'firebase'

class Feedback extends DashboardPage {

    constructor(props) {
        super(props);
        this.state = {
            done: undefined,
            todos: [],
            done: false
        }
        this.cancel = null
    }

    componentDidMount() {



    setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
          .then(response => response.json())
          .then(json => this.setState({ done: true }));
      }, 1200)

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

         <Page title= "" breadcrumbs={[{ name: 'Feedback', active: true }]} className="Activity" >


        {!this.state.done ? (
          <ReactLoading type={'bars'} color={"#6B7CF7"} />
        ) : (
            <FadeIn>
            <div>
         <br></br>
            <h1 style={{'fontFamily': '-apple-system, BlinkMacSystemFont', 'fontSize': '35px', 'fontWeight': 'bold', 'color': '#0A0D18'}}> Feedback </h1>
            <br></br>
            </div>
            </FadeIn>
            )}


        <div class="tableFixHead">
        <Table striped bordered hover style={{'borderRadius': '50px'}}>
        <tr>
        <th> # </th>
        <th> Date </th>
        <th> Time </th>
        <th> Name </th>
        <th> Location</th>
        <th> Comment </th>
      </tr> 

      <tbody style={{'fontFamily': '-apple-system, BlinkMacSystemFont'}}>
         {
            this.state.todos  && this.state.todos.map( (feedback)  => {
                const timestamp = (feedback._id).toString().substring(0,8)
                const date = new Date( parseInt( timestamp, 16 ) * 1000 )
                const day = date.toDateString()
             return (
                     <tr>
                         <th>  {day}  </th>
                         <th>  {feedback.email}  </th>
                         <th>{feedback.firstName}</th> 
                         <th>{feedback.lastName}</th> 
                         <th>{feedback.role}</th> 
                         <th>{feedback.password}</th> 
                     </tr>
             )
         })
        }
        </tbody>
         </Table>
         </div>
                

          </Page>
        )
    }
}
}

export default Feedback