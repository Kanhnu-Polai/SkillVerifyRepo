import React, { useState } from 'react'
import PrimaryCameraPreview from './monitorComponets/PrimaryCameraPreview'
import CameraGuidelines from './CameraGuidelines';

const AllowCamera = () => {
    const[allowPrimaryCamera,setAllowPrimaryCamera] = useState(false);
    const[allowMobileCamera,setAllowMobileCamera] = useState(false)
    const[allowScreenSharing,setAllowScreenSharing] =useState(false)
  return (
    <div>


        {
            <CameraGuidelines setAllowPrimaryCamera ={setAllowPrimaryCamera} allowPrimaryCamera = {allowPrimaryCamera} allowMobileCamera = {allowMobileCamera} setAllowMobileCamera= {setAllowMobileCamera} />
        }
       
    </div>
  )
}

export default AllowCamera