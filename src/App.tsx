import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Group,
  usePlatform,
  Cell,
  PanelHeaderBack,
  FormItem,
  Input,
  Button,
  Paragraph,
  Spacing,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { useEffect, useRef, useState } from 'react'
import { baseUrlAge, baseUrlFact, btnDefaultValue, btnDefaultValueAge, btnErrorValue, btnLoadingValue } from './utils/constants';
import { Icon28CommentOutline, Icon28FaceIdOutline } from '@vkontakte/icons';

let controller: AbortController, signal;
function App() {
  const platform = usePlatform();
  const [activePanel, setActivePanel] = useState('mainPanel');

  const [fact, setFact] = useState<string>('');
  const [, setIsLoading] = useState<boolean>(false);
  const [, setHasError] = useState<boolean>(false);
  const [btnValue, setBtnValue] = useState<string>(btnDefaultValue);
  const inputFactRef = useRef<HTMLInputElement>(null);
  
  const [btnValueAge, setBtnValueAge] = useState<string>(btnDefaultValueAge);
  const inputAgeRef = useRef<HTMLInputElement>(null);
  const [age, setAge] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [previousUsername, setPreviousUsername] = useState<string>('');
  const [, setIsLoadingAge] = useState<boolean>(false);
  const [, setHasErrorAge] = useState<boolean>(false);
  const btnAgeRef = useRef<HTMLButtonElement>(null);
  let timeout: number;
 
  useEffect(() => {
    moveCursor();
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

  function handleOnClickFact(): void {
    fetchData();
  }

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
        setBtnValueAge(btnDefaultValueAge);
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
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel={activePanel}>
          <Panel id="mainPanel">
            <PanelHeader>Важные мелочи</PanelHeader>
            <Group>
              <Cell
                expandable="auto"
                before={<Icon28CommentOutline />}
                onClick={() => setActivePanel('factsPanel')}
              >
                Интересные факты
              </Cell>
              <Cell
                expandable="auto"
                before={<Icon28FaceIdOutline />}
                onClick={() => setActivePanel('agePanel')}
              >
                Мой возраст
              </Cell>
            </Group>
          </Panel>
          <Panel id="factsPanel">
            <PanelHeader
              delimiter="spacing"
              before={<PanelHeaderBack onClick={() => setActivePanel('mainPanel')} />}
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
                    onClick={handleOnClickFact}>{btnValue}
                  </Button>
                </FormItem>
              </form>
            </Group>
          </Panel>
          <Panel id="agePanel">
            <PanelHeader
              delimiter="spacing"
              before={<PanelHeaderBack onClick={() => setActivePanel('mainPanel')} />}
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
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}

export default App
