import { withFormer } from '../../../.'
import { useState } from 'react'
import Select, { SingleValue } from 'react-select'

type Option = { value: string; label: string }

const options: Option[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

type CustomSelectProps = {
  updateState: (val: SingleValue<Option>) => void
  initialValue: SingleValue<Option>
}

function CustomSelect({ updateState, initialValue }: CustomSelectProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(initialValue)

  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={(val) => {
          setSelectedOption(val)
          updateState(val)
        }}
        options={options}
      />
    </div>
  )
}

export default withFormer<CustomSelectProps, SingleValue<Option>>(CustomSelect)
