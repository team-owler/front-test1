import React from "react"
import styled, { ServerStyleSheet, StyleSheetManager } from "styled-components"
import { renderToStaticMarkup, renderToString } from "react-dom/server"
import juice from "juice"

import Head from "next/head"

const Wrap = styled.div`
  margin: auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: blue;
`

const Text = styled.p`
  font-size: 20px;
`

const Image = styled.img`
  width: 100%;
  border-radius: 12px;
`

const Button = styled.a`
  padding: 5px 20px;
  background-color: coral;
  color: white;
  font-size: 20px;
  border-radius: 12px;
  border: none;
`

const Home = () => {
  const printHtml = () => {
    const HtmlTemplate = ({ body, styles, title }) => `
      <!DOCTYPE html>
        <html>
          <head>
            <title>${title}</title>
            ${styles}
          </head>
          <body style="margin:0">
            <div id="app">${body}</div>
          </body>
      </html>
      `
    const sheet = new ServerStyleSheet()
    const body = renderToStaticMarkup(sheet.collectStyles(<Home />))
    const styles = sheet.getStyleTags()
    const html = HtmlTemplate({ body, styles, title: "테스트" })
    console.log(html)
    console.log(juice(html))
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrap>
        <Title>이메일 제목</Title>
        <Image src="https://cdn.pixabay.com/photo/2021/05/23/21/57/mountains-6277391_1280.jpg" />
        <Text>
          renderToNodeStream과 비슷하지만 data-reactroot와 같이 React에서
          내부적으로 사용하는 추가적인 DOM 어트리뷰트를 만들지 않습니다. 여분의
          어트리뷰트를 제거함으로써 약간의 바이트를 절약할 수 있으므로 React를
          간단한 정적 페이지 생성기로 사용하고 싶은 경우에 유용합니다.
        </Text>
        <Button onClick={printHtml}>버튼</Button>
      </Wrap>
    </div>
  )
}

export default Home
