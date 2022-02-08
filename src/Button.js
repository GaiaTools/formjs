import Form from './Form';

export default class Button {
    constructor(type, name, value = '', attrs = {}, text = '') {
        this.type = type;
        this.name = name;
        this.value = value;
        this.attrs = attrs;
        this.text = text;
    }

    render () {
        let button = document.createElement('button');
        let id = '';

        if(!this.attrs.hasOwnProperty('id')) {
            id = Form.createId('form');
        }
        Form.createAttrs(button, this.attrs);
        button.id = id;
        button.type = this.type;
        button.name = this.name;
        button.value = this.value;
        button.textContent = this.text || this.value;

        return button;
    }
}
