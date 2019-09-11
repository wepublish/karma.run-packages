import React from 'react'

import {storiesOf} from '@storybook/react'
import {Icon, IconType} from './icon'

import {centerLayoutDecorator, fontSizeDecorator} from '../.storybook/decorators'

storiesOf('Atoms|Icon/Base', module)
  .addDecorator(fontSizeDecorator(20))
  .addDecorator(centerLayoutDecorator())
  .add('Base', () => (
    <>
      <Icon type={IconType.DropHere} />
      <Icon type={IconType.Replace} />
      <Icon type={IconType.Archive} />
      <Icon type={IconType.ArrowLeft} />
      <Icon type={IconType.Auto} />
      <Icon type={IconType.Add} />
      <Icon type={IconType.ChevronDown} />
      <Icon type={IconType.ChevronUp} />
      <Icon type={IconType.ChevronLeft} />
      <Icon type={IconType.ChevronRight} />
      <Icon type={IconType.Check} />
      <Icon type={IconType.Close} />
      <Icon type={IconType.Delete} />
      <Icon type={IconType.Description} />
      <Icon type={IconType.Created} />
      <Icon type={IconType.Filter} />
      <Icon type={IconType.Forward} />
      <Icon type={IconType.Focus} />
      <Icon type={IconType.More} />
      <Icon type={IconType.Edit} />
      <Icon type={IconType.Preview} />
      <Icon type={IconType.Publish} />
      <Icon type={IconType.Save} />
      <Icon type={IconType.Search} />
      <Icon type={IconType.Update} />
      <Icon type={IconType.Upload} />
      <Icon type={IconType.Favorite} />
      <Icon type={IconType.Copy} />
    </>
  ))
  .add('Blocks', () => (
    <>
      <Icon type={IconType.Wave} />
      <Icon type={IconType.Column6} />
      <Icon type={IconType.Column4} />
      <Icon type={IconType.Column2Alt} />
      <Icon type={IconType.Column2} />
      <Icon type={IconType.Column1} />
      <Icon type={IconType.Quote} />
      <Icon type={IconType.Image} />
      <Icon type={IconType.Gallery} />
      <Icon type={IconType.Text} />
      <Icon type={IconType.Title} />
      <Icon type={IconType.BreakingNews} />
      <Icon type={IconType.Video} />
      <Icon type={IconType.Teaser} />
      <Icon type={IconType.Embed} />
    </>
  ))
  .add('Navigation', () => (
    <>
      <Icon type={IconType.Logout} />
      <Icon type={IconType.Menu} />
      <Icon type={IconType.Proofreading} />
      <Icon type={IconType.Article} />
      <Icon type={IconType.Settings} />
      <Icon type={IconType.MediaLibrary} />
      <Icon type={IconType.Page} />
    </>
  ))
  .add('Texteditor', () => (
    <>
      <Icon type={IconType.Italic} />
      <Icon type={IconType.H2} />
      <Icon type={IconType.H3} />
      <Icon type={IconType.ListSorted} />
      <Icon type={IconType.ListUnsorted} />
      <Icon type={IconType.Striked} />
      <Icon type={IconType.Underline} />
      <Icon type={IconType.Bold} />
      <Icon type={IconType.Link} />
    </>
  ))
