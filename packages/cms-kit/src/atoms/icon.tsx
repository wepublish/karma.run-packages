import React from 'react'

import {DropHereIconSVG} from '../icons/dropHere'
import {ReplaceIconSVG} from '../icons/replace'
import {AddIconSVG} from '../icons/add'
import {ArchiveIconSVG} from '../icons/archive'
import {ArrowLeftIconSVG} from '../icons/arrowLeft'
import {ArticleIconSVG} from '../icons/article'
import {AutoIconSVG} from '../icons/auto'
import {BoldIconSVG} from '../icons/bold'
import {BreakingNewsIconSVG} from '../icons/breakingNews'
import {CheckIconSVG} from '../icons/check'
import {ChevronDownIconSVG} from '../icons/chevronDown'
import {ChevronRightIconSVG} from '../icons/chevronRight'
import {ChevronLeftIconSVG} from '../icons/chevronLeft'
import {ChevronUpIconSVG} from '../icons/chevronUp'
import {CloseIconSVG} from '../icons/close'
import {Column1IconSVG} from '../icons/column1'
import {Column2IconSVG} from '../icons/column2'
import {Column2AltIconSVG} from '../icons/column2Alt'
import {Column4IconSVG} from '../icons/column4'
import {Column6IconSVG} from '../icons/column6'
import {CopyIconSVG} from '../icons/copy'
import {CreatedIconSVG} from '../icons/created'
import {DeleteIconSVG} from '../icons/delete'
import {DescriptionIconSVG} from '../icons/description'
import {EditIconSVG} from '../icons/edit'
import {EmbedIconSVG} from '../icons/embed'
import {FavoriteIconSVG} from '../icons/favorite'
import {FilterIconSVG} from '../icons/filter'
import {FocusIconSVG} from '../icons/focus'
import {ForwardIconSVG} from '../icons/forward'
import {GalleryIconSVG} from '../icons/gallery'
import {H2IconSVG} from '../icons/h2'
import {H3IconSVG} from '../icons/h3'
import {ImageIconSVG} from '../icons/image'
import {ItalicIconSVG} from '../icons/italic'
import {LinkIconSVG} from '../icons/link'
import {ListSortedIconSVG} from '../icons/listSorted'
import {ListUnsortedIconSVG} from '../icons/listUnsorted'
import {LogoutIconSVG} from '../icons/logout'
import {MediaLibraryIconSVG} from '../icons/mediaLibrary'
import {MenuIconSVG} from '../icons/menu'
import {MoreIconSVG} from '../icons/more'
import {PageIconSVG} from '../icons/page'
import {PreviewIconSVG} from '../icons/preview'
import {ProofreadingIconSVG} from '../icons/proofreading'
import {PublishIconSVG} from '../icons/publish'
import {QuoteIconSVG} from '../icons/quote'
import {SaveIconSVG} from '../icons/save'
import {SearchIconSVG} from '../icons/search'
import {SettingsIconSVG} from '../icons/settings'
import {StrikedIconSVG} from '../icons/striked'
import {TeaserIconSVG} from '../icons/teaser'
import {TextIconSVG} from '../icons/text'
import {TitleIconSVG} from '../icons/title'
import {UnderlineIconSVG} from '../icons/underline'
import {UpdateIconSVG} from '../icons/update'
import {UploadIconSVG} from '../icons/upload'
import {VideoIconSVG} from '../icons/video'
import {WaveIconSVG} from '../icons/wave'

import {cssRuleWithTheme, useThemeStyle, CSSRuleWithTheme} from '../style/themeContext'
import {toArray} from '../utility'

export enum IconSize {
  XSmall = 12,
  Small = 16,
  Medium = 24
}

export enum IconScale {
  Equal = '1em',
  Larger = '1.5em'
}

export enum IconType {
  Add = 'add',
  Archive = 'archive',
  ArrowLeft = 'arrowLeft',
  Article = 'article',
  Auto = 'auto',
  Bold = 'bold',
  BreakingNews = 'breakingNews',
  Check = 'check',
  ChevronDown = 'chevronDown',
  ChevronLeft = 'chevronLeft',
  ChevronRight = 'chevronRight',
  ChevronUp = 'chevronUp',
  Close = 'close',
  Column1 = 'column1',
  Column2 = 'column2',
  Column2Alt = 'column2Alt',
  Column4 = 'column4',
  Column6 = 'column6',
  Copy = 'copy',
  Created = 'created',
  Delete = 'delete',
  Description = 'description',
  DropHere = 'dropHere',
  Edit = 'edit',
  Embed = 'embed',
  Favorite = 'favorite',
  Filter = 'filter',
  Focus = 'focus',
  Forward = 'forward',
  Gallery = 'gallery',
  H2 = 'h2',
  H3 = 'h3',
  Image = 'image',
  Italic = 'italic',
  Link = 'link',
  ListSorted = 'listSorted',
  ListUnsorted = 'listUnsorted',
  Logout = 'logout',
  MediaLibrary = 'mediaLibrary',
  Menu = 'menu',
  More = 'more',
  Page = 'page',
  Preview = 'preview',
  Proofreading = 'proofreading',
  Publish = 'publish',
  Quote = 'quote',
  Replace = 'replace',
  Save = 'save',
  Search = 'search',
  Settings = 'settings',
  Striked = 'striked',
  Teaser = 'teaser',
  Text = 'text',
  Title = 'title',
  Underline = 'underline',
  Update = 'update',
  Upload = 'upload',
  Video = 'video',
  Wave = 'wave'
}

export interface IconStyleProps {
  scale: IconScale
}

export const IconStyle = cssRuleWithTheme<IconStyleProps>(({scale, theme}) => ({
  display: 'inline-block',
  height: '1em',
  fontSize: scale,
  lineHeight: '1em',
  verticalAlign: 'middle',

  fill: 'inherit',
  stroke: 'inherit',

  '> svg': {
    fill: 'inherit',
    stroke: 'inherit',
    height: 'inherit'
  }
}))

export interface IconProps<P = undefined> {
  readonly type: IconType
  readonly scale?: IconScale
  readonly style?: CSSRuleWithTheme | CSSRuleWithTheme[]
  readonly styleProps?: P
}

export interface IconPropsWithoutStyleProps {
  readonly type: IconType
  readonly scale?: IconScale
  readonly style?: CSSRuleWithTheme | CSSRuleWithTheme[]
}

export interface IconPropsWithStyleProps<P = undefined> {
  readonly type: IconType
  readonly scale?: IconScale
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps: P
}

export function Icon(props: IconPropsWithoutStyleProps): JSX.Element
export function Icon<P = undefined>(props: IconPropsWithStyleProps<P>): JSX.Element
export function Icon<P = undefined>({
  type,
  scale = IconScale.Equal,
  style,
  styleProps
}: IconProps<P>): JSX.Element {
  const {css} = useThemeStyle({...styleProps, scale})

  return (
    <span className={css(IconStyle, ...toArray(style))} role="img">
      {iconForType(type)}
    </span>
  )
}

export function iconForType(type: IconType, color?: string) {
  switch (type) {
    case IconType.Add:
      return <AddIconSVG />

    case IconType.Archive:
      return <ArchiveIconSVG />

    case IconType.ArrowLeft:
      return <ArrowLeftIconSVG />

    case IconType.Article:
      return <ArticleIconSVG />

    case IconType.Auto:
      return <AutoIconSVG />

    case IconType.Bold:
      return <BoldIconSVG />

    case IconType.BreakingNews:
      return <BreakingNewsIconSVG />

    case IconType.Check:
      return <CheckIconSVG />

    case IconType.ChevronDown:
      return <ChevronDownIconSVG />

    case IconType.ChevronRight:
      return <ChevronRightIconSVG />

    case IconType.ChevronLeft:
      return <ChevronLeftIconSVG />

    case IconType.ChevronUp:
      return <ChevronUpIconSVG />

    case IconType.Close:
      return <CloseIconSVG />

    case IconType.Column1:
      return <Column1IconSVG />

    case IconType.Column2:
      return <Column2IconSVG />

    case IconType.Column2Alt:
      return <Column2AltIconSVG />

    case IconType.Column4:
      return <Column4IconSVG />

    case IconType.Column6:
      return <Column6IconSVG />

    case IconType.Copy:
      return <CopyIconSVG />

    case IconType.Created:
      return <CreatedIconSVG />

    case IconType.Delete:
      return <DeleteIconSVG />

    case IconType.Description:
      return <DescriptionIconSVG />

    case IconType.DropHere:
      return <DropHereIconSVG />

    case IconType.Edit:
      return <EditIconSVG />

    case IconType.Embed:
      return <EmbedIconSVG />

    case IconType.Favorite:
      return <FavoriteIconSVG />

    case IconType.Filter:
      return <FilterIconSVG />

    case IconType.Focus:
      return <FocusIconSVG />

    case IconType.Forward:
      return <ForwardIconSVG />

    case IconType.Gallery:
      return <GalleryIconSVG />

    case IconType.H2:
      return <H2IconSVG />

    case IconType.H3:
      return <H3IconSVG />

    case IconType.Image:
      return <ImageIconSVG />

    case IconType.Italic:
      return <ItalicIconSVG />

    case IconType.Link:
      return <LinkIconSVG />

    case IconType.ListSorted:
      return <ListSortedIconSVG />

    case IconType.ListUnsorted:
      return <ListUnsortedIconSVG />

    case IconType.Logout:
      return <LogoutIconSVG />

    case IconType.MediaLibrary:
      return <MediaLibraryIconSVG />

    case IconType.Menu:
      return <MenuIconSVG />

    case IconType.More:
      return <MoreIconSVG />

    case IconType.Page:
      return <PageIconSVG />

    case IconType.Preview:
      return <PreviewIconSVG />

    case IconType.Proofreading:
      return <ProofreadingIconSVG />

    case IconType.Publish:
      return <PublishIconSVG />

    case IconType.Quote:
      return <QuoteIconSVG />

    case IconType.Replace:
      return <ReplaceIconSVG />

    case IconType.Save:
      return <SaveIconSVG />

    case IconType.Search:
      return <SearchIconSVG />

    case IconType.Settings:
      return <SettingsIconSVG />

    case IconType.Striked:
      return <StrikedIconSVG />

    case IconType.Teaser:
      return <TeaserIconSVG />

    case IconType.Text:
      return <TextIconSVG />

    case IconType.Title:
      return <TitleIconSVG />

    case IconType.Underline:
      return <UnderlineIconSVG />

    case IconType.Update:
      return <UpdateIconSVG />

    case IconType.Upload:
      return <UploadIconSVG />

    case IconType.Video:
      return <VideoIconSVG />

    case IconType.Wave:
      return <WaveIconSVG />
  }
}
