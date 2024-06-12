import { useUser } from '@/contexts/UserProvider'
import React from 'react'

function PointsBalance() {
    const {user} = useUser();

  return (
    <button className="bg-transparent py-2 px-6 flex items-center border cursor-pointer hover:opacity-80 border-white rounded-full font-semibold gap-2">
        <img src="/assets/images/points-icon.png" />
        {Number(user.points || 0).toFixed(2)}
    </button>
  )
}

export default PointsBalance