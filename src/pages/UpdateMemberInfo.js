import React from 'react';
import DashboardPage from './DashboardPage';
import axios from 'axios';
import Page from 'components/Page';
import FadeIn from 'react-fade-in';
import { Table , Button } from 'reactstrap'
import Modal from 'react-responsive-modal';

class UpdateMemberInfo extends DashboardPage {
    constructor() {
        super();
        this.state = {
            members: '',
            modal: false,
            userId: '',
            firstName: '',
            lastName: ''
        }
    }

    getMembers = event => {
        axios.get('https://fast-atoll-53367.herokuapp.com/https://gymsplat.herokuapp.com/users').then( event => {
            this.setState({ members : event.data })
        })
    }

    editMemberInfo() {
        axios
        .put('https://fast-atoll-53367.herokuapp.com/https://gymsplat.herokuapp.com/users/5e518e6eeea94f5b88759261', {
            // userId: "5e518e6eeea94f5b88759261",
            // email: 'kimiakavanroodi@gmail.com',
            // firstName: 'kim',
            // lastName: 'wow',
            // role: "Member"
        })
        .then (response => {
            console.log(response)
        })
        .catch (err => {
            console.log(err)
        })
    }

    openModal = event => {
        this.setState({ modal : true })
        this.getUserInfo(event);
    }

    getUserInfo(okay) {
        this.setState({ userId : okay._id })
        this.setState({ firstName : okay.firstName })
        this.setState({ lastName : okay.lastName })
    }

    closeModal = event => {
        this.setState({ modal : false })
    }

    componentDidMount() {

        this.getMembers();

    }

    render() {
        return (
              <Page title= "" breadcrumbs={[{ name: 'Member Profile', active: true }]} className="User Profile" >
                <FadeIn>
                <div>
                <br></br>
                <h1 style={{'fontFamily': '-apple-system, BlinkMacSystemFont', 'fontSize': '35px', 'fontWeight': 'bold', 'color': '#0A0D18'}}> Update Member Profile </h1>
                <br></br>

                <Modal 
                    classNames={{
                    overlay: 'customOverlay',
                    modal: 'customModal',
                    }} open={this.state.modal} onClose={this.closeModal} center>

                </Modal>

                <Table responsive>
                    <tr>
                        <th> # </th>
                        <th> Name </th>
                        <th> Email </th>
                        <th>  </th>

                    </tr>
                    {
                        this.state.members && this.state.members.map((event, i) => {
                            return (
                             <tr onClick={() => this.openModal} key={i} >
                                 <th> {i + 1} </th>
                                 <th> {event.firstName + " " + event.lastName} </th>
                                 <th> {event.email} </th>
                                 <th> <Button style={{'color': 'white'}} onClick={() => this.openModal(event)}> Edit </Button> </th>

                             </tr>
                            )
                        })
                    }
                </Table>
                </div>
                </FadeIn>
            </Page>
        )
    }
}

export default UpdateMemberInfo;