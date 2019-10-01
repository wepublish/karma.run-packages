import React from 'react'

import {Icon, IconType} from './icon'
import {centerLayoutDecorator, InfoBox, fontSizeDecorator} from '../.storybook/decorators'

export default {
  component: Icon,
  title: 'Atoms|Icon',
  decorators: [centerLayoutDecorator(), fontSizeDecorator(32)]
}

export const Base = () => (
  <>
    <InfoBox label={IconType.DropHere}>
      <Icon type={IconType.DropHere} />
    </InfoBox>
    <InfoBox label={IconType.Replace}>
      <Icon type={IconType.Replace} />
    </InfoBox>
    <InfoBox label={IconType.Archive}>
      <Icon type={IconType.Archive} />
    </InfoBox>
    <InfoBox label={IconType.ArrowLeft}>
      <Icon type={IconType.ArrowLeft} />
    </InfoBox>
    <InfoBox label={IconType.ArrowRight}>
      <Icon type={IconType.ArrowRight} />
    </InfoBox>
    <InfoBox label={IconType.Auto}>
      <Icon type={IconType.Auto} />
    </InfoBox>
    <InfoBox label={IconType.Add}>
      <Icon type={IconType.Add} />
    </InfoBox>
    <InfoBox label={IconType.ChevronDown}>
      <Icon type={IconType.ChevronDown} />
    </InfoBox>
    <InfoBox label={IconType.ChevronUp}>
      <Icon type={IconType.ChevronUp} />
    </InfoBox>
    <InfoBox label={IconType.ChevronLeft}>
      <Icon type={IconType.ChevronLeft} />
    </InfoBox>
    <InfoBox label={IconType.ChevronRight}>
      <Icon type={IconType.ChevronRight} />
    </InfoBox>
    <InfoBox label={IconType.Check}>
      <Icon type={IconType.Check} />
    </InfoBox>
    <InfoBox label={IconType.Close}>
      <Icon type={IconType.Close} />
    </InfoBox>
    <InfoBox label={IconType.Delete}>
      <Icon type={IconType.Delete} />
    </InfoBox>
    <InfoBox label={IconType.Description}>
      <Icon type={IconType.Description} />
    </InfoBox>
    <InfoBox label={IconType.Created}>
      <Icon type={IconType.Created} />
    </InfoBox>
    <InfoBox label={IconType.Filter}>
      <Icon type={IconType.Filter} />
    </InfoBox>
    <InfoBox label={IconType.Focus}>
      <Icon type={IconType.Focus} />
    </InfoBox>
    <InfoBox label={IconType.More}>
      <Icon type={IconType.More} />
    </InfoBox>
    <InfoBox label={IconType.Edit}>
      <Icon type={IconType.Edit} />
    </InfoBox>
    <InfoBox label={IconType.Preview}>
      <Icon type={IconType.Preview} />
    </InfoBox>
    <InfoBox label={IconType.Publish}>
      <Icon type={IconType.Publish} />
    </InfoBox>
    <InfoBox label={IconType.Save}>
      <Icon type={IconType.Save} />
    </InfoBox>
    <InfoBox label={IconType.Search}>
      <Icon type={IconType.Search} />
    </InfoBox>
    <InfoBox label={IconType.Update}>
      <Icon type={IconType.Update} />
    </InfoBox>
    <InfoBox label={IconType.Upload}>
      <Icon type={IconType.Upload} />
    </InfoBox>
    <InfoBox label={IconType.Favorite}>
      <Icon type={IconType.Favorite} />
    </InfoBox>
    <InfoBox label={IconType.Copy}>
      <Icon type={IconType.Copy} />
    </InfoBox>
  </>
)

export const Blocks = () => (
  <>
    <InfoBox label={IconType.Wave}>
      <Icon type={IconType.Wave} />
    </InfoBox>
    <InfoBox label={IconType.Column6}>
      <Icon type={IconType.Column6} />
    </InfoBox>
    <InfoBox label={IconType.Column4}>
      <Icon type={IconType.Column4} />
    </InfoBox>
    <InfoBox label={IconType.Column2Alt}>
      <Icon type={IconType.Column2Alt} />
    </InfoBox>
    <InfoBox label={IconType.Column2}>
      <Icon type={IconType.Column2} />
    </InfoBox>
    <InfoBox label={IconType.Column1}>
      <Icon type={IconType.Column1} />
    </InfoBox>
    <InfoBox label={IconType.Quote}>
      <Icon type={IconType.Quote} />
    </InfoBox>
    <InfoBox label={IconType.Image}>
      <Icon type={IconType.Image} />
    </InfoBox>
    <InfoBox label={IconType.Gallery}>
      <Icon type={IconType.Gallery} />
    </InfoBox>
    <InfoBox label={IconType.Text}>
      <Icon type={IconType.Text} />
    </InfoBox>
    <InfoBox label={IconType.Title}>
      <Icon type={IconType.Title} />
    </InfoBox>
    <InfoBox label={IconType.BreakingNews}>
      <Icon type={IconType.BreakingNews} />
    </InfoBox>
    <InfoBox label={IconType.Video}>
      <Icon type={IconType.Video} />
    </InfoBox>
    <InfoBox label={IconType.Teaser}>
      <Icon type={IconType.Teaser} />
    </InfoBox>
    <InfoBox label={IconType.Embed}>
      <Icon type={IconType.Embed} />
    </InfoBox>
  </>
)

export const Navigation = () => (
  <>
    <InfoBox label={IconType.Logout}>
      <Icon type={IconType.Logout} />
    </InfoBox>
    <InfoBox label={IconType.Menu}>
      <Icon type={IconType.Menu} />
    </InfoBox>
    <InfoBox label={IconType.Proofreading}>
      <Icon type={IconType.Proofreading} />
    </InfoBox>
    <InfoBox label={IconType.Article}>
      <Icon type={IconType.Article} />
    </InfoBox>
    <InfoBox label={IconType.Settings}>
      <Icon type={IconType.Settings} />
    </InfoBox>
    <InfoBox label={IconType.MediaLibrary}>
      <Icon type={IconType.MediaLibrary} />
    </InfoBox>
    <InfoBox label={IconType.Page}>
      <Icon type={IconType.Page} />
    </InfoBox>
  </>
)

export const TextEditor = () => (
  <>
    <InfoBox label={IconType.Italic}>
      <Icon type={IconType.Italic} />
    </InfoBox>
    <InfoBox label={IconType.H2}>
      <Icon type={IconType.H2} />
    </InfoBox>
    <InfoBox label={IconType.H3}>
      <Icon type={IconType.H3} />
    </InfoBox>
    <InfoBox label={IconType.ListSorted}>
      <Icon type={IconType.ListSorted} />
    </InfoBox>
    <InfoBox label={IconType.ListUnsorted}>
      <Icon type={IconType.ListUnsorted} />
    </InfoBox>
    <InfoBox label={IconType.Striked}>
      <Icon type={IconType.Striked} />
    </InfoBox>
    <InfoBox label={IconType.Underline}>
      <Icon type={IconType.Underline} />
    </InfoBox>
    <InfoBox label={IconType.Bold}>
      <Icon type={IconType.Bold} />
    </InfoBox>
    <InfoBox label={IconType.Link}>
      <Icon type={IconType.Link} />
    </InfoBox>
  </>
)
