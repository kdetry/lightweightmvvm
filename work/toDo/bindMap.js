var bindMap = function () {
    this.mvvmBindMap = {};
};

/**
 * check Multi Bind or return as single one
 * @param multiBindString
 * @return {Array}
 */
bindMap.prototype.getMultiBind = function (multiBindString) {
    if (multiBindString.indexOf(',') > -1){
        var multiBindArray = multiBindString.split(',');
        return multiBindArray.map(function (element) { return bindMap.prototype.getBindTypeAndValue(element); });
    }
    return [this.getBindTypeAndValue(multiBindString.trim())];
};


/**
 * Returns Bind Type and Value as Object
 * @param bindString
 * @return {{type: *, value: *}}
 */
bindMap.prototype.getBindTypeAndValue = function (bindString) {
    if (typeof bindString !== 'undefined'){
        return {
            type: bindString.split(':')[0].trim(),
            bindingName: bindString.split(':')[1].trim()
        }
    }
};

/**
 * setBindingResults to BindMap
 * @param bindInfoArray
 * @param element
 */
bindMap.prototype.setBindResult = function (bindInfoArray, element) {
    for(var zeta = 0; zeta < bindInfoArray.length; zeta++){
        if(typeof this.mvvmBindMap[bindInfoArray[zeta].bindingName] === 'undefined'){
            this.mvvmBindMap[bindInfoArray[zeta].bindingName] = [];
        }
        this.mvvmBindMap[bindInfoArray[zeta].bindingName].push(
            {
                'element': element,
                'type': bindInfoArray[zeta].type,
                'defaultElementContent': element.innerHTML
            }
        );
    }
};

/**
 * take bindedElements and mvvmObject and control getMultiBind and setBindResult actions
 * @param bindedElements
 */
bindMap.prototype.setAction = function (bindedElements) {
    for (var i = 0; i < bindedElements.length; i++) {
        var element = bindedElements[i];
        var bindInfo = this.getMultiBind(element.dataset.bind);
        this.setBindResult(bindInfo, element);
    }
    return this.mvvmBindMap;
};

