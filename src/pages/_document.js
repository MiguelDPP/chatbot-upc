import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/img/upc_avatar.png" />
        <title>Chatbot - Upecito</title>
        <meta name="description" content="Chatbot 
          creado para el curso de Sistemas Basados en el Conocimiento en la UPC
        " />
        <meta name="keywords" content="Chatbot" />
        <meta name="author" content="Softcode" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
