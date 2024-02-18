import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import ConditionSetEditor from './ConditionSetEditor.jsx'
import EventConditionEditor from './EventConditionEditor.jsx'
import PropertyConditionEditor from './PropertyConditionEditor.jsx'

import conditionSetDefaults from '/src/data/mission/stage/condition/condition-set-defaults.json'
import eventConditionDefaults from '/src/data/mission/stage/condition/event-condition-defaults.json'
import propertyConditionDefaults from '/src/data/mission/stage/condition/property-condition-defaults.json'
import ComplexAutocompleteInput from '../../inputs/ComplexAutocompleteInput.jsx'

export const conditionTypes = [
  {
    value: "ConditionSet",
    label: "Condition Set",
    description: "A set of conditions",
    component: ConditionSetEditor,
    defaults: conditionSetDefaults
  },
  {
    value: "EventCondition",
    label: "Event Condition",
    description: "A condition that checks for a game message",
    component: EventConditionEditor,
    defaults: eventConditionDefaults
  },
  {
    value: "PropertyCondition",
    label: "Property Condition",
    description: "A condition that checks for a property value",
    component: PropertyConditionEditor,
    defaults: propertyConditionDefaults
  }
]

export function getConditionLabel(condition) {
  const typeLabel = conditionTypes.find(type => type.value === condition.ConditionType).label

  switch (condition.ConditionType) {
    case "ConditionSet":
      return condition.ConditionMode
        + ` (${condition.Children.length} ${condition.Children.length === 1 ? "child" : "children"})`
    case "EventCondition":
      return typeLabel
    case "PropertyCondition":
      return typeLabel
  }
}

export default function ConditionEditor({condition, updateData}) {
  const [conditionType, setConditionType] = useState(condition ? condition.ConditionType : null)

  const EditorComponent = conditionTypes.find(type => type.value === conditionType)?.component

  return <>
    <ComplexAutocompleteInput name="ConditionType" label="Condition Type" value={conditionType}
                              options={conditionTypes} placeholder="Select condition type"
                              onChange={(_, newValue) => {
                                setConditionType(newValue)
                                updateData(
                                  newValue === null
                                    ? null
                                    : {
                                      __uuid: condition?.__uuid || uuidv4(),
                                      ...conditionTypes.find(type => type.value === newValue)?.defaults
                                    }
                                )
                              }}
    />
    {EditorComponent && <EditorComponent condition={condition} updateData={
      (name, value) => {
        updateData({...condition, ...{[name]: value}})
      }
    }/>}
  </>
}