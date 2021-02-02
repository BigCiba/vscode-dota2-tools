
const KeyCode = { Escape: 'Escape', Backquote: 'Backquote', Digit1: 'Digit1', Digit2: 'Digit2', Digit3: 'Digit3', Digit4: 'Digit4', Digit5: 'Digit5', Digit6: 'Digit6', Digit7: 'Digit7', Digit8: 'Digit8', Digit9: 'Digit9', Digit0: 'Digit0', Minus: 'Minus', Equal: 'Equal', Backspace: 'Backspace', KeyQ: 'KeyQ', KeyW: 'KeyW', KeyE: 'KeyE', KeyR: 'KeyR', KeyT: 'KeyT', KeyY: 'KeyY', KeyU: 'KeyU', KeyI: 'KeyI', KeyO: 'KeyO', KeyP: 'KeyP', KeyA: 'KeyA', KeyS: 'KeyS', KeyD: 'KeyD', KeyF: 'KeyF', KeyG: 'KeyG', KeyH: 'KeyH', KeyJ: 'KeyJ', KeyK: 'KeyK', KeyL: 'KeyL', KeyZ: 'KeyZ', KeyX: 'KeyX', KeyC: 'KeyC', KeyV: 'KeyV', KeyB: 'KeyB', KeyN: 'KeyN', KeyM: 'KeyM', BracketLeft: 'BracketLeft', BracketRight: 'BracketRight', Backslash: 'Backslash', Semicolon: 'Semicolon', Quote: 'Quote', Comma: 'Comma', Period: 'Period', Slash: 'Slash', Tab: 'Tab', CapsLock: 'CapsLock', ShiftLeft: 'ShiftLeft', ControlLeft: 'ControlLeft', AltLeft: 'AltLeft', AltRight: 'AltRight', ContextMenu: 'ContextMenu', ControlRight: 'ControlRight', ShiftRight: 'ShiftRight', Enter: 'Enter', ScrollLock: 'ScrollLock', Pause: 'Pause', Insert: 'Insert', Home: 'Home', PageUp: 'PageUp', Delete: 'Delete', End: 'End', PageDown: 'PageDown', ArrowUp: 'ArrowUp', ArrowDown: 'ArrowDown', ArrowLeft: 'ArrowLeft', ArrowRight: 'ArrowRight', NumLock: 'NumLock', NumpadDivide: 'NumpadDivide', NumpadMultiply: 'NumpadMultiply', NumpadSubtract: 'NumpadSubtract', NumpadAdd: 'NumpadAdd', NumpadEnter: 'NumpadEnter', NumpadDecimal: 'NumpadDecimal', Numpad0: 'Numpad0', Numpad1: 'Numpad1', Numpad2: 'Numpad2', Numpad3: 'Numpad3', Numpad4: 'Numpad4', Numpad5: 'Numpad5', Numpad6: 'Numpad6', Numpad7: 'Numpad7', Numpad8: 'Numpad8', Numpad9: 'Numpad9' };

HTMLElement.prototype.createChild = function (tagName, option) {
	let element = document.createElement(tagName);
	if (option) {
		for (const key in option) {
			if (key == 'text') {
				element.appendChild(document.createTextNode(option.text));
			} else {
				element[key] = option[key];
			}
		}
	}
	if (option.insert_index) {
		this.insertBefore(element, this.children[option.insert_index]);
	} else {
		this.appendChild(element);
	}
	return element;
};

class KeyEvent {
	static eventList = {};
	static Bind(element, keyCode, callback) {
		if (KeyEvent.eventList[keyCode] == undefined) {
			KeyEvent.eventList[keyCode] = {};
		}
		KeyEvent.eventList[keyCode][element] = callback;
	}
	static UnBind(element, keyCode) {
		delete KeyEvent.eventList[keyCode][element];
	}
}
class ClickEvent {
	static eventList = {};
	static Bind(element, callback) {
		ClickEvent.eventList[element] = callback;
	}
	static UnBind(element) {
		delete ClickEvent.eventList[element];
	}
}

HTMLElement.prototype.selectOption = function (selectIndex) {
	let _index = 0;
	for (let index = 0; index < this.children.length; index++) {
		if (index == selectIndex) {
			_index = index;
			this.children[index].classList.add('selected');
		} else {
			this.children[index].classList.remove('selected');
		}
	}
	return _index;
};

HTMLElement.prototype.createInputSelectList = function (list, option) {
	let selectIndex = option.selectIndex;
	let defaultValue = list[option.selectIndex] || list[0];
	let placeholder = option.placeholder || '';
	let inputElement = this.createChild('input', { title: defaultValue, value: defaultValue, placeholder: placeholder });
	// 创建选项
	let dropdownElement = this.createChild('div', { className: 'dropdown-content' });
	for (let index = 0; index < list.length; index++) {
		const value = list[index];
		let optionElement = dropdownElement.createChild('a', { className: 'dropdown-option', text: value });
		// 选择默认选项
		if (index == selectIndex) {
			optionElement.classList.add('selected');
		}
		// 点击更新当前选择
		optionElement.addEventListener('click', () => {
			selectIndex = dropdownElement.selectOption(index);
			inputElement.value = optionElement.innerText;
			this.classList.remove('selected');
		});
		// 鼠标更新选项
		optionElement.addEventListener('mouseover', () => {
			selectIndex = dropdownElement.selectOption(index);
		});
	}

	// focus的时候激活
	inputElement.addEventListener('mousedown', () => {
		if (this.classList.contains('selected') == false) {
			this.classList.add('selected');
			// 绑定上下键
			KeyEvent.Bind(inputElement, KeyCode.ArrowUp, () => {
				if (selectIndex > 0) {
					selectIndex = dropdownElement.selectOption(selectIndex - 1);
				}
			});
			KeyEvent.Bind(inputElement, KeyCode.ArrowDown, () => {
				if (selectIndex < list.length - 1) {
					selectIndex = dropdownElement.selectOption(selectIndex + 1);
				}
			});
			KeyEvent.Bind(inputElement, KeyCode.Enter, () => {
				inputElement.value = dropdownElement.children[selectIndex].innerText;
				this.classList.remove('selected');
			});
			KeyEvent.Bind(inputElement, KeyCode.Escape, () => {
				this.classList.remove('selected');
				KeyEvent.UnBind(inputElement, KeyCode.ArrowUp);
				KeyEvent.UnBind(inputElement, KeyCode.ArrowDown);
				ClickEvent.UnBind(inputElement);
			});
			// 绑定鼠标点击区域外事件
			setTimeout(() => {
				ClickEvent.Bind(inputElement, (element) => {
					if (element.classList.contains('dropdown-option') == false) {
						console.log(2222);
						this.classList.remove('selected');
						KeyEvent.UnBind(inputElement, KeyCode.ArrowUp);
						KeyEvent.UnBind(inputElement, KeyCode.ArrowDown);
						ClickEvent.UnBind(inputElement);
					}
				});
			}, 100);
		}
	});
	return inputElement;
};

// 点击其他位置关闭
document.onmousedown = function (event) {
	for (const element in ClickEvent.eventList) {
		let callback = ClickEvent.eventList[element];
		callback(event.target);
	}
};

document.onkeydown = function (event) {
	code = event.code;
	if (KeyEvent.eventList[code] != undefined) {
		for (const element in KeyEvent.eventList[code]) {
			let callback = KeyEvent.eventList[code][element];
			callback();
		}
	}
};