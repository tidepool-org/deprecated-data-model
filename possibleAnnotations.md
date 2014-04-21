Possible annotations are

* basal/off-settings-rate: happens on basal rates do not match the currently believed settings
* settings-mismatch/basal: happens when the basal portions of a settings object do not line up with what the settings events say they should. We updated the basal schedules anyway (primarily happens on pump replacement with carelink)
* settings-mismatch/wizard: same as "basal" but with the wizard settings so like IC and carbRatio and stuff
* settings-mismatch/activeSchedule: same as "basal" but with the currently active schedule
* diasend/temp-limit-24hrs: happens when we have a temp basal whose duration was artificially limited to 24 hours (temps cannot be more than 24 hours)
* diasend/temp-basal-fabrication: happens when we create a temp basal event based on a basal value not matching a schedule from diasend. Basically exists on all diasend temps.
* diasend/extended-boluses: happens on every extended bolus from a diasend source
