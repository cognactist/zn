import { FormBase} from '../../../header-form/form-base';

export class TextareaBase extends FormBase<string> {
  controlType = 'textarea';
  maxlength:Number;
  constructor(options: {} = {}) {
    super(options);
    this.maxlength = options['maxlength'];
  }
}

