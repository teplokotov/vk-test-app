import { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  FormItem,
  Group,
  Input,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Paragraph,
  Spacing
} from "@vkontakte/vkui";
import { PanelContext } from "../../../app/providers/PanelContext";
import { baseUrlAge, btnDefaultValue, btnErrorValue, btnLoadingValue } from "../consts";

type TProps = {
  id: string
};

let controller: AbortController;
let signal: AbortSignal;

function AgePanel({ id } : TProps) {
  const { currentPanel } = useContext(PanelContext);

    const [btnValueAge, setBtnValueAge] = useState<string>(btnDefaultValue);
    const inputAgeRef = useRef<HTMLInputElement>(null);
    const [age, setAge] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [previousUsername, setPreviousUsername] = useState<string>('');
    const [, setIsLoadingAge] = useState<boolean>(false);
    const [, setHasErrorAge] = useState<boolean>(false);
    const btnAgeRef = useRef<HTMLButtonElement>(null);
    let timeout: number;

    function handleOnClickAge(): void {
      clearTimeout(timeout);
      if(previousUsername === username) return;
      if (controller) {
        controller.abort();
      }
      controller = new AbortController();
      signal = controller.signal;

      setIsLoadingAge(true);
      setBtnValueAge(btnLoadingValue);
      setHasErrorAge(false);
      fetch(`${baseUrlAge}?name=${username}`, {
        signal: signal,
      })
        .then(res => {
          if (!res.ok) throw Error(res.statusText);
          return res.json();
        })
        .then(data => {
          setAge(data.age);
          setIsLoadingAge(false);
          setBtnValueAge(btnDefaultValue);
          setPreviousUsername(username);
        })
        .catch(err => {
          if (err.name === 'AbortError') return;
          console.log(err);
          setHasErrorAge(true);
          setBtnValueAge(btnErrorValue);
        });
    }

    useEffect(() => {
      if(username === '' || !username.match(/[a-z]/i)) {
        btnAgeRef.current?.setAttribute('disabled', '');
      } else {
        btnAgeRef.current?.removeAttribute('disabled');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeout = setTimeout(() => {
        if(username !== '' && username.match(/[a-z]/i)) {
          handleOnClickAge();
        }
      }, 3000)
      return () => clearTimeout(timeout)

    }, [username])

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
              getRef={inputAgeRef}
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите ваше имя на латинице..."
            />
            <Spacing size={16} />
            <Paragraph weight="3">Ваш возраст: {age}</Paragraph>
          </FormItem>
          <FormItem>
            <Button
              size="l"
              stretched
              getRootRef={btnAgeRef}
              onClick={handleOnClickAge}
            >{btnValueAge}</Button>
          </FormItem>
        </form>
      </Group>
    </Panel>
  )
}

export default AgePanel;
