
DOM = {	
	donate : (parent) => {
		let form = document.createElement("form");
		form.action = "https://www.paypal.com/cgi-bin/webscr";
		form.method = 'post';
		form.target = '_top';
		form.innerHTML = '<input type="hidden" name="cmd" value="_s-xclick">' +
                    	 '<input type="hidden" name="hosted_button_id" value="G4WCUPHDE2HZN">' +
                    	 '<input type="submit" class="button" value="Donate">'

        parent.appendChild(form);
	},

	esc : (c) => {
		return c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
	},
	
	c : (parent, etype, eid=null, eclass=null, etext=null) => {
		let element = document.createElement(etype);
		if (etext != null) element.innerHTML = etext;
		if(eid) element.id = eid;
		if(eclass) element.className = eclass;
		parent.appendChild(element);

		return element;
	},

	cdiv_fade : (parent, eid=null, eclass=null, etext=null) => {
		let div = DOM.c(parent, "div", eid, eclass, etext);
		DOM.fadeInElement(div);
		
		return div;
	},

	cdiv : (parent, eid=null, eclass=null, etext=null) => {
		return DOM.c(parent, "div", eid, eclass, etext);
	},

	ctable : (parent, eid=null, eclass=null, etext=null) => {
		return DOM.c(parent, "table", eid, eclass, etext);
	},

	ctr : (parent, eid=null, eclass=null, etext=null) => {
		return DOM.c(parent, "tr", eid, eclass, etext);
	},

	ctd : (parent, eid=null, eclass=null, etext=null) => {
		return DOM.c(parent, "td", eid, eclass, etext);
	},

	cth : (parent, eid=null, eclass=null, etext=null) => {
		return DOM.c(parent, "th", eid, eclass, etext);
	},

	ci_text : (parent, eid=null, eclass=null, etext=null) => {
		return DOM.c(parent, "input", eid, eclass, etext);
	},

	ci_pwd : (parent, eid=null, eclass=null, etext=null) => {
		let input = DOM.c(parent, "input", eid, eclass, etext);
		input.type = "password";
		return input;
	},

	ci_checkbox : (parent, eid=null, eclass=null, etext=null) => {
		let input = DOM.c(parent, "input", eid, eclass, etext);
		input.type = "checkbox";
		return input;
	},

	clabel : (parent, eid=null, eclass=null, etext=null, isfor=null) => {
		let label = DOM.c(parent, "label", eid, eclass, etext);
		if(isfor)
			label.htmlFor = isfor;
		return label;
	},

	cbutton : (parent, eid=null, eclass=null, etext=null, data=null, clickaction = null) => {
		let button = DOM.c(parent, "button", eid, eclass, etext);

		if(data) 
			for (attr in data) {
				button.setAttribute("data-" + attr, data[attr]);
			}

		if(clickaction)
			button.addEventListener("click", clickaction);
		
		return button;
	},

	cimg : (parent, src, eid=null, eclass=null, data=null, clickaction = null) => {
		let img = DOM.c(parent, "img", eid, eclass);

		img.src = src;
		
		if(data) 
			for (attr in data) {
				img.setAttribute("data-" + attr, data["attr"]);
			}

		if(clickaction)
			img.addEventListener("click", clickaction);
		
		return img;
	},

	cselect : (parent, eid=null, eclass=null, optionlist=null) => {
		let select = DOM.c(parent, "select", eid, eclass);
		if(optionlist) {
			for(let x = 0; x < optionlist.length; x++) {
				let o = DOM.c(select, "option", null, null, optionlist[x][0]);
				o.value = optionlist[x][1];
			}
		}

		return select;
	},

	removeElement: (node) => {
		node.parentNode.removeChild(node);
	},

	removeChilds: (node, now=false) => {
		if(now) {
		    while (node.firstChild) {
		        node.removeChild(node.firstChild);
		    }
		}
		else {
		    for(let x = 0; x < node.childNodes.length; x++) {
		    	DOM.fadeOutElement(node.childNodes[x]);
		    }
		}
	},

	fadeOutElement: (node) => {
		let currentlevel = 1.0;
		let timer = setInterval(() => {
			currentlevel -= .1;
			node.style.opacity = currentlevel;
			if(currentlevel < 0) {
				clearInterval(timer);
				if(node.parentNode)
					node.parentNode.removeChild(node);
			}
		}, 50);
	},

	fadeInElement: (node) => {
		let currentlevel = 0;
		node.style.opacity = 0;
		let timer = setInterval(() => {
			node.style.opacity = currentlevel;
			currentlevel += .1;
			if(currentlevel > 1) {
				clearInterval(timer);
			}
		}, 50);
	},

	showError: (errortitle, errortext) => {
		let body = document. getElementsByTagName("body")[0];
		let div= DOM.cdiv(body, null, "error");
		div.style.zIndex = "10000";
			DOM.cdiv(div, null, "errortitle", errortitle);
			DOM.cdiv(div, null, "errortext", errortext);
		let x = 0;
		let interval = setInterval(() => {
			x++;
			div.style.transform = "translate(-50%, " + (-100+x*10) + "%)";
			if(x > 11)
				clearInterval(interval);
		}, 20);
		setTimeout(() => { DOM.fadeOutElement(div) }, 3000);
	},

	setElementPos: (node, px, py)  => {
		node.style.position = "absolute";
		node.style.left = "" + px + "px";
		node.style.top = "" + py + "px";
	},

	findChildrenWithClass: (node, classname) => {
		let childlist = [];
		for(let x = 0; x < node.children.length; x++) {
			let c = node.children[x];
			let classset = c.className.split(" ");
			for(let y = 0; y < classset.length; y++) {
				if (classset[y] == classname) {
					childlist.push(c);
					break;
				}
			}
		}

		return childlist;
	},
}