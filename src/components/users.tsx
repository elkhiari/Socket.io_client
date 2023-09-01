import React from 'react'

function UsersLogin({username, users} : {username : string, users : any}) {
  return (
    <ul className="w-full  overflow-y-auto space-y-2 py-2 h-full relative">
        {
            users && users.map((user : any, index : number) => {
                return (
                    username !== user.username && (
                <li key={index} className="w-full h-14 px-6 space-x-4 border-l-4 border-green-600 flex place-items-center">
                    <div className='w-8 h-8  p-2 font-black rounded-full text-white bg-green-600 flex place-items-center place-content-center'>
                        {user.username[0]}
                    </div> <span className="text-green-600 font-black">{user.username}</span>
                </li>)
            )})
        }
    </ul>
  )
}

export default UsersLogin