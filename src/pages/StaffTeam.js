import React from 'react';
import DashboardPage from './DashboardPage';
import Page from 'components/Page'
import FadeIn from 'react-fade-in'
import firebase from 'firebase'
import { Row, Col, Form, Input, Label, Button, Table } from 'reactstrap'
import Cookies from 'universal-cookie'

var database = firebase.database()
var cookies = new Cookies()


class StaffTeam extends DashboardPage {
    constructor() {
        super();
        this.state={
            name: '',
            email: '',
            password: '',
            role: '',
            UID: '',
            staffMembers: []
        }
    }

    handleChangeEmail = event => {
        this.setState({ email : event.target.value })
    }

    handleChangeName = event => {
        this.setState({ name : event.target.value })
    }

    handleChangePassword = event => {
        this.setState({ password : event.target.value })
    }

    handleStaffRole = event => {
        this.setState({ role : event.target.value })
    }

    handleChangeName = event => {
        this.setState({ name : event.target.value })
    }


    checkLoggedUser() {

        firebase.auth().onAuthStateChanged(event => {
            if (true) {
                this.setState({ currentName : event.displayName })
                this.setState({ currentEmail : event.email })
                
            } else {
              console.log('none')
            }
          });
    }

    signUpStaff = event => {

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then( event => {
            database.ref('crc/users/' + event.user.uid).set({
                id: event.user.uid, name:  this.state.name, email: this.state.email, role: this.state.role, password: this.state.password,
                accountCreation: event.user.metadata.creationTime
            })
            var userone = firebase.auth().currentUser

            userone.updateProfile({
                displayName: this.state.name
            }) .then (event => {
                console.log('Success!')
            })

        }) .catch( err => {
            alert(err.message)
            return;
        })

    }



    getStaffMembers() {
        database.ref('crc/users').on('value', event => {

            let users = event.val()

            console.log(users)

            let newState = []

            var displayName = ''

            for (var user in users) {
                displayName = users[user].name
                console.log(user)
                console.log(users[user].email)
                newState.push({
                    _id: user,
                    creation: users[user].accountCreation,
                    name: users[user].name,
                    role: users[user].role,
                    email: users[user].email
                })
            }

            

            this.setState({
                users: newState
            })

            console.log(this.state.users)


        })
    }


    componentDidMount() {

    this.getStaffMembers();

    }

    render() {
        return (
            <Page title= "" breadcrumbs={[{ name: 'Staff Team', active: true }]} className="User Profile" >
                    <FadeIn>
                    <div>
                <br></br>
                    <h1 style={{'fontFamily': '-apple-system, BlinkMacSystemFont', 'fontSize': '35px', 'fontWeight': 'bold', 'color': '#0A0D18'}}> Manage Staff </h1>
                    <br></br>
                    </div>
                    </FadeIn>


                    <Form> 
                 <div className="form-group">
                     <label style={{'fontFamily': 'BlinkMacSystemFont'}}> Enter Email Address </label>
                     <Input  onChange={this.handleChangeEmail} required className="form-control" placeholder="Enter email" email="email" />

                 </div>
                 

                 <Row>
                  <Col>
                     <label> Password </label>
                     <Input  onChange={this.handleChangePassword}   placeholder="Enter name" />
                 </Col>
                 <Col>
                 <div className="form-group">
                     <label style={{'fontFamily': 'BlinkMacSystemFont'}}> Name </label>
                     <Input  onChange={this.handleChangeName} required className="form-control" placeholder="Enter email" email="email" />

                 </div>
                 
                 </Col>

                 <Col>
                     <label> Role </label>
                     <Input  onChange={this.handleStaffRole}   placeholder="Enter name" />
                 </Col>

                 <Button onClick={this.signUpStaff} className="btn-block border-0" style={{'color': 'white'}}> Add Staff Member </Button>


                 <Table>
                     <tr>
                        <th> # </th>
                        <th> Account Created </th>
                         <th> Name </th>
                         <th> Email </th>
                         <th> Role </th>
                     </tr>

                     <tbody>
                         {
                             this.state.users && this.state.users.map((event, i) => {
                                 console.log(event)
                                 return (
                                     <tr key={i}>
                                         <th> {i + 1} </th>
                                         <th> {event.creation} </th>
                                         <th> {event.name} </th>
                                         <th> {event.email} </th>
                                         <th> {event.role} </th>
                                     </tr>
                                 )
                             })
                         }
                     </tbody>
                 </Table>


                 </Row>
                 </Form>

            </Page>
        )
    }
}

export default StaffTeam;