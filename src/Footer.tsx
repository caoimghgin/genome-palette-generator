import React from 'react';
import styled from '@emotion/styled';

interface Props { }

export const Footer: React.FC<Props> = (props) => {

    const Wrapper = styled.div`
        background-color: #17324c;
        color: #FFFFFF;
        width: 100%;
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
                <ContainerLeft/>
                <ContainerCenter>
                    <StyledContent>

                        <b>Genome Color Space</b> is an <b>Open-Source Color Tool for Color Systems.</b> It was created to be <b>Simple, Effective, Universal, Extensible,</b> and <b>WCAG Compliant</b>.
                        Its purpose is to help designers create brand-specific Color Systems from existing style-guides and easily facilitate white-labeling at scale.

                        <p> <b>Genome is Color System Agnostic</b> which allows the user to choose Color Systems such as <b>IBM Carbon</b>, <b>SalesForce</b>, <b>Lyft</b>, and more.
                            In fact, Genome is a handy tool to make your own.</p>

                        <p>To import the results of this tool into your design application, <b>you'll want to download a plugin.</b> Today, a Figma plugin is available but I'll write for AdobeXD and even Sketch in the future. </p>

                        <p><b>DISCLAIMER:</b> The Genome Color Tool<b> IS NOT AFFILIATED</b> with any Design System, Color System or larger organization. Unless otherwise noted, all results are soley the <b>research</b> and <b>opinions </b> of myself.
                            Personally speaking, Genome is the result of <b>amazingly good research</b> and <b>very fine opinions</b>, but you can be the judge of that.
                        </p>

                    </StyledContent>
                </ContainerCenter>
                <ContainerRight/>
            </Container>
        </Wrapper>
    )

}

export default Footer;