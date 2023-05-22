
import { Inter } from 'next/font/google'
import Response from '../components/Response'
import { Configuration, OpenAIApi } from 'openai';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/chat.module.css';

const inter = Inter({ subsets: ['latin'] })


import localStorage from 'localStorage';
import Nav from '@/components/Nav';
import Aside from '@/components/Aside';

export default function Home() {

  // For the aside
  const [isAsideActive, setIsAsideActive] = useState(false);

  const chat = useRef(null);

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  useEffect(() => {
    const data = localStorage.getItem('sesions');
    if (data) {
      setSesions(JSON.parse(data))
    }
  }, []);

  const [sesions, setSesions] = useState([]);
  const [currentSesion, setCurrentSesion] = useState(null);

  // Error
  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  // Mensajes
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState('');

  const [promp, setPromp] = useState('');

  const sendMessage = async () => {
    if (message !== '') {
      const newMessage = {
        content: message,
        role: 'user'
      }
      setMessages([...messages, newMessage])
      setMessage('')

      // Get last 10 messages
      const lastMessages = [...messages.slice(Math.max(messages.length - 10, 0)), newMessage]

      setIsTyping(true)
      setTimeout(() => {
        chat.current.scrollTop = chat.current.scrollHeight;
      }, 100)
      // Send message to OpenAI
      try {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `Tu nombre es Upecito, eres un amigable asistente virtual de la UPC. ${currentSesion?.promp}`,
            },
            ...lastMessages,
          ],
        });

        let idSesion = currentSesion?.id;
        if (!currentSesion) {
          let id = sesions[sesions.length - 1]?.id + 1;
          if (!id) {
            id = 1;
          }
          const newSesion = {
            id: id,
            title: `Conversación ${sesions.length + 1}`,
          }
          setCurrentSesion(newSesion)
          setSesions([...sesions, newSesion])
          localStorage.setItem('sesions', JSON.stringify([...sesions, newSesion]))

          idSesion = newSesion.id;
        }

        setError({
          isError: false,
          content: ''
        })

        setMessages([...messages, newMessage, completion.data.choices[0].message])

        localStorage.setItem(idSesion, JSON.stringify([...messages, newMessage, completion.data.choices[0].message]));

      } catch (e) {
        console.log(e);
        setError({
          isError: true,
          message: 'Ha ocurrido un error, por favor vuelve a intentar'
        })
      }
      setIsTyping(false)
      setTimeout(() => {
        chat.current.scrollTop = chat.current.scrollHeight;
      }, 100)
    }
  }



  return (
    <div>
      <Nav isAsideActive={isAsideActive} setIsAsideActive={setIsAsideActive} />
      <Aside isAsideActive={isAsideActive} setIsAsideActive={setIsAsideActive} sesions={sesions} setSesions={setSesions} currentSesion={currentSesion} setCurrentSesion={setCurrentSesion} messages={messages} setMessages={setMessages} promp={promp} setPromp={setPromp} chat={chat}
      />
      <div className="sm:ml-64 mx-auto shadow-lg rounded-lg" onClick={() => setIsAsideActive(false)}>
        <div className={`flex flex-row justify-between bg-white ${styles.chat}`}>
          <div className="w-full flex flex-col justify-between">
            <div className={`flex px-5 flex-col mt-5 overflow-y-auto ${styles.chatContent}`} ref={chat}>
              {/* Mensajes */}
              {messages.map((message, index) => {
                return (
                  <Response key={index} response={message} />
                )
              })}
              {isTyping && (
                <Response response={{
                  content: 'Escribiendo...',
                  role: 'assistant'
                }} />
              )}
              {error.isError && (
                <Response response={{
                  content: error.message,
                  role: 'assistant',
                  isError: true,
                }} />
              )
              }
            </div>
            <div className={`flex px-5 flex-row justify-between items-center align-middle position-relative ${styles.contentInput}`}>
              <textarea
                // Enter para enviar
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && message !== '') {
                    sendMessage()
                  }
                }}
                onChange={(e) => {
                  if (e.target.value.trim() !== '') {
                    setMessage(e.target.value)
                  } else {
                    setMessage('')
                  }
                }}
                value={message}
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${styles.textarea}`}
                type="text"
                placeholder="Escribe tu mensaje aquí..."
              />
              <button className={`bg-blue-500 text-white px-3 py-2 rounded-xl mt-5 ${styles.buttonSend}`}
                onClick={sendMessage}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
