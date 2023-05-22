import React, { useState } from 'react';
import localStorage from 'localStorage';

function InputSesion({ sesions, setSesions, sesion, currentSesion, isEditing, setIsEditing }) {
  const [sesionTitle, setSesionTitle] = useState(sesion.title);
  const handleEdit = () => {
    if (sesionTitle === '') return

    const newSesions = sesions.map((sesionMap) => {
      if (sesionMap.id === sesion.id) {
        return {
          ...sesionMap,
          title: sesionTitle,
        }
      } else {
        return sesionMap
      }
    }
    )
    setSesions(newSesions)
    setIsEditing(!isEditing)
    localStorage.setItem('sesions', JSON.stringify(newSesions))

  }
  return (
    <>
      <input
        type="text"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={sesionTitle}
        autoFocus={true}
        onChange={(e) => {
          setSesionTitle(e.target.value)
        }}
      />

      {sesion.id === currentSesion?.id && isEditing && (
        <>
          <i className="fas fa-check ml-2"
            onClick={handleEdit}
          ></i>
          <i className="fas fa-times ml-2"
            onClick={() => {
              setIsEditing(!isEditing)
            }
            }
          ></i>
        </>
      )}
    </>
  )
}

export default InputSesion