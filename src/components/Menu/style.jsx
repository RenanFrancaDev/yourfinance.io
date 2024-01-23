import styled from "@emotion/styled";
import TypographyMUI from "@mui/material/Typography";
import LinkNEXT from "next/link";

export const Typography = styled(TypographyMUI)`
  margin-top: 48px;
  margin-bottom: 40px;
  text-size-adjust: 32px;
  text-align: center;
`;

export const Link = styled(LinkNEXT)`
  text-decoration: none;
  color: inherit;
`;
