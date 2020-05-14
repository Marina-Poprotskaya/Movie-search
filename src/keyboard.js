export default function createKeyboard() {
const keyboardButtons = [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'Del', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&uarr;', 'Shift', 'Ctrl', 'Fn', 'Alt', 'Space', 'Alt', 'Ctrl', '&larr;', '&darr;', '&rarr;'],
    [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|', 'Del', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&uarr;', 'Shift', 'Ctrl', 'Fn', 'Alt', 'Space', 'Alt', 'Ctrl', '&larr;', '&darr;', '&rarr;'],
    [
      'Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '|', 'Del', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '&uarr;', 'Shift', 'Ctrl', 'Fn', 'Alt', 'Space', 'Alt', 'Ctrl', '&larr;', '&darr;', '&rarr;'],
    [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '|', 'Del', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '"', 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '&uarr;', 'Shift', 'Ctrl', 'Fn', 'Alt', 'Space', 'Alt', 'Ctrl', '&larr;', '&darr;', '&rarr;'],
  ];
  
  const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'WakeUp', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
  
  
  
  // Create a textarea field
  const textareaField = document.querySelector('input')

  
  // Create frame of a keyboard
  const keyboardField = document.createElement('ul');
  document.body.append(keyboardField);
  keyboardField.classList.add('keyboard-class');
  keyboardField.classList.add('keyboard-disable');
  
  // Create keyboard's buttons
  // lang - it's a variable, which contains the index of the required array from the keyboardButtons
  let lang = 1
  
  function makeKeyboardButtons() {
    for (let i = 0; i < keyboardButtons[lang].length; i++) {
      const buttons = document.createElement('li');
  
      buttons.classList.add('btn-class');
  
      buttons.setAttribute('id', keyCodes[i]);
  
      keyboardField.append(buttons);
    }
  }
  makeKeyboardButtons();
  
  // Fill buttons with symbols, depending on the selected array from keyboardButtons
  const buttons = document.querySelectorAll('li');
  function fillButtons() {
    for (let i = 0; i < keyboardButtons[lang].length; i++) {
      for (let k = 0; k < buttons.length; k++) {
        buttons[k].innerHTML = keyboardButtons[lang][k];
      }
    }
  }
  fillButtons();
    
  // Make buttons interactivity
  keyboardField.addEventListener('mousedown', (event) => {
    const { target } = event;
    if (target.tagName !== 'LI') return;
    keyboardField.querySelectorAll('li').forEach((elem) => {
      elem.classList.remove('press-btn');
    });
    target.classList.add('press-btn');
  });
  
  keyboardField.addEventListener('mouseup', (event) => {
    const { target } = event;
    if (target.tagName !== 'LI') return;
    target.classList.remove('press-btn');
  });
  
  // Functionality for the Delete button
  function DelBtn() {
    if (textareaField.selectionStart === textareaField.selectionEnd) {
      textareaField.setRangeText('', textareaField.selectionStart, textareaField.selectionEnd + 1, 'end');
    } else if (textareaField.selectionStart !== textareaField.selectionEnd) {
      textareaField.setRangeText('', textareaField.selectionStart, textareaField.selectionEnd, 'end');
    }
  }
  
  // Display letters on the screen
  let caps = false;
  function showLetters() {
    textareaField.value = '';
    
    keyboardField.addEventListener('click', (event) => {
      if (event.target.tagName !== 'LI') return;
      const text = event.target.innerHTML;
      
      // Add functionality for special buttons
      switch (text) {
        case '↑' : 
        arrowUp(textareaField);
        textareaField.focus()
        break;
        case '←' : 
        arrowLeft(textareaField);
        textareaField.focus()
        break;
        case '→' : 
        arrowRight(textareaField);
        textareaField.focus()
        break;
        case '↓' : 
        arrowDown(textareaField);
        textareaField.focus()
        break;
        case 'Space':
          textareaField.value += ' ';
          break;
        case 'Backspace':
          if(textareaField.selectionStart != '0') {
          textareaField.setRangeText('', textareaField.selectionStart-1, textareaField.selectionEnd, 'end');
        }
          break;
        case 'Enter':
          textareaField.value += '\r\n';
          break;
        case 'Del':
          DelBtn();
          break;
        case 'Tab':
          textareaField.value += '\t';
          break;
        // Change the language on the virtual keyboard by Alt 
        case 'Alt':
          if (lang === 0) {
            lang = 1;
            fillButtons();
          } else if (lang === 1) {
            lang = 0;
            fillButtons();
          } else if (lang === 2) {
            lang = 3;
            fillButtons();
          } else if (lang === 3) {
            lang = 2;
            fillButtons();
          }
          break;
        case 'CapsLock':
          if (caps) {
            event.target.classList.remove('caps');
            caps = false;
            if (lang === 2) {
              lang = 0;
              fillButtons();
            }
            else if (lang === 3) {
              lang = 1;
              fillButtons();
            }
          } else {
            event.target.classList.add('caps');
            caps = true;
            if (lang === 0) {
              lang = 2;
              fillButtons();
            } else if (lang === 1) {
              lang = 3;
              fillButtons();
            }
          }
        default:
          if (text.length === 1) {
            textareaField.setRangeText(text, textareaField.selectionStart, textareaField.selectionEnd, 'end');
          }
      };
      textareaField.focus();
    });
  }
  showLetters();

  
  //  The connection of a real keyboard with a virtual one - reaction to pressing
  function showButton() {
    window.addEventListener('keydown', (event) => {
      const li = document.getElementById(event.code);
      if (li) {
        li.classList.add('press-btn');
      }
    });
    window.addEventListener('keyup', (event) => {
      const li = document.getElementById(event.code);
      if (li) {
        li.classList.remove('press-btn');
      }
    });
  }
  showButton();
  
  // Functionality for CapsLock button on a real keyboard
  window.addEventListener('keydown', (event) => {
    const li = document.getElementById(event.code);
    if (event.code === 'CapsLock') {
      if (caps === true) {
        caps = false;
        li.classList.remove('caps');
        if (lang === 2) {
          lang = 0;
          fillButtons();
        }
        else if (lang === 3) {
          lang = 1;
          fillButtons();
        }
      } else {
        li.classList.add('caps');
        caps = true;
        if (lang === 0) {
          lang = 2;
          fillButtons();
        } else if (lang === 1) {
          lang = 3;
          fillButtons();
        }
      }
    }
  });
  
  
  // Functionality for Shift button on a real keyboard
  window.addEventListener('keydown', (event) => {
    if (event.code === 'ShiftLeft') {
      if (lang === 0) {
        lang = 2;
        fillButtons();
      } else if (lang === 1) {
        lang = 3;
        fillButtons();
      }
    }
  });
  window.addEventListener('keyup', (event) => {
    if (event.code === 'ShiftLeft') {
      if (lang === 2) {
        lang = 0;
        fillButtons();
      } else if (lang === 3) {
        lang = 1;
        fillButtons();
      }
    }
  });
  
  
  // Change the language on the real keyboard by Ctrl + Alt
  let flag = false;
  window.addEventListener('keydown', (event) => {
    if (event.code === 'ControlLeft' || event.code === 'ControlRight') flag = true;
    if ((event.code === 'AltLeft' || event.code === 'AltRight') && flag) {
      if (lang === 0) {
        lang = 1;
        fillButtons();
      } else if (lang === 1) {
        lang = 0;
        fillButtons();
      } else if (lang === 2) {
        lang = 3;
        fillButtons();
      } else if (lang === 3) {
        lang = 2;
        fillButtons();
      }
    }
  });
  
  // PreventDefault for Tab on real keyboard + functionality
  window.addEventListener('keydown', (event) => {
    if (event.code === 'Tab') {
      event.preventDefault();
      textareaField.value += '\t';
    }
  });


 const openOrCloseKeyboard = document.querySelector('.input-wrapper__keyboard');
 openOrCloseKeyboard.addEventListener('click', () => {
    keyboardField.classList.toggle('keyboard-disable');
    textareaField.focus();
 })

 const closeBtn = document.createElement('span');
 closeBtn.classList.add('close-button');
 keyboardField.prepend(closeBtn)
 closeBtn.innerHTML = 'x';

 closeBtn.addEventListener('click', () => {
    keyboardField.classList.add('keyboard-disable');
    textareaField.focus();
 })

 textareaField.selectionStart = textareaField.selectionEnd = 10;

 function arrowUp(textareaField) {
  var pos = textareaField.selectionEnd,
      prevLine = textareaField.value.lastIndexOf('\n', pos),
      TwoBLine = textareaField.value.lastIndexOf('\n', prevLine - 1);
  if (prevLine === -1) return;
  pos = pos - prevLine;
  textareaField.selectionStart = textareaField.selectionEnd = TwoBLine + pos;
}

function arrowDown(textareaField) {
  var pos = textareaField.selectionEnd,
      prevLine = textareaField.value.lastIndexOf('\n', pos),
      nextLine = textareaField.value.indexOf('\n', pos + 1);
  if (nextLine === -1) return;
  pos = pos - prevLine;
  textareaField.selectionStart = textareaField.selectionEnd = nextLine + pos;
}

function arrowLeft(textareaField) {
  textareaField.selectionStart = textareaField.selectionEnd -= 1;
}

function arrowRight(textareaField) {
  textareaField.selectionStart = textareaField.selectionEnd += 1;
}


}
createKeyboard();