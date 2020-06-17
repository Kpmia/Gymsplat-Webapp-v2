import React from 'react';
import firebase from 'firebase';
import { Button, Label, Input, Col, Row, Card, CardBody, Form } from 'reactstrap';
import Page from 'components/Page';
import FadeIn from 'react-fade-in';
import Modal from 'react-responsive-modal'





class UpdateUserInfo extends React.Component {

    constructor() {
        super();
        this.state={
            currentUser: [],
            oldEmail: '',
            email: '',
            displayName: '',
            profilePic: '',
            oldPassword: '',
            phoneNumber: '',
            password: '',
            openModal: false,
            openModalPassword: false,
            checkUser: true
        }
    }

    changeEmail = event => {
        this.setState({ email : event.target.value })
    }

    changeDisplayName = event => {
        console.log(event.target.value)
        this.setState({ displayName : event.target.value })
    }

    addProfilePic = event => {
        this.setState({ profilePic : event.target.value })
    }

    addPhoneNumber = event => {
        this.setState({ phoneNumber : event.target.value })
    }

    changePassword = event => {
        console.log(event.target.value)
        this.setState({ password : event.target.value })
    }

    confirmOldPass = event => {
        this.setState({ oldPassword : event.target.value })
    }

    confirmOldEmail = event => {
        this.setState({ oldEmail : event.target.value })
    }

    openModal = event => {
        this.setState({ openModal : true })
    }
    
    closeModal = event => {
        this.setState({ openModal : false })
    }

    openModalPassword = event => {
        this.setState({ openModalPassword : true })
    }

    closeModalPassword = event => {
        this.setState({ openModalPassword : false })
    }

    updateUserNameFB(nameone) {
        const database = firebase.database();

        database.ref('crc/users').on('value', event => {

            let currentUser = firebase.auth().currentUser

            database.ref('crc/users/' + currentUser.uid).update({
                name: nameone
            })
        })
    }


    updateUserEmail(emailone) {
        const database = firebase.database();

        database.ref('crc/users').on('value', event => {

            let currentUser = firebase.auth().currentUser

            console.log(currentUser)

            database.ref('crc/users/' + currentUser.uid).update({
                email: emailone
            })
        })
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

    updateUserDisplayName = event => {

        this.checkLoggedUser();

        var user = firebase.auth().currentUser;

        if (this.state.displayName == "") {
            alert('Fill out a name.')
            return;
        }

        user.updateProfile({
            displayName: this.state.displayName
            }).then(event => {
                console.log(user)
                alert('Success!')
                this.updateUserNameFB(this.state.displayName)
                this.setState({ currentName : user.displayName })

            }).catch(function(error) {
                alert(error.message)
                return;
            });
    }

    updateUserPassword = event => {

        if (this.state.password == "") {
            alert('Please fill out the field.')
            return;
        }
        if (this.state.password == this.state.oldPassword) {
            alert('You cannot have the same password.')
        }

        this.checkLoggedUser();

        firebase.auth().signInWithEmailAndPassword(this.state.currentEmail, this.state.oldPassword)
        .then(userCredential => {

            var user = firebase.auth().currentUser

            user.updatePassword(
                this.state.password.toString()
            ) .then (event => {
                console.log(event)
                alert('Success!')
                return;
            })
        })  .catch ( err => {
            alert(err.message)
            return;
        })
    }

    updateUserEmail = event => {
        if (this.state.email == "") {
            alert('Fill out an email.')
            return;
        }
        if (this.state.email == this.state.currentEmail) {
            alert('You cannot use the same email.')
            return;
        }

        firebase.auth().signInWithEmailAndPassword(this.state.currentEmail, this.state.oldPassword)
        .then(userCredential => {

            var user = firebase.auth().currentUser
            
            
            user.updateEmail(
                this.state.email.toString()
            ) .then(event => {
                alert('Success!')
                this.setState({ currentEmail : this.state.email })
                return;
   
            })})
        .catch(err => {
             alert(err.message)
             return;
        })
    }


    componentDidMount() {
        this.checkLoggedUser()

    }
    render() {


        return (

            <Page title= "" breadcrumbs={[{ name: 'User Profile', active: true }]} className="User Profile" >


                        <FadeIn>
                        <div>
                    <br></br>
                        <h1 style={{'fontFamily': '-apple-system, BlinkMacSystemFont', 'fontSize': '35px', 'fontWeight': 'bold', 'color': '#0A0D18'}}> Update Profile </h1>
                        <br></br>
                        </div>
                        </FadeIn>

                <Row>

                <Col lg={7} md={6} sm={6} xs={12} >


                <Form> 
                 <div className="form-group">
                     <label style={{'fontFamily': 'BlinkMacSystemFont'}}> Email address</label>
                     <Input  onChange={this.changeEmail} required className="form-control" placeholder="Enter email" email="email" />

                     <Button onClick={this.openModal} className="btn-block border-0" style={{'color': 'white'}}> Update </Button>

                     </div>



                 <Row>
                  <Col>
                  <div className="form-group">
                     <label> Display Name </label>
                     <Input  onChange={this.changeDisplayName}   placeholder="Enter name" />
                 </div>
                     <Button onClick={this.updateUserDisplayName} className="btn-block border-0" style={{'color': 'white'}}> Update </Button>
                 </Col>
                 <Col>

                 <div className="form-group">
                     <label> Enter new password </label>
                     <Input onChange={this.changePassword} id="phone" name="phone" type="tel" required className="form-control" placeholder="Enter password" />
                 </div>

                 <Button onClick={this.openModalPassword} className="btn-block border-0" style={{'color': 'white'}}> Update Password </Button>



                 </Col>
                 </Row>

                 <Row>

                <Col>


                 </Col>
                 </Row>

                 <Modal 
                        classNames={{
                        overlay: 'customOverlay',
                        modal: 'customModal',
                        }} open={this.state.openModal} onClose={this.closeModal} center>


                        <p className="float-center"> Please enter your password to confirm. </p>

                        <div className="form-group">
                            <label> Password </label>
                            <Input onChange={this.confirmOldPass} id="phone" name="phone" type="tel" required className="form-control" placeholder="Enter password" />
                        </div>

                        <Button onClick={this.updateUserEmail} className="btn-block border-0" style={{'color': 'white'}}> Confirm Changes </Button>

                            
                </Modal>

                <Modal 
                        classNames={{
                        overlay: 'customOverlay',
                        modal: 'customModal',
                        }} open={this.state.openModalPassword} onClose={this.closeModalPassword} center>


                        <p className="float-center"> Please enter your password to confirm. </p>

                        <div className="form-group">
                            <label> Password </label>
                            <Input onChange={this.confirmOldPass} id="phone" name="phone" type="tel" required className="form-control" placeholder="Enter password" />
                            <Button onClick={this.updateUserPassword} className="btn-block border-0" style={{'color': 'white'}}> Confirm Changes </Button>
                        </div>

                </Modal>

                 <p className="forgot-password text-right">
                 </p>

                 </Form>
                 </Col>

                 <Col lg={3} md={6} sm={6} xs={12} >

                <br></br>

                <Card style={{'border-radius': '2px', 'background': 'white'}}>
                 <CardBody>
                 <div class="card-body">
                    <p > Current User </p>
                    <p > Email: {this.state.currentEmail} </p>
                    <p> Name: {this.state.currentName} </p>



                </div>
                 </CardBody>
             </Card>  

                 </Col>

                 </Row>
            </Page>
        )
    }
}

export default UpdateUserInfo;