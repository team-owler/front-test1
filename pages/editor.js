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

const ComponentsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  width: 70px;
  height: 70px;
  border: 1px solid blue;
  border-radius: 12px;
`

const componentList = [
  {
    type: "copy",
    name: "Text",
  },
  {
    type: "copy",
    name: "Image",
  },
  {
    type: "copy",
    name: "Button",
  },
]

const Editor = () => {
  const [items, setItems] = useState([])

  function onDragEnd(result) {
    console.log(result)
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrap>
        <Droppable droppableId="ITEMS" isDropDisabled={true}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ComponentsWrap>
                {componentList.map((v, i) => {
                  return (
                    <Draggable draggableId={v.name} key={v.name} index={i}>
                      {(provided) => (
                        <div>
                          <ComponentsButton
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {v.name}
                          </ComponentsButton>
                        </div>
                      )}
                    </Draggable>
                  )
                })}
              </ComponentsWrap>
            </div>
          )}
        </Droppable>
        <EditorWrap>
          <Droppable droppableId="LIST">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                ㅇㅇ
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
