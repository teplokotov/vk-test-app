import { useEffect, useRef, useState } from 'react'
import styles from './App.module.css'
import { baseUrlAge, baseUrlFact, btnDefaultValue, btnDefaultValueAge, btnErrorValue, btnLoadingValue } from './utils/constants';

let controller: AbortController, signal;
function App() {

  const [fact, setFact] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [btnValue, setBtnValue] = useState<string>(btnDefaultValue);
  const inputFactRef = useRef<HTMLInputElement>(null);
  
  const [btnValueAge, setBtnValueAge] = useState<string>(btnDefaultValueAge);
  const inputAgeRef = useRef<HTMLInputElement>(null);
  const [age, setAge] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [previousUsername, setPreviousUsername] = useState<string>('');
  const [isLoadingAge, setIsLoadingAge] = useState<boolean>(false);
  const [hasErrorAge, setHasErrorAge] = useState<boolean>(false);
  const btnAgeRef = useRef<HTMLButtonElement>(null);
 
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
      .then(res => res.json())
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
  }, [username])

  return (
    <main className={styles.main}>
      <form onSubmit={e => e.preventDefault()} className={styles.formFacts}>
        <input
          className={styles.input}
          ref={inputFactRef} 
          type='text'
          defaultValue={fact}
          placeholder="Узнайте интересный факт..."
        />
        <button 
          className={styles.button}
          onClick={handleOnClickFact}
        >{btnValue}</button>
      </form>
      <form onSubmit={e => e.preventDefault()} className={styles.formAge}>
        <input
          className={styles.input}
          ref={inputAgeRef} 
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введите ваше имя на латинице..."
        />
        <button ref={btnAgeRef}
          className={styles.button}
          onClick={handleOnClickAge}
        >{btnValueAge}</button>
      </form>
      {!isLoadingAge && !hasErrorAge && age && <p className={styles.age}>Ваш возраст: {age}</p>}
    </main>
  )
}

export default App
