import React from 'react'
import {SearchBar, SearchBarProps} from './searchBar'
import {PrimaryButton} from '../atoms/primaryButton'

export interface PageHeaderProps extends SearchBarProps {
  readonly title: string
  readonly buttonLabel: string
  onClick(): void
}

export function PageHeader({
  title,
  buttonLabel,
  onClick,
  filterOptions,
  searchValue,
  onFilterSelected,
  onTextInput,
  onClear
}: PageHeaderProps) {
  return (
    <>
      <div>
        <h1>{title}</h1> {/* TODO use Heading1 from textStyles */}
        <PrimaryButton label={buttonLabel} onClick={onClick} />
      </div>
      <SearchBar
        filterOptions={filterOptions}
        searchValue={searchValue}
        onFilterSelected={onFilterSelected}
        onTextInput={onTextInput}
        onClear={onClear}
      />
    </>
  )
}
