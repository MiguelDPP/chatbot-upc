import React, { useState } from 'react';
// InputSesion
import InputSesion from '../components/InputSesion';
import styles from '../styles/chat.module.css'


function Aside(
  {
    sesions,
    setSesions,
    currentSesion,
    setCurrentSesion,
    setMessages,
    promp,
    setPromp,
    chat,
    isAsideActive,
    setIsAsideActive
  }
) {
  const [isEditing, setIsEditing] = useState(false);

  // Logic for sesions
  const changeSesion = (sesion) => {
    if (sesion.id !== currentSesion?.id) {
      setIsAsideActive(false);
      setIsEditing(false);
    }
    setCurrentSesion(sesion)
    if (sesion.promp) {
      setPromp(sesion.promp)
    } else {
      setPromp('')
    }
    const data = localStorage.getItem(sesion.id);
    if (data) {
      setMessages(JSON.parse(data))
    } else {
      setMessages([])
    }

    setTimeout(() => {
      chat.current.scrollTop = chat.current.scrollHeight;
    }, 100)
  }

  const handleDeleteSesion = (sesion) => {
    const newSesions = sesions.filter((sesionMap) => sesionMap.id !== sesion.id)
    localStorage.removeItem(sesion.id)
    localStorage.setItem('sesions', JSON.stringify(newSesions))
    setTimeout(() => {
      setMessages([]);
      setPromp('');
      setSesions(newSesions);
      setCurrentSesion(null);
    }, 100)
  }


  // Change the prompt
  const handleChangePromp = (e) => {
    setPromp(e.target.value)
    if (currentSesion) {
      currentSesion.promp = e.target.value;
      const newSesions = sesions.map((sesionMap) => {
        if (sesionMap.id === currentSesion.id) {
          return {
            ...sesionMap,
            promp: e.target.value,
          }
        } else {
          return sesionMap
        }
      }
      )
      setSesions(newSesions)
      localStorage.setItem('sesions', JSON.stringify(newSesions))
    }
  }
  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${!isAsideActive ? '-translate-x-full' : ''} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}>
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Instrucciones
            </label>
            <textarea
              className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${styles.textarea}`}
              type="text"
              placeholder="Escribe tu prompt aquí..."
              value={promp}
              onChange={handleChangePromp}
            />
          </div>
          <hr className="my-2 border-gray-200 dark:border-gray-700" />
          <div className={`${styles.contentSections}`}>
            <li>
              <button
                onClick={() => {
                  setIsAsideActive(false);
                  setCurrentSesion(null);
                  setMessages([]);
                  setPromp('');
                }}
                className="mb-2 w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700 cursor-pointer justify-center mt-1">
                <i className="fas fa-plus mr-2"></i>
                Nueva conversación
              </button>
            </li>
            {sesions.slice(0).reverse().map((sesion, index) => {
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
                          onClick={() => handleDeleteSesion(sesion)}
                        ></i>
                      </>
                    )}

                  </div>
                </li>
              )
            })}
          </div>
        </ul>
      </div>
    </aside>
  )
}

export default Aside