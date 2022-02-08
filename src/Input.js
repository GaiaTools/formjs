import Form from './Form';

export default class Input {
    constructor(type, name, value = '', attrs = {}) {
        this.type = type.toLowerCase();
        this.name = name;
        this.value = value;
        this.attrs = attrs;
    }

    render () {
        var input = document.createElement('input');
        var name, id = '';

        if(!this.attrs.hasOwnProperty('id')) {
            name = Form.createId('form');
            id = this.type === 'radio' ? this.value.replace(' ', '_') : name;
        }
        Form.createAttrs(input, this.attrs);
        if(input.id === '') input.removeAttribute('id');
        input.id = id;
        input.type = this.type;
        input.name = this.name;
        input.value = this.value;

        Form.createAttrs(input, this.attrs);
        return input;
    }
}
