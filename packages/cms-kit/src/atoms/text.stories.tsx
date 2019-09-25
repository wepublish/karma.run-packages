import React from 'react'

import {centerLayoutDecorator, InfoBox} from '../.storybook/decorators'
import {
  FontSmall,
  FontMedium,
  FontFace,
  Heading1,
  Heading2,
  Heading3,
  FontExtraLarge,
  Label,
  Hint,
  Description
} from '../style/textStyles'

export default {
  component: Text,
  title: 'Atoms|Texts',
  decorators: [centerLayoutDecorator()]
}

export const Standard = () => (
  <>
    <div>
      <InfoBox infoText={'Small regular'} padding={10}>
        <FontSmall>{mockText}</FontSmall>
      </InfoBox>
      <InfoBox infoText={'Small italic'} padding={10}>
        <FontSmall fontFace={FontFace.Italic}>{mockText}</FontSmall>
      </InfoBox>
      <InfoBox infoText={'Small bold'} padding={10}>
        <FontSmall fontFace={FontFace.Bold}>{mockText}</FontSmall>
      </InfoBox>
      <InfoBox infoText={'Label'} padding={10}>
        <Label>{mockText}</Label>
      </InfoBox>
      <InfoBox infoText={'Description'} padding={10}>
        <Description>{mockText}</Description>
      </InfoBox>
      <InfoBox infoText={'Description italic'} padding={10}>
        <Description fontFace={FontFace.Italic}>{mockText}</Description>
      </InfoBox>
    </div>
    <div>
      <InfoBox infoText={'Medium regular'} padding={10}>
        <FontMedium>{mockText}</FontMedium>
      </InfoBox>
      <InfoBox infoText={'Medium bold'} padding={10}>
        <FontMedium fontFace={FontFace.Bold}>{mockText}</FontMedium>
      </InfoBox>
      <InfoBox infoText={'Hint'} padding={10}>
        <Hint>{mockText}</Hint>
      </InfoBox>
    </div>
    <div>
      <InfoBox infoText={'Heading1'} padding={10}>
        <Heading1>{mockText}</Heading1>
      </InfoBox>
      <InfoBox infoText={'Heading2'} padding={10}>
        <Heading2>{mockText}</Heading2>
      </InfoBox>
      <InfoBox infoText={'Heading3'} padding={10}>
        <Heading3>{mockText}</Heading3>
      </InfoBox>
    </div>
    <div>
      <InfoBox infoText={'ExtraLarge'} padding={10}>
        <FontExtraLarge>{mockText}</FontExtraLarge>
      </InfoBox>
    </div>
  </>
)

const mockText = 'Lorem ipsum'
