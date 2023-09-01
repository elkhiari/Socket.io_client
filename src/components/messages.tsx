import React, {useRef, useEffect} from 'react'

function MessagesData({username, messages} : {username : string, messages : any}) {
    const toButtom = useRef<any>(null);
    useEffect(() => {
        toButtom.current.scrollTop = toButtom.current.scrollHeight;
    }, [messages])
  return (
    <ul className="w-full  overflow-y-auto space-y-2 py-2 h-[calc(100%-3.5rem)] relative " ref={toButtom}>
        {
            messages && messages.map((message : any, index : number) => {
                return (
                    message.username !== username ? (
                        <li key={index} className="w-full flex relative justify-start items-center space-x-2">
                        <li className="w-full h-14 px-6 space-x-4  flex place-items-center bg-green-200">
                            <div className='w-8 h-8  p-2 font-black rounded-full text-white bg-green-600 flex place-items-center place-content-center'>
                                {message.username[0]}
                            </div> 
                            <div className='flex flex-col -space-y-2'>
                                <span className='text-green-600 font-bold text-lg'>{message.username}</span>
                                <span className='text-black'>{message.text}</span>
                            </div>
                        </li>
                    </li>
                    ) : (
                        <li key={index} className="w-full flex justify-end items-center space-x-2">
                        <li className="w-full h-14 px-6 space-x-4  flex place-items-center bg-blue-200">
                            <div className='w-8 h-8  p-2 font-black rounded-full text-white bg-blue-600 flex place-items-center place-content-center'>
                                {message.username[0]}
                            </div> 
                            <div className='flex flex-col -space-y-2'>
                                <span className='text-blue-600 font-bold text-lg'>You</span>
                                <span className='text-black'>{message.text}</span>
                            </div>
                        </li>
                    </li>
                    )
                )
            })
        }
    </ul>
  )
}

export default MessagesData