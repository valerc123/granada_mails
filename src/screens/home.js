import React, {Component} from 'react';
import Inbox from '../components/inbox';
import '../css/send.css'

class Home extends Component
{
    render(){
        return (
            <div>
                <Inbox />
            </div>
        )
    }
}
export default Home