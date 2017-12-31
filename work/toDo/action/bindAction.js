var bindAction = function () {
    /**
     * Call Parent Constructor
     */
    baseAction.call(this);

    /**
     * Action types of bincAction. We are filtering this types in baseAction.actionRouter and we are getting methodName
     */
    this.setTypes({
        'value': 'bindValue',
        'text': 'bindText',
        'html': 'bindHtml',
        'options': 'bindOptions',
        'optionsObject': 'bindOptionsObject',
        'checked': 'bindChecked',
        'enable': 'bindEnable',
        'disable': 'bindDisable',
        'display': 'bindDisplay',
        'custom': 'bindCustom',
        'radio': 'bindChecked'
    });

    /**
     * instance Of BindMapLibrary
     * @type {bindMap}
     */
    this.bindMapLibrary = new bindMap();

};

/**
 * We are setting baseAction's Prototype as bindAction's Prototype
 * @type {baseAction}
 */
bindAction.prototype = Object.create(baseAction.prototype);

/**
 * Set Constructor Again
 * @type {bindAction}
 */
bindAction.prototype.constructor = bindAction;

bindAction.prototype = {
    /**
     * Bind Value of something
     * @param value
     * @param element
     */
    bindValue: function (value, element) {
        element.tagName === 'SELECT' ? this.bindSelectedValue(value, element) : false;
        element.value = value;
    },

    /**
     * Binds Text info to element
     * @param value
     * @param element
     */
    bindText: function (value, element) {
        element.innerText = value;
    },

    /**
     * Biinds Html Data Directly
     * @param value
     * @param element
     */
    bindHtml: function (value, element) {
        element.innerHTML = value;
    },

    /**
     * Binds "Options" of Select
     * @param value
     * @param element
     */
    bindOptions: function (value, element) {
        element.innerHTML = '';
        if (typeof value[0] === 'string') {
            for (var i = 0; i < value.length; i++) {
                var option = document.createElement('option');
                option.value = value[i];
                option.text = value[i];
                element.appendChild(option);
            }
        } else if (typeof value[0].val !== 'undefined') {
            for (var i = 0; i < value.length; i++) {
                var option = document.createElement('option');
                option.value = value[i].val;
                option.text = value[i].text;
                element.appendChild(option);
            }
        }
    },

    /**
     * bind method for "optionsObject"
     * @param value
     * @param element
     */
    bindOptionsObject: function (value, element) {
        element.innerHTML = '';
        //console.log(element.dataset.bind);
        var elementAllBinds = this.bindMapLibrary.getMultiBind(element.dataset.bind);
        var filteredBindings = elementAllBinds.filter(function (t) {
            return t.type === 'optionText' || t.type === 'optionValue'
        });
        var optionTextValue = {};
        filteredBindings.forEach(function (t) {
            optionTextValue[t.type] = t.bindingName;
        });
        value.forEach(function (t) {
            var option = document.createElement('option');
            option.value = optionTextValue.optionValue && t[optionTextValue.optionValue] ? t[optionTextValue.optionValue] : '';
            option.text = optionTextValue.optionText && t[optionTextValue.optionText] ? t[optionTextValue.optionText] : '';
            element.appendChild(option);
        });
    },

    /**
     * Value Binder for select inputs. BindValue method uses that method
     * @param value
     * @param element
     */
    bindSelectedValue: function (value, element) {
        if (element.tagName === 'SELECT') {
            element.childNodes.forEach(function (t) {
                t.value === value ? t.setAttribute('selected', 'selected') : false;
            });
        }
    },

    /**
     * Value Binder for checkboxes
     * @param value
     * @param element
     */
    bindChecked: function (value, element) {
        typeof value === 'boolean' ? this.bindBooleanChecked(value, element) : this.bindObjectChecked(value, element);
    },

    /**
     * Checkbox value binder for boolean values. bindChecked method is using this method
     * @param value
     * @param element
     */
    bindBooleanChecked: function (value, element) {
        element.checked = value;
    },

    /**
     * Value binder for array values to "checked" statement. bindChecked method is using this method
     * @param value
     * @param element
     */
    bindObjectChecked: function (value, element) {
        value.forEach(function (t) {
            if (t === element.value) {
                element.checked = true;
            }
        });
    },

    /**
     * Display binder. if value false, display none. Else, display block;
     * @param value
     * @param element
     */
    bindDisplay: function (value, element) {
        value === false ? element.style.display = 'none' : element.style.display = 'block';
    },

    /**
     * Enabele Binder, if value true, element is not disable.
     * @param value
     * @param element
     */
    bindEnable: function (value, element) {
        value === true ? element.disabled = false : element.disabled = true;
    },

    /**
     * Enabele Binder, if value true, element is disable
     * @param value
     * @param element
     */
    bindDisable: function (value, element) {
        value === true ? element.disabled = true : element.disabled = false;
    },

    /**
     * Radio binding. This method is not using now,
     * TODO: maybe refactor or delete
     * @param value
     * @param element
     * @return {boolean}
     */
    bindRadio: function (value, element) {
        for (var zeta = 0; zeta < value.length; zeta++) {
            if (element.value === value[zeta]) {
                return element.checked = true;
            }
        }
    },

    /**
     * TODO: Custom Bindings will be here
     */
    bindCustom: function (value, element) {
        if (typeof value === 'function') {
            value.call(this._targetContext, element);
        }
    }

}