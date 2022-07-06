import React from 'react';
import styled from '@emotion/styled';

interface Props { }

export const Footer: React.FC<Props> = (props) => {

    const content = "The Genome Color System is a Color Tool for Design Systems. It was created to be Simple, Effective, Universal, Extensible, and WCAG Compliant. It's purpose is to help designers and engineers create brand-specific Color Systems from existing style-guides quickly and easily."

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
        font-size: 18px;
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

                    {content}

                </ContainerCenter>

                <ContainerRight>


                </ContainerRight>

            </Container>
        </Wrapper>
    )

}

export default Footer;