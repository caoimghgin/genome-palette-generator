import React from 'react';
import styled from '@emotion/styled';

interface Props { }

export const Footer: React.FC<Props> = (props) => {

    const content = "The Genome Color System is a Color Tool for Design Systems. It was created to be Simple, Effective, Universal, Extensible, and WCAG Compliant. It's purpose is to help designers and engineers create brand-specific Color Systems from existing style-guides quickly and easily."

    const Wrapper = styled.div`
        background-color: #17324c;
        color: #FFFFFF;
        width: 100%;
        /* height: 400px; */
`;

    const Container = styled.div`
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: 1fr 50% 1fr;
        grid-template-rows: 1fr;
        align-self: center;
        align-items: center;
        justify-content: center;
        padding: 64px;
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
        justify-content: left;
        align-items: left;
`;

    const ContainerRight = styled.div`
        grid-row: 1 / 4;
        grid-column: 3 / 4;
        display: flex;
        justify-content: right;
        align-items: center;
        padding-right: 44px;
`;

const StyledContent = styled.p`
        font-size: 18px;
        line-height: 32px;
        text-align: left;
        padding-right: 24px;
`;

    return (

        <Wrapper>

            <Container>
                <ContainerLeft>

                </ContainerLeft>

                <ContainerCenter>

                   <StyledContent>
                    <b>Genome Color Space</b> is an <b>Open-Source Color Tool for Color Systems.</b> It was created to be <b>Simple, Effective, Universal, Extensible,</b> and <b>WCAG Compliant</b>. 
                   Its purpose is to help designers create brand-specific Color Systems from existing style-guides and easily facilitate white-labeling at scale.
                   <p>Genome is <b>Color System Agnostic</b>, allowing the user to choose <b>Material Design</b>, <b>IBM Carbon</b>, <b>SalesForce</b>, <b>Lyft</b>, and many more.
                   Genome <b> is not affiliated</b> with any Design System or organization. Therefore, the results are informed by my <b>personal research</b>  and (<i>hopefully, well informed</i>) <b>opinions </b> 
                   </p>
                   <p>To easily import the results of this tool into your design application, you'll want to download a plugin. Today, a Figma plugin is available but I'll write for AdobeXD and even Sketch in the future. </p>

                   </StyledContent>

   

                </ContainerCenter>

                <ContainerRight>


                </ContainerRight>

            </Container>
        </Wrapper>
    )

}

export default Footer;