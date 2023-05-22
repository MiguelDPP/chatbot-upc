import React from 'react'
// InputSesion
import InputSesion from '../components/InputSesion';

function ItemSesion({
  sesion,
  sesions,
  setSesions,
  currentSesion,
  setCurrentSesion,
  setMessages,
  setPromp,
  isEditing,
  setIsEditing,
  index,
  changeSesion
}) {
  return (
    <li onClick={() => changeSesion(sesion)} key={index}>
      <div className={`flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer justify-between mt-1 ${currentSesion?.id == sesion.id ? 'bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-700' : ''}`}>

        {(!isEditing || sesion.id != currentSesion.id) && (
          <span className="flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis text-sm">{sesion.title}</span>
        )}
        {isEditing && sesion.id == currentSesion?.id && (
          <InputSesion sesions={sesions} setSesions={setSesions} sesion={sesion} currentSesion={currentSesion} isEditing={isEditing} setIsEditing={setIsEditing} />
        )}

        {sesion.id === currentSesion?.id && !isEditing && (
          <>
            <i className="fas fa-pencil ml-2"
              onClick={() => {
                setIsEditing(!isEditing)
              }
              }
            ></i>
            <i className="fas fa-trash ml-2"
              onClick={() => {
                const newSesions = sesions.filter((sesionMap) => sesionMap.id !== sesion.id)
                setSesions(newSesions)
                localStorage.setItem('sesions', JSON.stringify(newSesions))
                setCurrentSesion(null)
                setMessages([])
                setPromp('')
              }
              }
            ></i>
          </>
        )}

      </div>
    </li>
  )
}

export default ItemSesion