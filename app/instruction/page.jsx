'use client'

import React, { useEffect, useState } from 'react'
import InstallApplication from '../installApplication/page'


function Instruction() {
    let displayMode = '';
    const mqStandAlone = '(display-mode: standalone)';
    const [dpMode, setDpMode] = useState(null)

    useEffect(() => {
        if (navigator) {
            displayMode = (navigator.standalone || window.matchMedia(mqStandAlone).matches) ? ('standalone') : ('browser');
            setDpMode(displayMode)
        }
    })
    return (
        <div>
            <p className="main-text">
                This is a POC application to decide on the Tech stack of Carscan Chat Application.
            </p>
            <p className="main-text">
                Click on "Main" in Navbar to reach the Main page.
            </p>
            {(dpMode == 'browser')
                &&
                (< p className="main-text">
                    To install the PWA version of the Web App, click here: <InstallApplication></InstallApplication>.
                    <br />
                    Or, click on the 3 dots of your browser and then on "Install Application" or "Install App" or "Install".
                </p>)
            }
        </div >
    )
}

export default Instruction