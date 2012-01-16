(function() {
  var I, ivnjs;

  ivnjs = ivnjs || {};

  I = {
    fly: function(id) {
      return ivnjs.library.fly(id);
    },
    hide: function(id) {
      return ivnjs.library.hide(id);
    },
    show: function(id) {
      return ivnjs.library.show(id);
    },
    ui: ivnjs.library.ui,
    on: function(m, fn) {
      return ivnjs.library.on(m, fn);
    }
  };

  ivnjs.library = {
    on: function(method, fn) {
      switch (method) {
        case "ready":
          return window.onload = fn;
        default:
          return false;
      }
    },
    fly: function(id) {
      return document.getElementById(id);
    },
    getRandomId: function(num, _prefix) {
      var chars, i;
      if (num == null) num = 6;
      if (_prefix == null) _prefix = "id";
      chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      i = 0;
      while (i < num) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
        i++;
        return _prefix + id;
      }
    },
    hide: function(id) {
      return this.fly(id).style['display'] = "none";
    },
    show: function(id) {
      return this.fly(id).style['display'] = "block";
    },
    ui: {
      searchList: (function() {

        function _Class(obj) {
          var root_me, s, searchInterval;
          root_me = this;
          s = this.s = {};
          s.input_default = obj.input || "ui-search";
          s.ts = obj.toSearch;
          s.text_input_default = obj.InputText || "Buscar..";
          s.input = document.getElementById(s.input_default);
          s.input.value = s.text_input_default;
          s.input.onfocus = function() {
            if (this.value === s.text_input_default) return this.value = "";
          };
          s.input.onblur = function() {
            if (this.value === "") return this.value = s.text_input_default;
          };
          if (obj.type === "list") {
            s.getObjects = document.getElementById(s.ts);
            s.li_array = s.getObjects.getElementsByTagName("li");
            searchInterval = setInterval(function(){ root_me.search(root_me); },500);
          }
        }

        _Class.prototype.search = function() {
          var chain, i, word, _i, _len, _ref, _results;
          word = this.s.input.value;
          if (word === this.s.text_input_default || this.s.input.disabled) {
            return false;
          }
          word = new RegExp(word, "gi");
          _ref = this.s.li_array;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            chain = i.innerHTML;
            if (word.test(chain)) {
              _results.push(i.style['display'] = "block");
            } else {
              _results.push(i.style['display'] = "none");
            }
          }
          return _results;
        };

        _Class.prototype.disable = function() {
          this.s.input.disabled = true;
          return this.s.input.value = "Deshabilidado";
        };

        _Class.prototype.enable = function() {
          this.s.input.disabled = false;
          return this.s.input.value = this.s.text_input_default;
        };

        return _Class;

      })()
    }
  };

}).call(this);
