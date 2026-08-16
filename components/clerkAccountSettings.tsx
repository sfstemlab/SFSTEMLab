import { UserButton } from "@clerk/nextjs"
import { HandHeart, Calendar } from "lucide-react"
import MyEvents from "./myEvents"

const ClerkAccountSettings = () => {
  return (
    <div>
        {/* custom clerk pages */}
        <UserButton>
            <UserButton.UserProfilePage 
                label = 'My Events' 
                url='/my-events' 
                labelIcon={<Calendar className='w-4 h-4'/>}
            >
                <MyEvents />
            </UserButton.UserProfilePage>
        </UserButton>
    </div>
  )
}

export default ClerkAccountSettings