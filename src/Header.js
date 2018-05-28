// @flow

import React from 'react';
import styled from 'styled-components';
import {TEXT_DARK} from './util/colors';

const HeaderInner = styled.div`
  padding: 16px;
`

const Title = styled.h1`
  font-size: 48px;
  color: ${TEXT_DARK}
  margin: 0 8px 0 0;
`;
const Small = styled.p`
  font-size: 24px;
  margin: 0;
`;

const Header = () => <HeaderInner>
  <Title>aurora</Title>
  <Small>sound synthesis in your browser</Small>
</HeaderInner>

export default Header;
