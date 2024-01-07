import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState(false);
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);

  const handleChange = () => {
    setCharacters((prev) => !prev);
  };

  let passwordRef = useRef("");

  let copyToClipboard = useCallback(() => {
    passwordRef?.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  const passwordGen = useCallback(() => {
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = 123456789;
    let char = "!@#$%^&*()_+";

    if (numbers) string += num;
    if (characters) string += char;
    let pass = "";
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * string.length + 1);

      pass += string.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, characters, numbers]);

  useEffect(() => {
    passwordGen();
  }, [setLength, setPassword, numbers, characters, passwordGen]);

  return (
    <div className="container">
      <div className="inputs">
        <input type="text" value={password} ref={passwordRef} readOnly />
        <button onClick={copyToClipboard}>copy</button>
      </div>

      <div className="clicks">
        <div className="range-2">
          <label htmlFor="">
            numbers{" "}
            <input
              type="checkbox"
              value={numbers}
              onClick={() => setNumbers((prev) => !prev)}
              readOnly
            />
          </label>
          <label htmlFor="">
            characters
            <input
              type="checkbox"
              value={characters}
              onClick={handleChange}
              readOnly
            />
          </label>
        </div>
        <div className="">
          <label htmlFor="" className="range-1">
            <div>
              
              <input
                type="range"
                min={8}
                max={20}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div> length : {length}</div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
