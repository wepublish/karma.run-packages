import React from 'react'

import {storiesOf} from '@storybook/react'
import {Icon, IconType} from './icon'

import {centerLayoutDecorator, fontSizeDecorator, InfoBox} from '../.storybook/decorators'

storiesOf('Atoms|Icon/Base', module)
  .addDecorator(fontSizeDecorator(32))
  .addDecorator(centerLayoutDecorator())
  .add('Base', () => (
    <>
      <InfoBox infoText={IconType.DropHere}>
        <Icon type={IconType.DropHere} />
      </InfoBox>
      <InfoBox infoText={IconType.Replace}>
        <Icon type={IconType.Replace} />
      </InfoBox>
      <InfoBox infoText={IconType.Archive}>
        <Icon type={IconType.Archive} />
      </InfoBox>
      <InfoBox infoText={IconType.ArrowLeft}>
        <Icon type={IconType.ArrowLeft} />
      </InfoBox>
      <InfoBox infoText={IconType.Auto}>
        <Icon type={IconType.Auto} />
      </InfoBox>
      <InfoBox infoText={IconType.Add}>
        <Icon type={IconType.Add} />
      </InfoBox>
      <InfoBox infoText={IconType.ChevronDown}>
        <Icon type={IconType.ChevronDown} />
      </InfoBox>
      <InfoBox infoText={IconType.ChevronUp}>
        <Icon type={IconType.ChevronUp} />
      </InfoBox>
      <InfoBox infoText={IconType.ChevronLeft}>
        <Icon type={IconType.ChevronLeft} />
      </InfoBox>
      <InfoBox infoText={IconType.ChevronRight}>
        <Icon type={IconType.ChevronRight} />
      </InfoBox>
      <InfoBox infoText={IconType.Check}>
        <Icon type={IconType.Check} />
      </InfoBox>
      <InfoBox infoText={IconType.Close}>
        <Icon type={IconType.Close} />
      </InfoBox>
      <InfoBox infoText={IconType.Delete}>
        <Icon type={IconType.Delete} />
      </InfoBox>
      <InfoBox infoText={IconType.Description}>
        <Icon type={IconType.Description} />
      </InfoBox>
      <InfoBox infoText={IconType.Created}>
        <Icon type={IconType.Created} />
      </InfoBox>
      <InfoBox infoText={IconType.Filter}>
        <Icon type={IconType.Filter} />
      </InfoBox>
      <InfoBox infoText={IconType.Forward}>
        <Icon type={IconType.Forward} />
      </InfoBox>
      <InfoBox infoText={IconType.Focus}>
        <Icon type={IconType.Focus} />
      </InfoBox>
      <InfoBox infoText={IconType.More}>
        <Icon type={IconType.More} />
      </InfoBox>
      <InfoBox infoText={IconType.Edit}>
        <Icon type={IconType.Edit} />
      </InfoBox>
      <InfoBox infoText={IconType.Preview}>
        <Icon type={IconType.Preview} />
      </InfoBox>
      <InfoBox infoText={IconType.Publish}>
        <Icon type={IconType.Publish} />
      </InfoBox>
      <InfoBox infoText={IconType.Save}>
        <Icon type={IconType.Save} />
      </InfoBox>
      <InfoBox infoText={IconType.Search}>
        <Icon type={IconType.Search} />
      </InfoBox>
      <InfoBox infoText={IconType.Update}>
        <Icon type={IconType.Update} />
      </InfoBox>
      <InfoBox infoText={IconType.Upload}>
        <Icon type={IconType.Upload} />
      </InfoBox>
      <InfoBox infoText={IconType.Favorite}>
        <Icon type={IconType.Favorite} />
      </InfoBox>
      <InfoBox infoText={IconType.Copy}>
        <Icon type={IconType.Copy} />
      </InfoBox>
    </>
  ))
  .add('Blocks', () => (
    <>
      <InfoBox infoText={IconType.Wave}>
        <Icon type={IconType.Wave} />
      </InfoBox>
      <InfoBox infoText={IconType.Column6}>
        <Icon type={IconType.Column6} />
      </InfoBox>
      <InfoBox infoText={IconType.Column4}>
        <Icon type={IconType.Column4} />
      </InfoBox>
      <InfoBox infoText={IconType.Column2Alt}>
        <Icon type={IconType.Column2Alt} />
      </InfoBox>
      <InfoBox infoText={IconType.Column2}>
        <Icon type={IconType.Column2} />
      </InfoBox>
      <InfoBox infoText={IconType.Column1}>
        <Icon type={IconType.Column1} />
      </InfoBox>
      <InfoBox infoText={IconType.Quote}>
        <Icon type={IconType.Quote} />
      </InfoBox>
      <InfoBox infoText={IconType.Image}>
        <Icon type={IconType.Image} />
      </InfoBox>
      <InfoBox infoText={IconType.Gallery}>
        <Icon type={IconType.Gallery} />
      </InfoBox>
      <InfoBox infoText={IconType.Text}>
        <Icon type={IconType.Text} />
      </InfoBox>
      <InfoBox infoText={IconType.Title}>
        <Icon type={IconType.Title} />
      </InfoBox>
      <InfoBox infoText={IconType.BreakingNews}>
        <Icon type={IconType.BreakingNews} />
      </InfoBox>
      <InfoBox infoText={IconType.Video}>
        <Icon type={IconType.Video} />
      </InfoBox>
      <InfoBox infoText={IconType.Teaser}>
        <Icon type={IconType.Teaser} />
      </InfoBox>
      <InfoBox infoText={IconType.Embed}>
        <Icon type={IconType.Embed} />
      </InfoBox>
    </>
  ))
  .add('Navigation', () => (
    <>
      <InfoBox infoText={IconType.Logout}>
        <Icon type={IconType.Logout} />
      </InfoBox>
      <InfoBox infoText={IconType.Menu}>
        <Icon type={IconType.Menu} />
      </InfoBox>
      <InfoBox infoText={IconType.Proofreading}>
        <Icon type={IconType.Proofreading} />
      </InfoBox>
      <InfoBox infoText={IconType.Article}>
        <Icon type={IconType.Article} />
      </InfoBox>
      <InfoBox infoText={IconType.Settings}>
        <Icon type={IconType.Settings} />
      </InfoBox>
      <InfoBox infoText={IconType.MediaLibrary}>
        <Icon type={IconType.MediaLibrary} />
      </InfoBox>
      <InfoBox infoText={IconType.Page}>
        <Icon type={IconType.Page} />
      </InfoBox>
    </>
  ))
  .add('Texteditor', () => (
    <>
      <InfoBox infoText={IconType.Italic}>
        <Icon type={IconType.Italic} />
      </InfoBox>
      <InfoBox infoText={IconType.H2}>
        <Icon type={IconType.H2} />
      </InfoBox>
      <InfoBox infoText={IconType.H3}>
        <Icon type={IconType.H3} />
      </InfoBox>
      <InfoBox infoText={IconType.ListSorted}>
        <Icon type={IconType.ListSorted} />
      </InfoBox>
      <InfoBox infoText={IconType.ListUnsorted}>
        <Icon type={IconType.ListUnsorted} />
      </InfoBox>
      <InfoBox infoText={IconType.Striked}>
        <Icon type={IconType.Striked} />
      </InfoBox>
      <InfoBox infoText={IconType.Underline}>
        <Icon type={IconType.Underline} />
      </InfoBox>
      <InfoBox infoText={IconType.Bold}>
        <Icon type={IconType.Bold} />
      </InfoBox>
      <InfoBox infoText={IconType.Link}>
        <Icon type={IconType.Link} />
      </InfoBox>
    </>
  ))
