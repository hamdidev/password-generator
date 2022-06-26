import { useState, useRef, useEffect } from "react";
import { FaClipboard } from "react-icons/fa";
import { COPY_SUCCESS, ALERT } from "./Message";
import "./Styles.scss";
import {
  numbers,
  lowerCaseLettters,
  upperCaseLetters,
  specialCharacters,
} from "./Characters";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Password = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const copyBtn = useRef();
  const handlePasswordGenerator = () => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify(ALERT, true);
      return;
      //   alert("You must select at least one option");
    }
    let characterList = "";

    if (includeLowercase) {
      characterList += lowerCaseLettters;
    }

    if (includeUppercase) {
      characterList += upperCaseLetters;
    }

    if (includeNumbers) {
      characterList += numbers;
    }
    if (specialCharacters) {
      characterList += specialCharacters;
    }

    setPassword(passwordCreator(characterList));
  };
  const passwordCreator = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = getRandomIndex(characterListLength);
      password += characterList.charAt(characterIndex);
    }
    return password;
  };
  useEffect(() => {
    handlePasswordGenerator();
  }, []);
  const getRandomIndex = (limit) => {
    return Math.round(Math.random() * limit);
  };

  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();

    copyBtn.current.disabled = true;
    setTimeout(() => {
      copyBtn.current.disabled = false;
    }, 3000);
  };
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleCopyPassword = (e) => {
    copyToClipboard();

    notify(COPY_SUCCESS);
  };

  return (
    <>
      <ToastContainer />
      <div className="m-container">
        <div className="m-generator">
          <h2 className="m-generator__header">Password Generator</h2>
          <div className="m-generator__password">
            {password}
            <button
              className="m-generator__passwordGenerateBtn"
              ref={copyBtn}
              onClick={() => setPassword(handleCopyPassword())}
            >
              <FaClipboard className="icon" />
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-length">Password Length</label>
            <input
              type="number"
              name="password-lenth"
              id="password-length"
              max={20}
              min={7}
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters">Inclue Uppercase Letters</label>
            <input
              type="checkbox"
              name="uppercase-letters"
              id="uppercase-letters"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lowercase-letters">Inclue Lowercase Letters</label>
            <input
              type="checkbox"
              name="lowercase-letters"
              id="lowercase-letters"
              className="lowercase-letters"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="include-numbers">Inclue Numbers</label>
            <input
              type="checkbox"
              name="include-numbers"
              id="include-numbers"
              className="include-numbers"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="include-symbols">Inclue Special Characters</label>
            <input
              type="checkbox"
              name="include-symbols"
              id="include-symbols"
              className="include-symbols"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
          </div>
          <button
            className="m-generator__btn"
            onClick={handlePasswordGenerator}
          >
            Generate A Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Password;
