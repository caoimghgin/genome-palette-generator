import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

interface Props {
    content: string;
    children?:
    | React.ReactChild
    | React.ReactChild[];

}

export const Tooltip: React.FC<Props> = (props: Props) => {

    const [active, setActive] = useState(false);

    const showTip = () => {
        setActive(true);
    };

    const hideTip = () => {
        setActive(false);
    };

    const Wrapper = styled.div`
        display: inline-block;
        position: relative;
  `;

    const Contents = styled.div`
        position: absolute;
        border-radius: 4px;
        left: 50%;
        transform: translateX(-50%);
        padding: 6px;
        color: white;
        background: black;
        font-size: 14px;
        font-family: sans-serif;
        line-height: 1;
        z-index: 100;
        white-space: nowrap;
    `;

    return (
        <Wrapper
            onMouseEnter={showTip}
            onMouseLeave={hideTip} >
            {props.children}
            {active && (
                <Contents>
                    {props.content}
                </Contents>
            )}
        </Wrapper>
    )

}

export default Tooltip;