import AppLayout from '@/components/AppLayout'
import UserProfileForm from '@/components/UserProfileForm'
import { useUser } from '@/contexts/UserProvider'
import { useRouter } from 'next/navigation';
import React from 'react'

function CreateProfile() {
  const {user} = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (user.profile) {
      router.push("/user");
    }
  }, [user])

  return (
    <AppLayout hideSidebar={true}>
      <div className='px-10'>
          <h2 className="font-bold text-[32px] uppercase">Create profile</h2>

          <UserProfileForm profileIsNew={true}/>
      </div>
    </AppLayout>
  )
}

export default CreateProfile