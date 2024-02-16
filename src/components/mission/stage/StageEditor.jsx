import * as React from 'react'
import {Typography} from '@mui/joy'

import ConditionEditor from './condition/ConditionEditor.jsx'
import RewardEditor from './reward/RewardEditor.jsx'
import ActionEditor from '../action/ActionEditor.jsx'
import TextInput from '../inputs/TextInput.jsx'
import Toggle from '../inputs/Toggle.jsx'
import rewardDefaults from '/src/data/mission/stage/reward/reward-defaults.json'
import ArrayInput from '../inputs/ArrayInput.jsx'

export default function StageEditor({stage, updateStageData}) {
  return <>
    <TextInput name="StageID" label="Stage ID" type="number" value={stage.StageID} onChange={updateStageData}/>
    <TextInput name="name" label="Name" value={stage.name} onChange={updateStageData}/>
    <TextInput name="description" label="Description" value={stage.description} onChange={updateStageData}/>
    <TextInput name="Objective" label="Objective Localization Key" value={stage.Objective}
               onChange={updateStageData}/>
    <Toggle name="DisplayObjective" label="Display Objective" value={stage.DisplayObjective}
            onChange={updateStageData}/>
    <Toggle name="RevealObjectiveOnActivate" label="Reveal Objective On Activate"
            value={stage.RevealObjectiveOnActivate} onChange={updateStageData}/>

    <Typography level="h5" component="h3">Condition</Typography>
    <ConditionEditor/>

    <ArrayInput level={1}
                array={stage.MissionReward.MissionRewardDefinitions}
                title="Mission rewards"
                addButtonText="Add reward"
                noItemsText="No mission rewards"
                itemTitle={({index}) => `Reward #${index + 1}`}
                addButtonClick={() => {
                  const newRewardDefinitions = [
                    ...stage.MissionReward.MissionRewardDefinitions,
                    {...rewardDefaults}
                  ]
                  updateStageData("MissionReward", {
                    ...stage.MissionReward,
                    MissionRewardDefinitions: newRewardDefinitions
                  })
                }}
                updateData={index => (name, value) => {
                  const newRewardDefinitions = [...stage.MissionReward.MissionRewardDefinitions]
                  newRewardDefinitions[index][name] = value
                  const newRewards = {...stage.MissionReward, MissionRewardDefinitions: newRewardDefinitions}
                  updateStageData("MissionReward", newRewards)
                }}
                deleteData={index => {
                  const newRewardDefinitions = [...stage.MissionReward.MissionRewardDefinitions]
                  newRewardDefinitions.splice(index, 1)
                  const newRewards = {...stage.MissionReward, MissionRewardDefinitions: newRewardDefinitions}
                  updateStageData("MissionReward", newRewards)
                }}
                renderComponent={({item, updateData}) => <RewardEditor reward={item} updateRewardData={updateData}/>}
    />

    <Typography level="h5" component="h3">Actions</Typography>
    <ActionEditor/>
  </>
}