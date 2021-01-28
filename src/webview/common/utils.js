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
		this.insertBefore(element, this.childNodes[option.insert_index]);
	} else {
		this.appendChild(element);
	}
	return element;
};
HTMLElement.prototype.createInputSelectList = function (showPath, list) {
	let pathElement = this.createChild('input', { title: showPath, value: showPath, placeholder: '本地化路径' });
	let dropdownElement = this.createChild('div', { className: 'dropdown-content' });
	for (const iterator of list) {
		dropdownElement.createChild('a', { text: iterator });
	}
	document.onkeydown = function (event) {
		code = event.code;
		switch (code) {
			case 'ArrowUp':
				console.log("showPath");
				break;
			case 'ArrowDown':
				console.log("showPath");
				break;
		}
	};
};
HTMLElement.prototype.bindKeyDown(keyCode, )