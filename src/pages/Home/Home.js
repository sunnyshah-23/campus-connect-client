
import React from 'react'
import Sidebar from '../../component/Sidebar/Sidebar'
import Topbar from '../../component/Topbar/Topbar'
import Feed from "../../component/Feed/Feed"


function Home() {

    return (
        <>
            <Topbar />
            <div>
                <div className='row'>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-6'>
                        <Feed />
                    </div>

                </div>

            </div>
        </>
    )
}

export default Home