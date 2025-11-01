import React, { useState } from 'react'
import AddCompanyButton from '../../../company/utilsComponets/AddCompanyButton'
import CompanyCreateFormModal from '../../../company/componets/CompanyCreateFormModal'

const Company = () => {
   
const[openCreateModal,setOpenCreateModal] = useState(false)




  return (
    <div className='flex justify-center items-center min-h-64' >

       <AddCompanyButton click = {setOpenCreateModal}/>


       {
        openCreateModal && <CompanyCreateFormModal onClose = {setOpenCreateModal}/>
       }


    </div>



  )
}

export default Company