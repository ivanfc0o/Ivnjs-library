# Iván Ibarra (@ivanfc0o) personal library
# JavaScript 
# ---------------------------------------- |
# pack
ivnjs = ivnjs||{}
I =	
	fly: (id) -> ivnjs.library.fly(id)
	hide: (id) -> ivnjs.library.hide(id)
	show: (id) -> ivnjs.library.show(id)
	on: (m,fn) -> ivnjs.library.on(m,fn)
ivnjs.library =
	on: (method, fn) ->
		switch method
			when "ready" then window.onload = fn
			else false
	fly: (id) -> document.getElementById(id)
	getRandomId: (num=6, _prefix = "id") ->
		chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
		i = 0;
		while i < num
			id += chars.charAt Math.floor(Math.random() * chars.length)
			i++;
			return _prefix + id
	hide: (id) -> @fly(id).style['display'] = "none"
	show: (id) -> @fly(id).style['display'] = "block"
	ui:
		searchList: class
			constructor: (obj) ->
				root_me = this;
				s = @s = {}
				s.input_default = obj.input||"ui-search";
				s.ts = obj.toSearch;
				s.text_input_default = obj.InputText||"Buscar..";
				s.input = document.getElementById(s.input_default)
				s.input.value = s.text_input_default
				s.input.onfocus = () -> @value = "" if this.value == s.text_input_default
				s.input.onblur = () -> @value = s.text_input_default if @value == ""
				if obj.type is "list"
					s.getObjects = document.getElementById(s.ts)
					s.li_array = s.getObjects.getElementsByTagName("li");
					searchInterval = `setInterval(function(){ root_me.search(root_me); },500)`
			search: () ->
				word = @s.input.value
				if word is @s.text_input_default or @s.input.disabled
					return false;
				word = new RegExp(word,"gi");
				for i in @s.li_array
					chain = i.innerHTML
					if word.test(chain)
						i.style['display'] = "block"
					else
						i.style['display'] = "none"
			disable: () ->
				@s.input.disabled = true
				@s.input.value = "Deshabilidado"
			enable: () ->
				@s.input.disabled = false
				@s.input.value = @s.text_input_default