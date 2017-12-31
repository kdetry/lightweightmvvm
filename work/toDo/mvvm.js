//TODO: Başlangıçta 2 defa kazanıyor
var baseViewModel = function (elementScope, scopeData) {
    var _elementScope = elementScope;
    this.bindMap = {};
    //self.valueScope = {};
    this.bindedElements = this.getBindedElements(_elementScope);
    //self.setScopeData(scopeData);

    /**
     * Instance of "bindActionLibrary"
     * @type {bindAction}
     */
    this.bindActionLibrary = new bindAction();

    /**
     * Set Context to BindAction
     */
    this.bindActionLibrary.setTargetContext(this);

    /**
     * Instance of "bindMap"
     * @type {bindMap}
     */
    this.bindMapLibrary = new bindMap();

    /**
     * Instance of "valueActionLibrary"
     * @type {valueAction}
     */
    this.valueActionLibrary = new valueAction();

    this.controlActionLibrary = new controlAction();
    this.controlActionLibrary.setTargetContext(this);

    this.setBindMap();
    console.log(this.bindMap);
    //TODO: Click yerine daha verimli bir event Handler konulmalı, gerekirse ayrı class yazılmalı
    this.bindEventListener(['keyup', 'click']);
    this.setScopeData(this.observable);
    this.syncBindings('control');
    this.syncBindings('bind');
};

baseViewModel.prototype = {
    /**
     * It is bind Event Listener for listen View binding events
     * It calls sync and value actions
     */
    bindEventListener: function (eventList) {
        for (var i = 0; i < eventList.length; i++) {
            document.addEventListener(eventList[i], function (event) {
                this.bindEventHandler(event);
            }.bind(this), true);
        }
    },

    /**
     *
     * @param event
     */
    bindEventHandler: function (event) {
        bindAttr = typeof event.target.dataset.bind === 'undefined' ? false : event.target.dataset.bind;
        if (bindAttr === false) {
            return false;
        }
        console.log("bindAttr : " + bindAttr);
        console.log("typeof bindAttr : " + typeof bindAttr);

        var bindAllInfo = this.bindMapLibrary.getMultiBind(bindAttr);
        var bindInfo = bindAllInfo.filter(function (t) {
            return t.type === 'value' || t.type === 'checked';
        });
        if (typeof bindAttr !== 'undefined' &&
            bindAttr.length > 0 &&
            this.bindMap[bindInfo[0].bindingName]) {
            this.valueToValueScope(bindInfo[0].bindingName, event.target);
            this.syncBindings('bind');
        }
    },

    /**
     * Sets bindMap by using bindedElements
     */
    setBindMap: function () {
        this.bindMap = this.bindMapLibrary.setAction(this.bindedElements);
    },


    addToBindMap: function (tempBindElements) {
        //console.log(this.bindMapLibrary.setAction(bindedElements));
        this.bindMap = Object.assign(this.bindMap, this.bindMapLibrary.setAction(tempBindElements));
    },


    /**
     * Yet Another setter for _elementScope
     * @param elementScope
     */
    setElementScope: function (elementScope) {
        this._elementScope = elementScope;
    },

    /**
     * Returns View Binded Elements
     * @param elementScope
     * @return {NodeList}
     */
    getBindedElements: function (elementScope) {
        return document.querySelectorAll(elementScope + ' *[data-bind]');
    },

    recursiveDottedNameParser: function (splitIndex, splittedBindingName, binding) {
        if (splitIndex < splittedBindingName.length) {
            var bindingIndex = splittedBindingName[splitIndex];
            splitIndex++;
            return this.recursiveDottedNameParser(splitIndex, splittedBindingName, binding[bindingIndex]);
        }
        return binding;
    },

    /**
     * Sync all bindings
     */
    syncBindings: function (actionType) {
        for (var bindingName in this.bindMap) {
            var value = this[bindingName];
            if (bindingName.indexOf('.') > -1) {
                value = this.recursiveDottedNameParser(0, bindingName.split('.'), this);
            }

            for (var i = 0; i < this.bindMap[bindingName].length; i++) {
                if (actionType === 'bind') {
                    this.bindActionLibrary.actionRouter(this.bindMap[bindingName][i].type, value, this.bindMap[bindingName][i].element);
                } else if (actionType === 'control') {
                    this.controlActionLibrary.actionRouter(this.bindMap[bindingName][i].type, value, this.bindMap[bindingName][i], bindingName);
                }
            }
        }
    },

    /**
     * bind Value to valueScope
     * @param bindingName
     * @param value
     */
    valueToValueScope: function (bindingName, element) {
        this[bindingName] = this.valueActionLibrary.actionRouter(this.getElementType(element), this[bindingName], element);
    },

    /**
     * Helper Function for SubMVVM Class
     * @param scopeData
     */
    setScopeData: function (scopeData) {
        for (var bindingName in scopeData) {
            this[bindingName] = scopeData[bindingName];
        }
        this.syncBindings('control');
        this.syncBindings('bind');
    },

    /**
     * returns element tag, if element tag is input, return input type
     * @param element
     * @return {string}
     */
    getElementType: function (element) {
        if (element.tagName.toLowerCase() !== 'input') {
            return element.tagName.toLowerCase();
        }
        if (typeof element.type === 'undefined') {
            return 'text';
        }
        return element.type;
    }
}

