var exampleViewModel = function () {

    var self = this;
    self.observable = {};
    self.observable.firstName = "Deneme Adı";
    self.observable.optionsTest = ['ALmanya', 'Fransa', 'Beşiktaş'];

    self.observable.optionsTestKeyli = [
        {
            'val': 0,
            'text': 'Beşiktaş'
        },
        {
            'val': 1,
            'text': 'Almanya'
        }
    ];
    self.observable.optionsTestObjectModel = [
        {
            'aSillyName': 'Beşiktaş',
            'aSillyValue': 'fckWorl'
        },
        {
            'aSillyName': 'EnumWorld',
            'aSillyValue': 'enumworld'
        },
        {
            'aSillyName': 'eee',
            'aSillyValue': 'ddd'
        }
    ];
    self.observable.denemeVal = 'enumworld';
    self.observable.integerVal = 3;
    self.observable.colorVal = '#ffffff';
    self.observable.telVal = '02122122112';
    self.observable.emailVal = 'deneme@gmail.com';
    self.observable.textareaVal = 'Morbi consequat, ex vel pharetra euismod, lectus tortor elementum mi, sit amet ' +
        'egestas erat arcu eget ligula. Mauris ullamcorper elit lorem, ut sollicitudin orci vestibulum vitae. Sed et ' +
        'erat bibendum, finibus magna id, rutrum diam. Praesent nec leo in dolor dictum malesuada. Vivamus viverra ' +
        'blandit magna tincidunt mattis. Suspendisse potenti. Cras imperdiet pellentesque ante nec tincidunt. Mauris ' +
        'pretium efficitur sollicitudin. Pellentesque at iaculis felis.\n';
    self.observable.checkedBooleanDeneme = true;
    self.observable.checkedArrayDeneme = ['Cenk', 'Tosun'];

    self.observable.dotli = {
        'aName': 'dot Notasyon kabul Eder'
    };
};

/**
 * We are setting baseAction's Prototype as bindAction's Prototype
 * @type {baseAction}
 */
exampleViewModel.prototype = Object.create(baseViewModel.prototype);

/**
 * Set Constructor Again
 * @type {bindAction}
 */
exampleViewModel.prototype.constructor = exampleViewModel;

exampleViewModel.prototype.cbDeneme = function (element) {
    element.innerHTML = this.firstName.toUpperCase() + ' 123123';
};

exampleViewModel.prototype.cbTypeof = function (element) {
    element.innerHTML += typeof this.integerVal;
};


window.onload = function () {
    //new exampleViewModel();
    var eWM = new exampleViewModel();
    /**
     * Call Parent Constructor
     */
    baseViewModel.call(eWM, '#example');
};
