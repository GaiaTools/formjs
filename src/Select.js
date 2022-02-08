import Form from './Form';

export default class Select {
    constructor(name, options, value = '', attrs = {}, first_option = '', disabled = []) {
        this.name = name;
        this.options = options;
        this.value = value;
        this.attrs = attrs;
        this.first_option = first_option;
        this.disabled = disabled;
    }

    render () {
        var select = document.createElement('select');
        var id = '';

        if(!this.attrs.hasOwnProperty('id')) {
            id = Form.createId('form');
        }
        Form.createAttrs(select, this.attrs);
        select.id = id;
        select.name = this.name;
        if(this.first_option) {
            if(typeof this.first_option === 'object' && !Array.isArray(this.first_option)) {
                for(let key in this.first_option) {
                    let val = this.first_option[key];
                    let option = select.appendChild(document.createElement('option'));
                    option.value = val;
                    option.label = key;
                    option.textContent = key;
                }
            } else {
                let option = select.appendChild(document.createElement('option'));
                let formprep = Form.prep(this.first_option);
                option.value = '';
                option.label = formprep;
                option.textContent = formprep;
            }
        }
        if(this.options && typeof this.options === 'object' && !Array.isArray(this.options)) {
            for(let key in this.options) {
                let val = this.options[key];
                if(Array.isArray(val)) {
                    let optgroup = select.appendChild(document.createElement('optgroup'));
                    optgroup.label = key;
                    for(var key2 in val[key]) {
                        var val2 = val[key][key2];
                        optgroup.appendChild(this._writeOptions(key2, val2));
                    }
                } else {
                    select.appendChild(this._writeOptions(key, val));
                }
            }
        }
        return select;
    }

    _writeOptions (key, val) {
        var option = document.createElement('option');

        option.value = Form.prep(val);
        option.label = Form.prep(key);
        option.textContent = Form.prep(key);

        if(this.value) {
            if(Array.isArray(this.value)) {
                for(let i = 0; i < this.value.length; i++) {
                    let s_val = this.value[i];

                    if(key === s_val) {
                        option.selected = true;
                    }
                    break;
                }
            }
            else {
                if(val === this.value && !this._selected_already) {
                    option.selected= true;
                    this._selected_already = true;
                }
            }
        }

        if(Array.isArray(this.disabled) && this.disabled.indexOf(key) !== -1) option.disabled = true;
        return option;
    }
}
