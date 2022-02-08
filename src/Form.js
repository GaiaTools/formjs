import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";

export default class Form {
    constructor(attrs = {}) {
        this.initialize(attrs);
    }

    initialize (attrs = {}) {
        this.attrs = attrs;
    }

    createForm (attrs = {}) {
        var form = document.createElement('form');
        if(Object.keys(attrs).length > 0) this.attrs = attrs;

        Form.createAttrs (form, this.attrs);
        return form;
    }

    createMultipartForm (attrs = {}) {
        attrs.enctype = 'multipart/form-data';
        return this.createForm(attrs);
    }

    createFieldset (fieldset_title, fieldset_id = '', attrs = {}) {
        var fieldset = document.createElement('fieldset');

        if(fieldset_title) {
            var legend = fieldset.appendChild(document.createElement('legend'));

            legend.textContent = fieldset_title;
        }

        if(fieldset_id) {
            fieldset.id = fieldset_id;
        }

        Form.createAttrs(fieldset, attrs);

        return fieldset;
    }

    createInput (name, type = 'text', value = '', attrs = {} ) {
        if(!type) type = 'text';
        var input = new Input(type, name, Form.prep(value), attrs);
        return this._createElement(input, attrs);
    }

    createText (name, value = '', attrs = {}) {
        return this.createInput(name, 'text', Form.prep(value), attrs);
    }

    createPassword (name, value = '', attrs = {}) {
        return this.createInput(name,'password', Form.prep(value), attrs);
    }

    createNumber (name, value = '', attrs = {}) {
        return this.createInput(name, 'number', Form.prep(value), attrs);
    }

    createEmail (name, value = '', attrs = {}) {
        return this.createInput(name, 'email', Form.prep(value), attrs);
    }

    createRange (name, value = '', attrs = {}) {
        return this.createInput(name, 'range', Form.prep(value), attrs);
    }

    createUrl (name, value = '', attrs = {}) {
        return this.createInput(name,'url', Form.prep(value), attrs);
    }

    createSearch (name, value = '', attrs = {}) {
        return this.createInput(name,'search', Form.prep(value), attrs);
    }

    createHidden (name, value = '', attrs = {}) {
        return this.createInput(name,'hidden', value, attrs);
    }

    createRadio (name, value = '', attrs = {}) {
        return this.createInput(name,'radio', value, attrs);
    }

    createCheckbox (name, value = '', attrs = {}) {
        return this.createInput(name,'checkbox', Form.prep(value), attrs);
    }

    createFile (name, attrs = {}) {
        return this.createInput(name,'file', '', attrs);
    }

    createSelect (name, options = {}, value = '', attrs = {}, first_option = '', disabled = []) {
        var select = new Select(name, options, value, attrs, first_option, disabled);
        return this._createElement(select);
    }

    createTextarea (name, value = '', attrs = {}) {
        var textarea = new Textarea(name, Form.prep(value), attrs);
        return this._createElement(textarea);
    }

    createButton (value, name = '', type = 'button', attrs = {}, use_input = true, text = '') {
        var button;

        if(use_input) {
            if(!name) {
                name = Form.createId('form');
            }
            button = this.createInput(name, type, value, attrs);
        } else {
            button = new Button(type, name, value, attrs, text);
            button = button.render();
        }

        return button;
    }

    createSubmit (value, name = '', attrs = {}, use_input = false, text = 'Submit') {
        return this.createButton(value, name, 'submit', attrs, use_input, text);
    }

    createReset (value, name = '', attrs = {}, use_input = false, text = 'Reset') {
        return this.createButton(value, name, 'reset', attrs, use_input, text);
    }

    createImage (src, name = '', value = '', attrs = {}) {
        if(!attrs.src) attrs.src = src;
        var image = this.createInput(name, 'image', value, attrs);
        return image;
    }

    static prep (str) {
        if(typeof str !== 'string') return '';

        var map = {
            '&' : '&amp;',
            '<' : '&lt;',
            '>' : '&gt;',
            '"' : '&quot;',
            '\'' : '&apos;'
        };

        return str.replace ( /[&<>"']/g, function ( m )
        {
            return map[ m ];
        } );
    }

    static doChecked (val) {
        if(val) return 'checked="checked"';
    }

    static doDisabled (val) {
        if(val) return 'disabled="disabled"';
    }

    static doReadyOnly (val) {
        if(val) return 'readonly="readonly"';
    }

    static createId (name, length = 6) {
        const str = Math.random().toString(36).substr(2, length);
        return `${name}-${str}`;
    }

    static createAttrs (element, attrs) {
        // make sure element and attrs are object;
        if(typeof element !== 'object' || typeof attrs !== 'object') return;

        var only_key = ['required', 'readonly', 'disabled', 'checked'];
        for(var key in attrs) {
            let val = attrs[key];

            // key must be a string
            if(Number(key)) continue;

            // remove the id if blank
            if(key === 'id' && !val) {
                // this gets stripped out upon rendering if the id is blank so
                // we set it so if the value is FALSE
                element.id = '';
            }
            else if (val && typeof val === 'object') {
                // if class is not a string it must be an array
                if (key === 'class' && Array.isArray(val)) {
                    for(let name of val) {
                        element.classList.add(name);
                    }
                }
                // datasets must be a key/value pair
                else if(key === 'data' && !Array.isArray(val)) {
                    for(let key in val) {
                        let val2 = val[key];
                        if(val2 === true) {
                            element.dataset[key] = '';
                        }
                        else if(val2 !== '') {
                            element.dataset[key] = val2;
                        }
                    }
                }
            } else if (val !== '') {
                if(val === true && only_key.indexOf(key)) {
                    element[key];
                } else if (key === 'class') {
                    element.className = val;
                }
                else {
                    element[key] = val;
                }
            }
        }
    }

    _createElement(element) {
        return element.render();
    }
}
