import { useEffect, useRef, useState } from 'react'
import styles from './App.module.css'
import { baseUrl, btnDefaultValue, btnErrorValue, btnLoadingValue } from './utils/constants';

function App() {

  const [fact, setFact] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [btnValue, setBtnValue] = useState<string>(btnDefaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
 
  useEffect(() => {
    moveCursor();
  }, [fact]);

  function fetchData(): void {
    setIsLoading(true);
    setBtnValue(btnLoadingValue);
    setHasError(false);
    fetch(baseUrl)
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
    if (inputRef.current) {
      const position = fact.split(' ')[0].length
      inputRef.current.focus();
      inputRef.current.selectionStart = position;
    }
  }

  function handleOnClick(): void {
    fetchData();
  }

  return (
    <main className={styles.main}>
      <form onSubmit={e => e.preventDefault()} className={styles.form}>
        <input
          className={styles.input}
          ref={inputRef} 
          type='text'
          defaultValue={!isLoading && !hasError ? fact : ''}
          placeholder="Нажмите кнопку..."
        />
        <button 
          className={styles.button}
          onClick={handleOnClick}
        >{btnValue}</button>
      </form>
    </main>
  )
}

export default App
