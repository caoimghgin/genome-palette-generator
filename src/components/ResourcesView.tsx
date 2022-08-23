import React, { useState, useEffect } from 'react';
// import styled from '@emotion/styled/macro'
import styled from '@emotion/styled'
import logoUXCollectiveImage from './../resources/logo-uxcollective.png';
import pluginImage from './../resources/plugin.png';
import openSourceImage from './../resources/openSourceImage.png';
import linkedInImage from './../resources/linkedInImage.png';
import twitterLogoImage from './../resources/twitterLogoImage.png';
import portfolioImage from './../resources/portfolioImage.png';
import githubLogoImage from './../resources/githubLogoImage.png';

export const ResourcesView: React.FC = () => {

    const handleOnClick = (event: React.MouseEvent<HTMLInputElement>) => {
       let value = event.currentTarget.value
        event.preventDefault();
        window.open(value);
    }

    const ModalContainer = styled.div`
        width: 360px;
        background-color: #ffffff;
        color: #000000;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        border-radius: 8px;
        padding: 4px 24px 24px 24px;
    `

    //     How should you name your colors in a Design System?
    // Definitive, Semantic, and Contextual naming conventions

    return (
        <ModalContainer>

            <h3> Articles </h3>
            <hr/>
            <ResourcesViewTabelCell 
                title={"The Genome Color Tool (2022)"} 
                link={"https://uxdesign.cc/the-genome-color-tool-28ce73b20768"}
                icon={logoUXCollectiveImage}
            />

            <ResourcesViewTabelCell 
                title={"How to name your colors in a Design System (2022)"} 
                link={"https://medium.com/user-experience-design-1/how-should-you-name-your-colors-in-a-design-system-3086513476df"}
                icon={logoUXCollectiveImage}
            />

            <ResourcesViewTabelCell 
                title={"Applying game design logic to your design system (2021)"} 
                link={"https://uxdesign.cc/applying-game-design-logic-to-your-design-system-111a2116509"}
                icon={logoUXCollectiveImage}

            />            

            {/* <h3> Plugins </h3>
            <hr/>
            <ResourcesViewTabelCell 
                title={"Import for Figma"}
                link={"https://www.google.com/"}
                icon={pluginImage}
                disabled={true}
            />
            <ResourcesViewTabelCell 
                title={"Import for Sketch"}
                link={"https://www.google.com/"}
                icon={pluginImage}
                disabled={true}
            />
            <ResourcesViewTabelCell 
                title={"Import for AdobeXD"}
                link={"https://www.google.com/"}
                icon={pluginImage}
                disabled={true}

            /> */}

            <h3> GitHub </h3> 
            <hr/>
            <ResourcesViewTabelCell 
                title={"Genome Web"}
                link={"https://github.com/caoimghgin/genome"}
                icon={githubLogoImage}
            />
            <ResourcesViewTabelCell 
                title={"Genome Figma Importer"}
                link={"https://github.com/caoimghgin/genome-import-figma"}
                icon={githubLogoImage}
            />

            <h3> Contact </h3>
            <hr/>
            <ResourcesViewTabelCell 
                title={"LinkedIn"}
                link={"https://www.linkedin.com/in/kevinrmuldoon/"}
                icon={linkedInImage}

            />
            <ResourcesViewTabelCell 
                title={"Twitter"}
                link={"https://twitter.com/caoimghgin"}
                icon={twitterLogoImage}
            />
            <ResourcesViewTabelCell 
                title={"My Portfolio"}
                link={"https://uxfol.io/kmuldoon"}
                icon={portfolioImage}

            />

        </ModalContainer>
    )
}

export default ResourcesView;

interface IResourcesViewTabelCell {
    title: String
    subtitle?: String
    icon?: string,
    link?: string,
    disabled?: boolean
    action?: (arg: string[]) => void
}

const ResourcesViewTabelCell: React.FC<IResourcesViewTabelCell> = ({icon, title, subtitle, link, disabled} : IResourcesViewTabelCell) => {

    const [image, setImage] = React.useState(icon)

    useEffect(() => {
        // initColumnIndex()
        // let columnIndex = localStorage.getItem('columnIndex') as string
        // let index = parseInt(columnIndex) + 1
        // setColumn(columns[index])

        // localStorage.setItem('columnIndex', index.toString())
        // localStorage.setItem(columns[index], model.semantic)

    }, []);

    const View = styled.div`
        display: flex;
        height: 44px;
        gap: 12px;
        padding-bottom: 8px;
    `
    const Content = styled.div`
        display: flex;
        width: 360px;
        /* background-color: green; */
        align-items: center;
    `
    const LeftAccessory = styled.div`
        display: flex;
        width: 44px;
        justify-content: center;
        align-items: center;
        object-fit: contain;

        /* logoUXCollective */
        /* background-color: red */
    `    
    const RightAccessory = styled.div`
        display: flex;
        justify-content:flex-end; 
        align-items: center;
        width: 100px;
        /* background-color: blue */
    `    

    const Button = styled.button`
        height: 20px;
    `  

const handleOnClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    window.open(link);
    console.log()
}

    return (
        <View>
            <LeftAccessory>
            <img src={icon} className="logoUXCollective" alt="logo" />
            </LeftAccessory>
            <Content>
                <b>{title}</b>
            </Content>
            <RightAccessory>

            <form>
                <input type="button" value="Open" onClick={handleOnClick} disabled={disabled} /> 
            </form>

            {/* <button onclick="location.href='http://www.example.com'" type="button">
         www.example.com</button> */}
                {/* <a href={(link ? link: "")} target="_parent"><button>Open</button></a> */}
                {/* <Button>Open</Button> */}
            </RightAccessory>
        </View>
    )
}