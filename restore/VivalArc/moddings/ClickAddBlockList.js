/*
 * Click to add Blocking list
 * Written by Tam710562
 */

(function () {
  'use strict';

  const gnoh = {
    constant: {
      "dialogButtons": {
        "submit": {
          "type": "submit"
        },
        "cancel": {
          "cancel": true
        },
        "primary": {
          "class": "primary"
        },
        "danger": {
          "class": "danger"
        },
        "default": {}
      }
    },
    constant: {
      "dialogButtons": {
        "submit": {
          "type": "submit"
        },
        "cancel": {
          "cancel": true
        },
        "primary": {
          "class": "primary"
        },
        "danger": {
          "class": "danger"
        },
        "default": {}
      }
    },
    decode: {
      url: function (str) {
        return !str ? str : decodeURIComponent(str.replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25'));
      }
    },
    generateUUID: function (ids) {
      let d = Date.now() + performance.now();
      let r;
      const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });

      if (Array.isArray(ids) && ids.includes(id)) {
        return this.generateUUID(ids);
      }
      return id;
    },
    createElement: function (tagName, attribute, parent, inner, options) {
      if (typeof tagName === 'undefined') {
        return;
      }
      if (typeof options === 'undefined') {
        options = {};
      }
      if (typeof options.isPrepend === 'undefined') {
        options.isPrepend = false;
      }
      const el = document.createElement(tagName);
      if (!!attribute && typeof attribute === 'object') {
        for (let key in attribute) {
          if (key === 'text') {
            el.textContent = attribute[key];
          } else if (key === 'html') {
            el.innerHTML = attribute[key];
          } else if (key === 'style' && typeof attribute[key] === 'object') {
            for (let css in attribute.style) {
              el.style[css] = attribute.style[css];
            }
          } else if (key === 'events' && typeof attribute[key] === 'object') {
            for (let event in attribute.events) {
              if (typeof attribute.events[event] === 'function') {
                el.addEventListener(event, attribute.events[event]);
              }
            }
          } else if (typeof el[key] !== 'undefined') {
              el[key] = attribute[key];
          } else {
            if (typeof attribute[key] === 'object') {
              attribute[key] = JSON.stringify(attribute[key]);
            }
            el.setAttribute(key, attribute[key]);
          }
        }
      }
      if (!!inner) {
        if (!Array.isArray(inner)) {
          inner = [inner];
        }
        for (let i = 0; i < inner.length; i++) {
          if (inner[i].nodeName) {
            el.append(inner[i]);
          } else {
            el.append(this.createElementFromHTML(inner[i]));
          }
        }
      }
      if (typeof parent === 'string') {
        parent = document.querySelector(parent);
      }
      if (!!parent) {
        if (options.isPrepend) {
          parent.prepend(el);
        } else {
          parent.append(el);
        }
      }
      return el;
    },
    createElementFromHTML: function (html) {
      return this.createElement('template', {
        html: (html || '').trim()
      }).content;
    },
    getFormData: function (formElement) {
      if (!formElement || formElement.nodeName !== 'FORM') {
        return;
      }

      const data = {};

      function setOrPush(key, value, isOnly) {
        if (data.hasOwnProperty(key) && isOnly !== true) {
          if (!Array.isArray(data[key])) {
            data[key] = data[key] != null ? [data[key]] : [];
          }
          if (value != null) {
            data[key].push(value);
          }
        } else {
          data[key] = value;
        }
      }

      const inputElements = Array.from(formElement.elements).filter(function (field) {
        if (field.name) {
          switch (field.nodeName) {
            case 'INPUT':
              switch (field.type) {
                case 'button':
                case 'image':
                case 'reset':
                case 'submit':
                  return false;
              }
              break;
            case 'BUTTON':
              return false;
          }
          return true;
        } else {
          return false;
        }
      });

      if (inputElements.length === 0) {
        return;
      }

      inputElements.forEach(function (field) {
        if (field.name) {
          switch (field.nodeName) {
            case 'INPUT':
              switch (field.type) {
                case 'color':
                case 'email':
                case 'hidden':
                case 'password':
                case 'search':
                case 'tel':
                case 'text':
                case 'time':
                case 'url':
                case 'month':
                case 'week':
                  setOrPush(field.name, field.value);
                  break;
                case 'checkbox':
                  if (field.checked) {
                    setOrPush(field.name, field.value || field.checked);
                  } else {
                    setOrPush(field.name, null);
                  }
                  break;
                case 'radio':
                  if (field.checked) {
                    setOrPush(field.name, field.value || field.checked, true);
                  } else {
                    setOrPush(field.name, null, true);
                  }
                  break;
                case 'date':
                case 'datetime-local':
                  const date = new Date(field.value);
                  if (isFinite(date)) {
                    date.setTime(d.getTime() + d.getTimezoneOffset() * 60000);
                    setOrPush(field.name, date);
                  } else {
                    setOrPush(field.name, null);
                  }
                  break;
                case 'file':
                  setOrPush(field.name, field.files);
                  break;
                case 'number':
                case 'range':
                  if (field.value && isFinite(Number(field.value))) {
                    setOrPush(field.name, Number(field.value));
                  } else {
                    setOrPush(field.name, null);
                  }
                  break;
                /* case 'button':
                case 'image':
                case 'reset':
                case 'submit':
                  break; */
              }
              break;
            case 'TEXTAREA':
              setOrPush(field.name, field.value);
              break;
            case 'SELECT':
              switch (field.type) {
                case 'select-one':
                  setOrPush(field.name, field.value);
                  break;
                case 'select-multiple':
                  Array.from(field.options).forEach(function (option) {
                    if (option.selected) {
                      setOrPush(field.name, option.value);
                    } else {
                      setOrPush(field.name, null);
                    }
                  });
                  break;
              }
              break;
            case 'BUTTON':
              /* switch (field.type) {
                case 'reset':
                case 'submit':
                case 'button':
                  break;
              } */
              break;
          }
        }
      });
      return data;
    },
    dialog: function (title, content, buttons, config) {
      let modalBg;
      let dialog;
      let cancelEvent;
      const id = this.generateUUID();

      if (!config) {
        config = {};
      }
      if (typeof config.autoClose === 'undefined') {
        config.autoClose = true;
      }

      function onKeyCloseDialog(key) {
        if (key === 'Esc') {
          closeDialog(true);
        }
      }

      function onClickCloseDialog(event) {
        if (config.autoClose && !event.target.closest('.dialog-custom[data-dialog-id="' + id + '"]')) {
          closeDialog(true);
        }
      }

      function closeDialog(isCancel) {
        if (isCancel === true && cancelEvent) {
          cancelEvent.bind(this)(gnoh.getFormData(dialog));
        }
        if (modalBg) {
          modalBg.remove();
        }
        vivaldi.tabsPrivate.onKeyboardShortcut.removeListener(onKeyCloseDialog);
        document.removeEventListener('click', onClickCloseDialog);
      }

      vivaldi.tabsPrivate.onKeyboardShortcut.addListener(onKeyCloseDialog);
      document.addEventListener('click', onClickCloseDialog);

      const buttonElements = [];
      for (let button of buttons) {
        button.type = button.type || 'button';
        const clickEvent = button.click;
        if (button.cancel === true && typeof clickEvent === 'function') {
          cancelEvent = clickEvent;
        }
        button.events = {
          click: function (event) {
            event.preventDefault();
            if (typeof clickEvent === 'function') {
              clickEvent.bind(this)(gnoh.getFormData(dialog));
            }
            if (button.closeDialog !== false) {
              closeDialog();
            }
          }
        };
        delete button.click;
        if (button.label) {
          button.value = button.label;
          delete button.label;
        }
        buttonElements.push(this.createElement('input', button));
      }

      const focusModal = this.createElement('span', {
        class: 'focus_modal',
        tabindex: '0'
      });
      const div = this.createElement('div', {
        style: {
          width: config.width ? config.width + 'px' : ''
        }
      });
      dialog = this.createElement('form', {
        'data-dialog-id': id,
        class: 'dialog-custom'
      }, div);
      if (config.class) {
        dialog.classList.add(config.class);
      }
      const dialogHeader = this.createElement('header', {
        class: 'dialog-header'
      }, dialog, '<h1>' + (title || '') + '</h1>');
      const dialogContent = this.createElement('div', {
        class: 'dialog-content'
      }, dialog, content);
      if (buttons && buttons.length > 0) {
        const dialogFooter = this.createElement('footer', {
          class: 'dialog-footer'
        }, dialog, buttonElements);
      }
      modalBg = this.createElement('div', {
        id: 'modal-bg',
        class: 'slide'
      }, undefined, [focusModal.cloneNode(true), div, focusModal.cloneNode(true)]);
      const inner = document.querySelector('#main .inner');
      if (inner) {
        inner.prepend(modalBg);
      }
      return {
        dialog: dialog,
        dialogHeader: dialogHeader,
        dialogContent: dialogContent,
        buttons: buttonElements,
        close: closeDialog
      };
    },
    alert: function (message, okEvent) {
      const buttonOkElement = Object.assign({
        label: 'Ok',
        cancel: true
      }, this.constant.dialogButtons.submit);
      if (typeof okEvent === 'function') {
        buttonOkElement.click = function (data) {
          okEvent.bind(this)(data);
        };
      }

      return this.dialog('Gnoh', message, [buttonOkElement], {
        width: 400,
        class: 'dialog-javascript'
      });
    }
  };

  const debug = false;
  const log = debug ? console.log : function () { };
  let isLoading = false;
  let dialogRef;

  const langs = {
    done: chrome.i18n.getMessage('_68_one0'),
    cancel: chrome.i18n.getMessage('_67_ancel0'),
    loading: chrome.i18n.getMessage('_76_oading_46__46__46_0')
  };

  function showDialogImportNew(blockListId) {
    const buttonDoneElement = Object.assign({
      label: langs.done,
      disabled: true,
      click: function (data) {
        isLoading = false;
      }
    }, gnoh.constant.dialogButtons.submit);
    const buttonCancelElement = Object.assign({
      label: langs.cancel,
      cancel: true,
      click: function (data) {
        vivaldi.contentBlocking.deleteKnownSource(vivaldi.contentBlocking.RuleGroup.AD_BLOCKING, blockListId);
        isLoading = false;
      }
    }, gnoh.constant.dialogButtons.cancel);

    dialogRef = gnoh.dialog("Import New Blocker List", langs.loading, [buttonDoneElement, buttonCancelElement], {
      width: 500,
      class: 'ContentBlocker-Exception',
      autoClose: false
    });
  }

  function fetchComplete(blockList) {
    if (isLoading === true) {
      if (blockList.last_fetch_result === 'success') {
        const contentHTML = [
          '<h3>' + blockList.unsafe_adblock_metadata.title + '</h3>',
          '<p class="info" style="word-break: break-all">' + blockList.source_url + '</p>',
          '<p>Valid rules: ' + blockList.rules_info.valid_rules + '<br>Invalid rules: ' + blockList.rules_info.invalid_rules + '<br>Unsupported rules: ' + blockList.rules_info.unsupported_rules + '</p>'
        ].join('');
        dialogRef.dialogContent.innerHTML = contentHTML;
        dialogRef.buttons[0].disabled = false;
      } else if (!blockList.is_fetching) {
        dialogRef.close();
        vivaldi.contentBlocking.deleteKnownSource(vivaldi.contentBlocking.RuleGroup.AD_BLOCKING, blockList.id);
        gnoh.alert(blockList.last_fetch_result, function () {
          isLoading = false;
        });
      }
    }
  }

  vivaldi.contentBlocking.onRulesSourceUpdated.addListener(fetchComplete);

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    let matchURL;
    if (tab.pendingUrl && (matchURL = tab.pendingUrl.match(/(https:\/\/subscribe\.adblockplus\.org\/|abp:subscribe)\?location=(.+)(&|&amp;)title=.+/))) {
      const blockListURL = gnoh.decode.url(matchURL[2]);
      log(blockListURL, tab.pendingUrl);

      if (tab.url === '' || tab.url === tab.pendingUrl) {
        chrome.tabs.remove(tabId, log);
      } else if (tab.url) {
        chrome.tabs.update(tabId, { url: tab.url });
      }

      if (tab.windowId === vivaldiWindowId && isLoading === false) {
        isLoading = true;

        vivaldi.contentBlocking.addKnownSourceFromURL(vivaldi.contentBlocking.RuleGroup.AD_BLOCKING, blockListURL, function (blockListId) {
          if (!chrome.runtime.lastError) {
            showDialogImportNew(blockListId)
          } else {
            gnoh.alert(chrome.runtime.lastError.message, function () {
              isLoading = false;
            });
          }
        });
      }
    }
  });
})();
