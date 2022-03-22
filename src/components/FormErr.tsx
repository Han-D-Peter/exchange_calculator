import React from 'react';
import styled from 'styled-components';

type FormErrProps = {
  msg: string;
};

const ErrorMsg = styled.div`
  color: red;
`;

function FormErr({ msg }: FormErrProps) {
  return (
    <>
      <ErrorMsg>송금액이 바르지 않습니다. {msg}</ErrorMsg>
    </>
  );
}

export default FormErr;
