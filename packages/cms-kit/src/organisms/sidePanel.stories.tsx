import React from 'react'
import {MaterialIconAdd} from '@karma.run/icons'

import {centerLayoutDecorator} from '../.storybook/decorators'
import {SidePanel, SidePanelTitle} from './sidePanel'
import {useState} from '@storybook/addons'
import {OptionButton} from '../atoms/optionButton'
import {TextInput} from '../atoms/textInput'
import {Dropdown} from '../atoms/dropdown'
import {Toggle} from '../atoms/toggle'

export default {
  component: SidePanel,
  title: 'Organisms|SidePanel',
  decorators: [centerLayoutDecorator()]
}

export const Empty = () => {
  const [showSidePanel, setShowSidePanel] = useState(true)

  return (
    <>
      {!showSidePanel && (
        <OptionButton icon={MaterialIconAdd} onClick={() => setShowSidePanel(true)} />
      )}
      {showSidePanel && (
        <SidePanel title={'Title'} onClose={() => setShowSidePanel(false)}>
          test
        </SidePanel>
      )}
    </>
  )
}

export const ArticleMetaData = () => (
  <SidePanel title={'Article'} onClose={() => {}}>
    <TextInput value={''} label={'Slug'} onChange={() => {}} />
    <Dropdown
      value={''}
      label={'Author'}
      options={[{value: 'gabriel', name: 'Gabriel'}]}
      onValueChange={() => {}}
    />
    <TextInput value={''} label={'Tags'} onChange={() => {}} />
    <Toggle
      label={'Share with peers'}
      description={'All peers can publish this article'}
      onChange={() => {}}
      checked={true}
    />

    <SidePanelTitle title={'Teaser options'} />
    <Dropdown
      value={''}
      label={'Teaser type'}
      options={[{value: 'default', name: 'Image & Title'}]}
      description={'Choose the teaser type for the pages and social media'}
      onValueChange={() => {}}
    />
    <TextInput value={''} label={'Title'} description={'site title'} onChange={() => {}} />
    <TextInput
      value={''}
      label={'Short description'}
      description={'Teaser test for indexing and social media'}
      onChange={() => {}}
    />

    <SidePanelTitle title={'Publish contorl'} />
    <TextInput
      value={''}
      label={'Publish date'}
      description={'Set the publish date'}
      onChange={() => {}}
    />
  </SidePanel>
)
