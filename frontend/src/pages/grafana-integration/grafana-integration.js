import React from 'react'

//configuration file that has the values stored for users
/* import config from './config' */

class SampleDashboard extends React.Component {
    render() {
        //suppose user is received from props
        const { user } = this.props
        return (
            <>
               <iframe width="1000" height="1000" src="https://snapshot.raintank.io/dashboard/snapshot/yAZpBzJjD68Y5RuHUlgaoM8S5K0VGM3U" />;
            </>
        )
    }
}
export default SampleDashboard