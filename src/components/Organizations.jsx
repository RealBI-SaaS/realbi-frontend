import CreateOrganization from "./org/CreateOrganization";
import UserOrganizations from "./org/UserOrganizations";

function Organizations() {
  return (

  <div className='grid grid-cols-6 bg-gray-100 h-full mt-20 pt-20'> 
      <div className=" col-span-5 border w-full max-w-screen-lg mt-5 p-4 rounded-lg shadow-md w-full ">

        <h1 className="text-xl mb-4">Your Organizations</h1>
        <UserOrganizations />
    </div>

    <div className=" col-span-5 border w-full max-w-screen-lg mt-5 p-4 rounded-lg shadow-md w-full ">
        <h1 className="text-xl mb-4">New Organizations</h1>
        <CreateOrganization />
    </div>

  </div>


  )
   }

export default Organizations;



