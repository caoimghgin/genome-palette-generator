import React from 'react';
import styled from '@emotion/styled';

interface Props { }

export const Footer: React.FC<Props> = (props) => {


    const lorumIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis lobortis erat, in mattis leo. Phasellus vel enim vitae augue mollis laoreet. Praesent aliquet, sapien et ullamcorper aliquet, lorem justo fringilla ligula, fermentum mollis magna nunc tristique enim. Cras iaculis leo ac mauris viverra, id consequat ex semper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Donec sit amet est non mauris elementum eleifend. Fusce a egestas libero. Nullam laoreet, sapien molestie faucibus ultricies, eros ligula mattis lacus, et ultricies massa diam sed quam. Quisque eget luctus risus, sit amet lacinia metus. Sed ut ipsum quis turpis euismod suscipit ac ac lacus. \r Suspendisse auctor ex et dictum consequat. Donec magna lacus, maximus et congue eu, fringilla vitae urna. Ut accumsan orci sed nunc fringilla maximus. Praesent lobortis libero urna, nec auctor turpis tincidunt et. Mauris scelerisque tempus mauris, eu iaculis dui interdum quis. Cras dictum mi sed vulputate hendrerit. Maecenas imperdiet lectus ac lacus malesuada, ut imperdiet orci tristique. Phasellus nec augue enim. Fusce rutrum mi id felis dignissim molestie. Ut condimentum pharetra molestie. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In tincidunt viverra arcu, at pharetra ipsum posuere eu. Morbi sit amet erat vestibulum, placerat eros ac, posuere leo. Duis nulla leo, ultrices non congue sed, pretium eu erat."

    const Wrapper = styled.div`
        background-color: #17324c;
        color: #FFFFFF;
        width: 100%;
        height: 400px;
`;

    const Container = styled.div`
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        align-self: center;
        align-items: center;
        justify-content: center;
`;

const ContainerLeft = styled.div`
  grid-row: 1 / 4;
  grid-column: 1 / 2;
  display: flex;
  justify-content: left;
  align-items: center;
    padding-left: 44px;
`;

const ContainerCenter = styled.div`
  grid-row: 1 / 4;
  grid-column: 2 / 3;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const ContainerRight = styled.div`
  grid-row: 1 / 4;
  grid-column: 3 / 4;
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 44px;

`;

    return (

        <Wrapper>

            <Container>
                <ContainerLeft>
                    
                </ContainerLeft>

                <ContainerCenter>
                    
                {lorumIpsum}

                     </ContainerCenter>
        
                <ContainerRight>
                    

                </ContainerRight>

            </Container>
        </Wrapper>
    )

}

export default Footer;