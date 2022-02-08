import Form from './Form';

export default class Textarea {
    constructor(name, value, attrs = {}) {
        this.name = name;
        this.value = value;
        this.attrs = attrs;
    }

    render () {
        var textarea = document.createElement('textarea');
        var id = '';
        if(!this.attrs.hasOwnProperty('id')) {
            id = Form.createId('form');
        }

        if(!this.attrs.hasOwnProperty('rows')) {
            textarea.rows = 10;
        }

        if(!this.attrs.hasOwnProperty('rows')) {
            textarea.cols = 40;
        }

        Form.createAttrs(textarea, this.attrs);

        if(!textarea.id) textarea.id = id;
        textarea.name = this.name;
        textarea.value = this.value;

        return textarea;
    }
}
