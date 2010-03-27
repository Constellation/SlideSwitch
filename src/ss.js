//
// X / _ / X < Slide Switch
// MIT License (c) 2010 id:Constellation
//
// for my tumblr (http://utatane-constellation.tumblr.com/)
// on Firefox 3.6 or Chrome or Safari

if(document.querySelectorAll && !window.SlideSwitch)
(function(){

  document.addEventListener('DOMContentLoaded', function(){
    document.removeEventListener('DOMContentLoaded', arguments.callee, false);
    var doc = document, win = window;
    if(!(isTumblrEntryPage() && doc.querySelector('div.section'))) return;

    function SlideSwitch(){
      this.index = 0;
      this.sections = $A(doc.querySelectorAll('div.section')).map(function(div){
        return new Section(div);
      })
      this.length = this.sections.length;
      this.handler = null;
    }

    var hideIds = ['head','footer'];
    SlideSwitch.prototype.start = function SlideSwitch_show(){
      var that = this;
      // hide
      hideIds.forEach(function(elm){
        addClass($(elm), 'hide');
      });
      $A(document.querySelectorAll('div.post.text > *')).forEach(function(elm){
        addClass(elm, 'hide');
      });
      $A(document.querySelectorAll('body > *')).forEach(function(elm){
        if(elm.id !== 'wrap')
          addClass(elm, 'hide');
      });
      addClass(document.body, 'sliding');
      // register
      document.addEventListener('keydown', function(ev){
        that.handler = arguments.callee;
        that.keydown(ev);
      }, false);
      this.sections[this.index].show();
    }
    SlideSwitch.prototype.stop = function SlideSwitch_stop(){
      this.sections[this.index].hide();
      // revert
      hideIds.forEach(function(elm){
        removeClass($(elm), 'hide');
      });
      $A(document.querySelectorAll('div.post.text > *')).forEach(function(elm){
        removeClass(elm, 'hide');
      });
      $A(document.querySelectorAll('body > *')).forEach(function(elm){
        if(elm.id !== 'wrap')
          removeClass(elm, 'hide');
      });
      removeClass(document.body, 'sliding');
      // unregister
      document.removeEventListener('keydown', this.handler, false);
    }
    SlideSwitch.prototype.next = function SlideSwitch_next(){
      if(this.index !== this.length-1){
        this.sections[this.index].hide();
        this.sections[++this.index].show();
      }
    }
    SlideSwitch.prototype.prev = function SlideSwitch_prev(){
      if(this.index !== 0){
        this.sections[this.index].hide();
        this.sections[--this.index].show();
      }
    }
    SlideSwitch.prototype.keydown = function SlideSwitch_keydown(ev){
      var key = keyString(ev);
      this[key] && this[key](ev);
    }
    SlideSwitch.prototype.RIGHT = function SlideSwitch_RIGHT(ev){
      this.next();
    }
    SlideSwitch.prototype.LEFT  = function SlideSwitch_LEFT(ev){
      this.prev();
    }
    SlideSwitch.prototype.SPACE = function SlideSwitch_SPACE(ev){
      SlideSwitch.stop();
    }

    SlideSwitch.start = function SlideSwitch_s_start(){
      if(!SlideSwitch.instance)
        SlideSwitch.instance = new SlideSwitch();
      SlideSwitch.instance.start();
    }
    SlideSwitch.stop = function SlideSwitch_s_stop(){
      if(SlideSwitch.instance){
        SlideSwitch.instance.stop();
        SlideSwitch.instance = null;
      }
    }

    function Section(div){
      this.element = div;
      this.title   = div.getElementsByTagName('h3')[0].textContent;
      this.shown   = false;
    }
    Section.prototype.show = function Section_show(){
      removeClass(this.element, 'hide');
      addClass(this.element, 'show');
      this.shown = true;
      return this;
    }
    Section.prototype.hide = function Section_hide(){
      removeClass(this.element,'show');
      addClass(this.element, 'hide');
      this.shown = false;
      return this;
    }

    function hasClass(e, name){
      name = name.toLowerCase();
      var cn = e.className;
      if (!cn) return false;
      var cnlist = cn.toLowerCase().split(/\s+/);
      for (var i=0,l=cnlist.length;i<l;i++)
        if(cnlist[i] === name) return true;
      return false;
    }
    function addClass(e, name){
      var cn = e.className || '';
      if(hasClass(e, name)) return;
      e.className = cn+' '+name;
    }
    function removeClass(e, name){
      if(!hasClass(e, name)) return;
      var cn = e.className || '';
      name = name.toLowerCase();
      var cnlist = cn.toLowerCase().split(/\s+/);
      cnlist.splice(cnlist.indexOf(name), 1);
      e.className = cnlist.join(' ');
    }
    function toggleClass(e, name){
      (hasClass(e, name))? removeClass(e, name) : addClass(e, name);
    }
    function $A(list){
      return Array.prototype.slice.call(list);
    }
    function $(id){
      return doc.getElementById(id);
    }
    function isTumblrEntryPage(){
      return /http:\/\/[^\/]+\/post\/\d+/.test(doc.location.href);
    }
    var KeyEvent = {
      'DOM_VK_CANCEL'        : 3,
      'DOM_VK_HELP'          : 6,
      'DOM_VK_BACK_SPACE'    : 8,
      'DOM_VK_TAB'           : 9,
      'DOM_VK_CLEAR'         : 12,
      'DOM_VK_RETURN'        : 13,
      'DOM_VK_ENTER'         : 14,
      'DOM_VK_SHIFT'         : 16,
      'DOM_VK_CONTROL'       : 17,
      'DOM_VK_ALT'           : 18,
      'DOM_VK_PAUSE'         : 19,
      'DOM_VK_CAPS_LOCK'     : 20,
      'DOM_VK_ESCAPE'        : 27,
      'DOM_VK_SPACE'         : 32,
      'DOM_VK_PAGE_UP'       : 33,
      'DOM_VK_PAGE_DOWN'     : 34,
      'DOM_VK_END'           : 35,
      'DOM_VK_HOME'          : 36,
      'DOM_VK_LEFT'          : 37,
      'DOM_VK_UP'            : 38,
      'DOM_VK_RIGHT'         : 39,
      'DOM_VK_DOWN'          : 40,
      'DOM_VK_PRINTSCREEN'   : 44,
      'DOM_VK_INSERT'        : 45,
      'DOM_VK_DELETE'        : 46,
      'DOM_VK_0'             : 48,
      'DOM_VK_1'             : 49,
      'DOM_VK_2'             : 50,
      'DOM_VK_3'             : 51,
      'DOM_VK_4'             : 52,
      'DOM_VK_5'             : 53,
      'DOM_VK_6'             : 54,
      'DOM_VK_7'             : 55,
      'DOM_VK_8'             : 56,
      'DOM_VK_9'             : 57,
      'DOM_VK_SEMICOLON'     : 59,
      'DOM_VK_EQUALS'        : 61,
      'DOM_VK_A'             : 65,
      'DOM_VK_B'             : 66,
      'DOM_VK_C'             : 67,
      'DOM_VK_D'             : 68,
      'DOM_VK_E'             : 69,
      'DOM_VK_F'             : 70,
      'DOM_VK_G'             : 71,
      'DOM_VK_H'             : 72,
      'DOM_VK_I'             : 73,
      'DOM_VK_J'             : 74,
      'DOM_VK_K'             : 75,
      'DOM_VK_L'             : 76,
      'DOM_VK_M'             : 77,
      'DOM_VK_N'             : 78,
      'DOM_VK_O'             : 79,
      'DOM_VK_P'             : 80,
      'DOM_VK_Q'             : 81,
      'DOM_VK_R'             : 82,
      'DOM_VK_S'             : 83,
      'DOM_VK_T'             : 84,
      'DOM_VK_U'             : 85,
      'DOM_VK_V'             : 86,
      'DOM_VK_W'             : 87,
      'DOM_VK_X'             : 88,
      'DOM_VK_Y'             : 89,
      'DOM_VK_Z'             : 90,
      'DOM_VK_CONTEXT_MENU'  : 93,
      'DOM_VK_NUMPAD0'       : 96,
      'DOM_VK_NUMPAD1'       : 97,
      'DOM_VK_NUMPAD2'       : 98,
      'DOM_VK_NUMPAD3'       : 99,
      'DOM_VK_NUMPAD4'       : 100,
      'DOM_VK_NUMPAD5'       : 101,
      'DOM_VK_NUMPAD6'       : 102,
      'DOM_VK_NUMPAD7'       : 103,
      'DOM_VK_NUMPAD8'       : 104,
      'DOM_VK_NUMPAD9'       : 105,
      'DOM_VK_MULTIPLY'      : 106,
      'DOM_VK_ADD'           : 107,
      'DOM_VK_SEPARATOR'     : 108,
      'DOM_VK_SUBTRACT'      : 109,
      'DOM_VK_DECIMAL'       : 110,
      'DOM_VK_DIVIDE'        : 111,
      'DOM_VK_F1'            : 112,
      'DOM_VK_F2'            : 113,
      'DOM_VK_F3'            : 114,
      'DOM_VK_F4'            : 115,
      'DOM_VK_F5'            : 116,
      'DOM_VK_F6'            : 117,
      'DOM_VK_F7'            : 118,
      'DOM_VK_F8'            : 119,
      'DOM_VK_F9'            : 120,
      'DOM_VK_F10'           : 121,
      'DOM_VK_F11'           : 122,
      'DOM_VK_F12'           : 123,
      'DOM_VK_F13'           : 124,
      'DOM_VK_F14'           : 125,
      'DOM_VK_F15'           : 126,
      'DOM_VK_F16'           : 127,
      'DOM_VK_F17'           : 128,
      'DOM_VK_F18'           : 129,
      'DOM_VK_F19'           : 130,
      'DOM_VK_F20'           : 131,
      'DOM_VK_F21'           : 132,
      'DOM_VK_F22'           : 133,
      'DOM_VK_F23'           : 134,
      'DOM_VK_F24'           : 135,
      'DOM_VK_NUM_LOCK'      : 144,
      'DOM_VK_SCROLL_LOCK'   : 145,
      'DOM_VK_COMMA'         : 188,
      'DOM_VK_PERIOD'        : 190,
      'DOM_VK_SLASH'         : 191,
      'DOM_VK_BACK_QUOTE'    : 192,
      'DOM_VK_OPEN_BRACKET'  : 219,
      'DOM_VK_BACK_SLASH'    : 220,
      'DOM_VK_CLOSE_BRACKET' : 221,
      'DOM_VK_QUOTE'         : 222,
      'DOM_VK_META'          : 224
    }
    function keyString(e){
      var table = [];
      for(var name in KeyEvent)
        if(name.indexOf('DOM_VK_')===0)
          table[KeyEvent[name]] = name.substring(7);

      return (keyString = function(e){
        var code = e.keyCode;
        var res = [];
        (e.metaKey  || code===KeyEvent.DOM_VK_META)    && res.push('META');
        (e.ctrlKey  || code===KeyEvent.DOM_VK_CONTROL) && res.push('CTRL');
        (e.shiftKey || code===KeyEvent.DOM_VK_SHIFT)   && res.push('SHIFT');
        (e.altKey   || code===KeyEvent.DOM_VK_ALT)     && res.push('ALT');

        if((code < KeyEvent.DOM_VK_SHIFT || KeyEvent.DOM_VK_ALT < code) && code != KeyEvent.DOM_VK_META)
          res.push(table[code]);

        return res.join(' + ');
      })(e);
    }

    win.SlideSwitch = SlideSwitch;
  }, false);
})();

