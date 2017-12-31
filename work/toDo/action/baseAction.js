var baseAction = function () {

    var _targetContext = {};
};

/**
 * Returns Action Method for actionRouter method
 * TODO: How can we make Abstract Class by using Prototype Based JS, for this class
 * @param type
 * @return {string}
 */
baseAction.prototype.getActionMethod = function (type) {
    if(typeof this.types[type] !== 'undefined'){
        return this.types[type];
    }
};

/**
 * setTypes for type search and getActionMethod
 * @param typeData
 */
baseAction.prototype.setTypes = function (typeData) {
    this.types = typeData;
};

/**
 * actionRouter for all Action postFixed prototypes
 * @param type
 * @param value
 * @param element
 * @return {*}
 */
baseAction.prototype.actionRouter = function (type, value, element) {
    var methodName = this.getActionMethod(type);
    if(typeof this[methodName] !== 'undefined'){
        return this[methodName](value, element);
    }
};

/**
 * Yet Another setter. It sets context, mvvm is using this like "setTargetContext(this)"
 * @param context
 */
baseAction.prototype.setTargetContext = function (context) {
    this._targetContext = context;
};