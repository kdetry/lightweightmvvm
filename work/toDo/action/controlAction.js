var controlAction = function () {
    /**
     * Call Parent Constructor
     */
    baseAction.call(this);

    /**
     * Action types of controlAction. We are filtering this types in baseAction.actionRouter and we are getting methodName
     */
    this.setTypes({
        'foreach': 'controlForeach'
    });

    var _targetContext = {};
};
/**
 * We are setting controlAction's Prototype as controlAction's Prototype
 * @type {baseAction}
 */
controlAction.prototype = Object.create(baseAction.prototype);

/**
 * Set Constructor Again
 * @type {bindAction}
 */
controlAction.prototype.constructor = controlAction;


controlAction.prototype = {

    /**
     * ActionRouter override
     * @param type
     * @param value
     * @param bindInfo
     * @param bindingName
     * @return {*}
     */
    actionRouter: function (type, value, bindInfo, bindingName) {
        var methodName = this.getActionMethod(type);
        if (typeof this[methodName] !== 'undefined') {
            return this[methodName](value, bindInfo.element, bindInfo.defaultElementContent, bindingName);
        }
    },

    /**
     * Method for "Foreach" binding and "Foreach" Loop
     * @param value
     * @param element
     * @param defaultElementContent
     * @param bindingName
     */
    controlForeach: function (value, element, defaultElementContent, bindingName) {
        element.innerHTML = '';
        for (var zeta = 0; zeta < value.length; zeta++) {
            var newContent = defaultElementContent;
            var newBindings = [];
            for (var key in value[zeta]) {
                newContent = newContent.replace(key, bindingName + '.' + zeta + '.' + key);
                newBindings.push(bindingName + '.' + zeta + '.' + key);
            }
            element.insertAdjacentHTML('beforeend', newContent);
        }
        var allSelectedElements = element.querySelectorAll('*[data-bind]');
        console.log(allSelectedElements);
        this._targetContext.addToBindMap(allSelectedElements);
    }


}