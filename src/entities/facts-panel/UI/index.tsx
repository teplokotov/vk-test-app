import { useContext, useEffect, useRef, useState } from "react";
import { Button, FormItem, Group, Input, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { PanelContext } from "../../../app/providers/PanelContext";
import { baseUrlFact, btnDefaultValue, btnErrorValue, btnLoadingValue } from "../consts";

type TProps = {
  id: string
};

function FactsPanel({ id } : TProps) {

  const { currentPanel } = useContext(PanelContext);
  const [fact, setFact] = useState<string>('');
  const [, setIsLoading] = useState<boolean>(false);
  const [, setHasError] = useState<boolean>(false);
  const [btnValue, setBtnValue] = useState<string>(btnDefaultValue);
  const inputFactRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    moveCursor();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fact]);

  function fetchData(): void {
    setIsLoading(true);
    setBtnValue(btnLoadingValue);
    setHasError(false);
    fetch(baseUrlFact)
      .then(res => res.json())
      .then(data => {
        setFact(data.fact);
        setIsLoading(false);
        setBtnValue(btnDefaultValue);
      })
      .catch(err => {
        console.log(err);
        setHasError(true);
        setBtnValue(btnErrorValue);
      });
  }

  function moveCursor(): void {
    if (inputFactRef.current) {
      inputFactRef.current.selectionStart = 0;
      inputFactRef.current.selectionEnd = 0;
      const position = fact.split(' ')[0].length
      inputFactRef.current.focus();
      inputFactRef.current.selectionStart = position;
    }
  }

  return (
    <Panel id={id}>
      <PanelHeader
        delimiter="spacing"
        before={<PanelHeaderBack onClick={() => currentPanel.setActivePanel('mainPanel')} />}
      >
        Интересные факты
      </PanelHeader>
      <Group>
        <form onSubmit={e => e.preventDefault()} >
          <FormItem>
            <Input
              getRef={inputFactRef}
              type='text'
              value={fact}
              onChange={e => setFact(e.target.value)}
              placeholder="Узнайте интересный факт..."
            />
          </FormItem>
          <FormItem>
            <Button
              size="l"
              stretched
              onClick={fetchData}>{btnValue}
            </Button>
          </FormItem>
        </form>
      </Group>
    </Panel>
  )
}

export default FactsPanel;
