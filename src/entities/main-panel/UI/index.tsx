import { useContext } from "react";
import { Cell, Group, Panel, PanelHeader } from "@vkontakte/vkui";
import { Icon28CommentOutline, Icon28FaceIdOutline } from "@vkontakte/icons";
import { PanelContext } from "../../../app/providers/PanelContext";

type TProps = {
  id: string
};

function MainPanel({ id } : TProps) {
  const { currentPanel } = useContext(PanelContext);
  return (
    <Panel id={id}>
      <PanelHeader>Важные мелочи</PanelHeader>
      <Group>
        <Cell
          expandable="auto"
          before={<Icon28CommentOutline />}
          onClick={() => currentPanel.setActivePanel('factsPanel')}
        >
          Интересные факты
        </Cell>
        <Cell
          expandable="auto"
          before={<Icon28FaceIdOutline />}
          onClick={() => currentPanel.setActivePanel('agePanel')}
        >
          Мой возраст
        </Cell>
      </Group>
    </Panel>
  )
}

export default MainPanel
