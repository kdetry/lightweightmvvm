var valueAction = function () {
    /**
     * Call parent constructor firstly
     */
    baseAction.call(this);

    /**
     * Action Types of ValueAction. We are filtering this types in baseAction.actionRouter and we get methodName
     */
    this.setTypes({
        'select': 'valueSelect',
        'checkbox': 'valueCheckbox',
        'text': 'valueText',
        'number': 'valueNumber',
        //TODO:Color Value Binding may have error
        'color': 'valueText',
        'textarea': 'valueText',
        'date': 'valueText',
        'email': 'valueText',
        'tel': 'valueText',
        'url': 'valueText'
    });
};

/**
 * Sets protoype for inheritance
 * @type {baseAction}
 */
valueAction.prototype = Object.create(baseAction.prototype);

/**
 * Sets constructor after inheritance
 * @type {valueAction}
 */
valueAction.prototype.constructor = valueAction;

valueAction.prototype = {

    /**
     * return value of select element
     * @param value
     * @param element
     * @return {string|Number|string|*}
     */
    valueSelect: function (value, element) {
        return typeof element.selectedIndex !== 'undefined' ? element.options[element.selectedIndex].value : element.options[0].value;
    },

    /**
     * return value of input element
     * @param value
     * @param element
     * @return {string|Number|string|*}
     */
    valueText: function (value, element) {
        return element.value;
    },

    /**
     * redirect to checkedboolean or checked array methods. this methods for value binding to array or boolean checkboxes
     * @param value
     * @param element
     * @return {*}
     */
    valueCheckbox: function (value, element) {
        return typeof value === 'boolean' ? this.valueCheckedBoolean(value, element) : this.valueCheckedArray(value, element);
    },

    /**
     * return boolean value of checkbox element
     * @param value
     * @param element
     * @return {boolean|string|*}
     */
    valueCheckedBoolean: function (value, element) {
        return element.checked;
    },

    /**
     * return array of checked elements
     * @param value
     * @param element
     * @return {Array}
     */
    valueCheckedArray: function (value, element) {
        var indexVal = value.indexOf(element.value);
        if (element.checked === true && indexVal === -1) {
            value.push(element.value);
        } else if (element.checked === false && indexVal > -1) {
            value.splice(indexVal, 1);
        }
        return value;
    },

    valueNumber: function (value, element) {
        return window.parseInt(element.value);
    }

}