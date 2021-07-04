import React, { useState } from "react"
import { GetServerSideProps } from "next"
import styled, { ServerStyleSheet } from "styled-components"
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd"
import { renderToStaticMarkup } from "react-dom/server"
import juice from "juice"

const Wrap = styled.div`
  display: flex;
  min-height: 80vh;
`

const EditorWrap = styled.div`
  width: 600px;

  border: 1px solid black;
`

const ComponentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 170px;
`

const SettingWrap = styled.div`
  width: 170px;
`

const ComponentsButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  width: 70px;
  height: 70px;
  border: 1px solid blue;
  border-radius: 12px;
`

const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
  const custom = {
    id: `id-${k}`,
    content: `Quote ${k}`,
  }

  return custom
})

const grid = 8
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const QuoteItem = styled.div`
  width: 200px;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  background-color: lightblue;
  padding: ${grid}px;
`

function Quote({ quote, index }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {(provided) => (
        <QuoteItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {quote.content}
        </QuoteItem>
      )}
    </Draggable>
  )
}

const QuoteList = React.memo(function QuoteList({ quotes }) {
  return quotes.map((quote, index) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ))
})

const Editor = () => {
  const [state, setState] = useState({ quotes: initial })

  function onDragEnd(result) {
    console.log(result)
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    )

    setState({ quotes })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrap>
        <ComponentsWrap>
          <ComponentsButton>텍스트</ComponentsButton>
          <ComponentsButton>이미지</ComponentsButton>
          <ComponentsButton>버튼</ComponentsButton>
        </ComponentsWrap>
        <EditorWrap>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <QuoteList quotes={state.quotes} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </EditorWrap>
        <SettingWrap></SettingWrap>
      </Wrap>
    </DragDropContext>
  )
}

export const getServerSideProps = async ({ query }) => {
  resetServerContext() // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } }
}

export default Editor
