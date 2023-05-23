import React from 'react'

export default function Response({
  response
}) {
  const { role, content, isError } = response;
  return (
    <div className={`flex ${role == 'user' ? '' : 'flex-row-reverse'} justify-end mt-4`}>
      <div
        className={`py-3 px-4 ${role == 'user' ? 'mr-2 bg-blue-400 rounded-bl-3xl' : 'ml-2  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-br-3xl'}  rounded-tl-3xl rounded-tr-xl text-white`}
      >
        {isError && (
          <i className="fas fa-exclamation-triangle mr-2 text-red-400" />
        )
        }
        {content}
      </div>
      <img
        src={role == 'user' ? './img/user_avatar.png' : './img/upc_avatar.png'}
        className={`object-cover h-8 w-8 rounded-full ${role == 'user' ? '' : ''}`}
        alt=""
      // p-1 border-2 border-slate-100
      />
    </div>
  )
}
