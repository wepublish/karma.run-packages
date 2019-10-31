import React, {useState} from 'react'

import {Icon, IconScale} from '../atoms/icon'
import {BaseButton} from '../atoms/baseButton'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, BorderRadius, pxToEm, FontSize, Spacing} from '../style/helpers'
import {BaseInput, InputType} from '../atoms/baseInput'
import {MaterialIconClose, MaterialIconKeyboardArrowDown} from '@karma.run/icons'

const SearchBarStyle = cssRuleWithTheme(({theme}) => ({
  border: `1px solid ${theme.colors.grayLight}`,
  borderRadius: pxToRem(BorderRadius.Medium),
  display: 'flex',
  fontSize: pxToEm(FontSize.Medium),
  padding: pxToRem(Spacing.ExtraSmall),

  '> input': {
    fontSize: pxToRem(FontSize.Medium)
  }
}))

export interface FilterOption {
  id: string
  name: string
}

export interface SearchBarProps {
  readonly filterOptions: FilterOption[]
  readonly searchValue: string
  onFilterSelected(id: string): void
  onTextInput(value: string): void
  onClear(): void
}

export function SearchBar({
  filterOptions,
  searchValue,
  onFilterSelected,
  onTextInput,
  onClear
}: SearchBarProps) {
  const css = useThemeStyle()
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div>
      <div className={css(SearchBarStyle)}>
        <div>
          {'Filters'}
          <BaseButton onClick={e => setShowOptions(!showOptions)}>
            <Icon element={MaterialIconKeyboardArrowDown} scale={IconScale.Equal} />
          </BaseButton>
        </div>
        <BaseInput
          type={InputType.Text}
          value={searchValue}
          onChange={e => onTextInput(e.target.value)}
          placeholder={'Search'}
        />
      </div>
      {showOptions && (
        <div>
          {filterOptions.map((item, index) => (
            <div key={index} onClick={e => onFilterSelected(item.id)}>
              {item.name}
            </div>
          ))}
        </div>
      )}
      {searchValue.length > 0 && (
        <div>
          <BaseButton onClick={onClear}>
            <Icon element={MaterialIconClose} scale={IconScale.Equal} />
          </BaseButton>
          {'Clear current search query, filters and sorts'}
        </div>
      )}
    </div>
  )
}
