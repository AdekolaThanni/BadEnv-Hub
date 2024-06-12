import AppLayout from '@/components/AppLayout';
import React from 'react';
import UserProfileForm from "@/components/UserProfileForm";

function editProfile() {    
  return (
    <AppLayout>
        <h2 className="font-bold text-[32px] uppercase">Edit profile</h2>

        {/* form */}
        <UserProfileForm profileIsNew={false}/>
    </AppLayout>
  )
}

export default editProfile