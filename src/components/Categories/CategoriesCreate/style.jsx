import styled from "@emotion/styled";
import ButtonMUI from "@mui/material/Button";
import TextFieldMUI from "@mui/material/TextField";
import AlertMUI from "@mui/material/Alert";
import SnackbarMUI from "@mui/material/Snackbar";

export const Button = styled(ButtonMUI)`
  margin-top: 32px;
  width: 192px;
  height: 48px;
  margin-bottom: 48px;
`;

export const TextField = styled(TextFieldMUI)`
  width: 360px;
  height: 56px;
  border-radius: 1px;
`;

export const H1 = styled.h2``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 10px;
  /* border: 1px solid #212121; */
  width: 448px;
  height: 3366;
  min-width: 400px;
  border-radius: 16px;
  /* box-shadow: 0px 0px 10px 2px #212121; */
`;

export const Alert = styled(AlertMUI)``;

export const Snackbar = styled(SnackbarMUI)``;

export const Title = styled.div`
  align-items: center;
  margin: 32px 0;
`;
