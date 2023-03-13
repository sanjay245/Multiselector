/* eslint-disable no-use-before-define */
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { createFilterOptions } from '@mui/material/Autocomplete'

const MultiSelect = ({
  items,
  selectedValues,
  label,
  placeholder,
  selectAllLabel,
  noOptionsText,
  limitTags,
  onToggleOption,
  onClearOptions,
  onSelectAll,
  getOptionLabel,
}) => {
  const allSelected = items.length === selectedValues.length
  const handleToggleSelectAll = () => {
    onSelectAll && onSelectAll(!allSelected)
  }

  const handleChange = (event, selectedOptions, reason) => {
    if (reason === 'select-option' || reason === 'remove-option') {
      if (selectedOptions.find((option) => option.value === 'select-all')) {
        handleToggleSelectAll()
      } else {
        onToggleOption && onToggleOption(selectedOptions)
      }
    } else if (reason === 'clear') {
      onClearOptions && onClearOptions()
    }
  }
  const optionRenderer = (option, { selected }) => {
    const selectAllProps =
      option.value === 'select-all' // To control the state of 'select-all' checkbox
        ? { checked: allSelected }
        : {}
    return (
      <>
        <Checkbox
          color="primary"
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
          style={{ marginRight: 8 }}
          checked={selected}
          {...selectAllProps}
        />
        {getOptionLabel(option)}
      </>
    )
  }
  const inputRenderer = (params) => (
    <TextField {...params} label={label} placeholder={placeholder} />
  )
  const getOptionSelected = (option, anotherOption) =>
    option.value === anotherOption.value
  const filter = createFilterOptions()
  return (
    <Autocomplete
      multiple
      size="small"
      limitTags={limitTags}
      options={items}
      value={selectedValues}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      noOptionsText={noOptionsText}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        return [{ label: selectAllLabel, value: 'select-all' }, ...filtered]
      }}
      onChange={handleChange}
      renderOption={optionRenderer}
      renderInput={inputRenderer}
    />
  )
}

MultiSelect.defaultProps = {
  limitTags: 5,
  items: [],
  selectedValues: [],
  getOptionLabel: (value) => value,
}

export default MultiSelect
