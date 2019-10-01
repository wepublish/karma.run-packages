import React from 'react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {SidePanel, SidePanelHeader, SidePanelTitle} from './sidePanel'
import {useState} from '@storybook/addons'
import {OptionButton} from '../atoms/optionButton'
import {IconType} from '../atoms/icon'
import {Input} from '../atoms/input'
import {Dropdown} from '../atoms/dropdown'
import {ToggleWithLabel} from '../molecules/toggleWithLabel'

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
        <OptionButton icon={IconType.Add} onClick={() => setShowSidePanel(true)} />
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
  <SidePanel title={'Article meta data'} onClose={() => {}}>
    <Input value={''} placeholder={'SLUG URL'} onValueChange={() => {}} />
    <Dropdown
      value={''}
      label={'Author'}
      options={[{value: 'gabriel', name: 'Gabriel'}]}
      onValueChange={() => {}}
    />
    <Input value={''} label={'Tags'} placeholder={'Add tag'} onValueChange={() => {}} />
    <ToggleWithLabel
      label={'Share with peers'}
      description={'All peers can publish this article'}
      onSelectChange={() => {}}
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
    <Input value={''} placeholder={'Title'} description={'site title'} onValueChange={() => {}} />
    <Input
      value={''}
      placeholder={'Short description'}
      description={'Teaser test for indexing and social media'}
      onValueChange={() => {}}
    />

    <SidePanelTitle title={'Publish contorl'} />
    <Input
      value={''}
      placeholder={'Publish date'}
      description={'Set the publish date'}
      onValueChange={() => {}}
    />
  </SidePanel>
)
