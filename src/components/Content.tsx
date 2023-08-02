import React from "react";
import styled from "styled-components";

const ContentWrapper = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

const Content = () => {
  return (
    <ContentWrapper>
      <Title>Welcome to Our Website!</Title>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel
        vestibulum nunc, vitae euismod nisi. Vestibulum pellentesque, nisi vel
        scelerisque lacinia, lorem mauris vulputate velit, id tristique urna
        ligula id odio. Sed laoreet ante ut ipsum elementum, eu consectetur
        mauris congue. Sed feugiat lectus et magna maximus, ac vestibulum odio
        consequat. Integer consectetur sagittis dolor eu interdum. Fusce a
        pellentesque dui. Sed tincidunt mi a elementum tempus.
      </Paragraph>
    </ContentWrapper>
  );
};

export default Content;
