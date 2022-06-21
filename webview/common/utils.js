
const KeyCode = { Escape: 'Escape', Backquote: 'Backquote', Digit1: 'Digit1', Digit2: 'Digit2', Digit3: 'Digit3', Digit4: 'Digit4', Digit5: 'Digit5', Digit6: 'Digit6', Digit7: 'Digit7', Digit8: 'Digit8', Digit9: 'Digit9', Digit0: 'Digit0', Minus: 'Minus', Equal: 'Equal', Backspace: 'Backspace', KeyQ: 'KeyQ', KeyW: 'KeyW', KeyE: 'KeyE', KeyR: 'KeyR', KeyT: 'KeyT', KeyY: 'KeyY', KeyU: 'KeyU', KeyI: 'KeyI', KeyO: 'KeyO', KeyP: 'KeyP', KeyA: 'KeyA', KeyS: 'KeyS', KeyD: 'KeyD', KeyF: 'KeyF', KeyG: 'KeyG', KeyH: 'KeyH', KeyJ: 'KeyJ', KeyK: 'KeyK', KeyL: 'KeyL', KeyZ: 'KeyZ', KeyX: 'KeyX', KeyC: 'KeyC', KeyV: 'KeyV', KeyB: 'KeyB', KeyN: 'KeyN', KeyM: 'KeyM', BracketLeft: 'BracketLeft', BracketRight: 'BracketRight', Backslash: 'Backslash', Semicolon: 'Semicolon', Quote: 'Quote', Comma: 'Comma', Period: 'Period', Slash: 'Slash', Tab: 'Tab', CapsLock: 'CapsLock', ShiftLeft: 'ShiftLeft', ControlLeft: 'ControlLeft', AltLeft: 'AltLeft', AltRight: 'AltRight', ContextMenu: 'ContextMenu', ControlRight: 'ControlRight', ShiftRight: 'ShiftRight', Enter: 'Enter', ScrollLock: 'ScrollLock', Pause: 'Pause', Insert: 'Insert', Home: 'Home', PageUp: 'PageUp', Delete: 'Delete', End: 'End', PageDown: 'PageDown', ArrowUp: 'ArrowUp', ArrowDown: 'ArrowDown', ArrowLeft: 'ArrowLeft', ArrowRight: 'ArrowRight', NumLock: 'NumLock', NumpadDivide: 'NumpadDivide', NumpadMultiply: 'NumpadMultiply', NumpadSubtract: 'NumpadSubtract', NumpadAdd: 'NumpadAdd', NumpadEnter: 'NumpadEnter', NumpadDecimal: 'NumpadDecimal', Numpad0: 'Numpad0', Numpad1: 'Numpad1', Numpad2: 'Numpad2', Numpad3: 'Numpad3', Numpad4: 'Numpad4', Numpad5: 'Numpad5', Numpad6: 'Numpad6', Numpad7: 'Numpad7', Numpad8: 'Numpad8', Numpad9: 'Numpad9' };


const LOCALIZE = {
	"zh-cn": {
		"Function Description": "描述",
		"Description": "描述",
		"Parameters": "参数",
		"Type": "类型",
		"Name": "名",
		"Example": "范例",
		"Return": "返回值",
		"Concise Description": "简洁描述",
	},
	"en": {
		"Function Description": "Function Description",
		"Description": "Description",
		"Parameters": "Parameters",
		"Type": "Type",
		"Name": "Name",
		"Example": "Example",
		"Return": "返回值",
		"Concise Description": "Concise Description",
	}
};
function Localize(name) {
	if (name == undefined) {
		return "";
	}
	let lang = document.documentElement.lang;
	let result = LOCALIZE[lang][name];
	if (result) {
		return result;
	}
	return name;
}

HTMLElement.prototype.createChild = function (tagName, option) {
	let element = document.createElement(tagName);
	if (option) {
		for (const key in option) {
			if (key == 'text') {
				element.appendChild(document.createTextNode(Localize(option.text)));
			} else {
				element[key] = option[key];
			}
		}
	}
	if (tagName == 'textarea') {
		element.addEventListener('keydown', (event) => {
			if (event.keyCode == 9) {
				event.preventDefault();
				let indent = '\t';
				let start = element.selectionStart;
				let end = element.selectionEnd;
				let selected = window.getSelection().toString();
				selected = indent + selected.replace(/\n/g, '\n' + indent);
				element.value = element.value.substring(0, start) + selected + element.value.substring(end);
				element.setSelectionRange(start + indent.length, start + selected.length);
			}
		});
	}
	if (option && option.insert_index) {
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
	// 渲染选项
	function updataOption(self, dropdownElement, list, callback) {
		dropdownElement.innerHTML = "";
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

				if (callback) {
					callback(inputElement.value);
				}

				KeyEvent.UnBind(inputElement, KeyCode.ArrowUp);
				KeyEvent.UnBind(inputElement, KeyCode.ArrowDown);
				KeyEvent.UnBind(inputElement, KeyCode.Enter);
				KeyEvent.UnBind(inputElement, KeyCode.Escape);
				ClickEvent.UnBind(inputElement);
				self.classList.remove('selected');
			});
			// 鼠标更新选项
			optionElement.addEventListener('mouseover', () => {
				selectIndex = dropdownElement.selectOption(index);
			});
		}
	}
	this.list = list;
	let selectIndex = option.selectIndex;
	let defaultValue = this.list[option.selectIndex] || this.list[0];
	let placeholder = option.placeholder || '';
	let callback = option.callback;
	let className = option.className;
	let inputElement = this.createChild('input', { title: defaultValue, value: defaultValue, placeholder: placeholder, className: className });
	// 创建选项
	let dropdownElement = this.createChild('div', { className: 'dropdown-content' });
	updataOption(this, dropdownElement, this.list, callback);

	inputElement.addEventListener('input', event => {
		if (callback) {
			this.list = callback(inputElement.value);
			if (this.list) {
				updataOption(this, dropdownElement, this.list, callback);
			}
		}
	});
	// focus的时候激活
	inputElement.addEventListener('mousedown', () => {
		if (this.classList.contains('selected') == false) {
			this.classList.add('selected');
			// 绑定上下键
			KeyEvent.Bind(inputElement, KeyCode.ArrowUp, () => {
				if (selectIndex > 0) {
					selectIndex = dropdownElement.selectOption(selectIndex - 1);
					inputElement.value = dropdownElement.children[selectIndex].innerText;
				}
			});
			KeyEvent.Bind(inputElement, KeyCode.ArrowDown, () => {
				if (selectIndex < this.list.length - 1) {
					selectIndex = dropdownElement.selectOption(selectIndex + 1);
					inputElement.value = dropdownElement.children[selectIndex].innerText;
				}
			});
			KeyEvent.Bind(inputElement, KeyCode.Enter, () => {
				inputElement.value = dropdownElement.children[selectIndex].innerText;

				if (callback) {
					callback(inputElement.value);
				}
				KeyEvent.UnBind(inputElement, KeyCode.ArrowUp);
				KeyEvent.UnBind(inputElement, KeyCode.ArrowDown);
				KeyEvent.UnBind(inputElement, KeyCode.Enter);
				KeyEvent.UnBind(inputElement, KeyCode.Escape);
				ClickEvent.UnBind(inputElement);
				this.classList.remove('selected');
			});
			KeyEvent.Bind(inputElement, KeyCode.Escape, () => {
				this.classList.remove('selected');
				KeyEvent.UnBind(inputElement, KeyCode.ArrowUp);
				KeyEvent.UnBind(inputElement, KeyCode.ArrowDown);
				KeyEvent.UnBind(inputElement, KeyCode.Enter);
				KeyEvent.UnBind(inputElement, KeyCode.Escape);
				ClickEvent.UnBind(inputElement);
			});
			// 绑定鼠标点击区域外事件
			setTimeout(() => {
				ClickEvent.Bind(inputElement, (element) => {
					if (element.classList.contains('dropdown-option') == false) {
						this.classList.remove('selected');
						KeyEvent.UnBind(inputElement, KeyCode.ArrowUp);
						KeyEvent.UnBind(inputElement, KeyCode.ArrowDown);
						KeyEvent.UnBind(inputElement, KeyCode.Enter);
						KeyEvent.UnBind(inputElement, KeyCode.Escape);
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