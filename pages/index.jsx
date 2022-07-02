import { useEffect, useState } from "react"
import { userAccessToken, fetchUser } from "../utils/fetchUserDetails.js"
import { useRouter } from "next/router"

import { IoLogOut } from 'react-icons/io5'

const index = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    const accessToken = userAccessToken();
    if (!accessToken) return router.push("/login")

    const [userInfo] = fetchUser()
    setUser(userInfo)
  },[])

  const signOut = () => {
    localStorage.clear()
    router.push("/login")
  }

  return (
    <div className="w-screen h-screen bg-slate-100 flex justify-center items-center">
      <div className="w-1/3 h-auto p-4 bg-white shadow-md rounded-md flex justify-start items-center relative">
        <IoLogOut fontSize={25}
          className="absolute top-3 right-3 cursor-pointer text-gray-600"
          onClick={signOut}
        />
        <img src={user?.photoURL} alt="" className="rounded-md shadow-md" />
        <p className="text-2x1 font-sans font-semibold ml-2">
          {user?.displayName}
          <span className="block text-xs font-serif font-normal">
            {user?.email}
          </span>
        </p>
      </div>
    </div>
  )
}

export default index
