import React from 'react';

type FormErrProps = {
  msg: string;
};

function FormErr({ msg }: FormErrProps) {
  return (
    <div data-cy="formErrTextBox" style={{ color: 'red' }}>
      송금액이 바르지 않습니다. {msg}
    </div>
  );
}

export default FormErr;
