import React from "react"
import AddTicketForm from "./AddTicketForm"
import { getLoggedInVendorProfile } from "@/lib/api/vendors"

const AddTicketPage = async () => {

    const vendor = await getLoggedInVendorProfile();

    return (
        <div>
            <AddTicketForm vendor={vendor}></AddTicketForm> 
        </div>
    )
}

export default AddTicketPage;