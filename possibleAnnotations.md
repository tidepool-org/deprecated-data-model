Possible annotations are

* `carelink/basal/off-schedule-rate`: happens on basal rates do not match the currently believed settings
    * We've seen this when the user changes pumps (e.g. for a repair), and the new pump basal settings are different than the old settings, but both pumps are uploaded to CareLink. There may be other causes for this but we haven't seen them.
* `carelink/settings/basal-mismatch`: happens when the basal portions of a settings object do not line up with what the settings events say they should. We updated the basal schedules anyway (primarily happens on pump replacement with carelink)
* `carelink/settings/wizard-mismatch`: same as "basal" but with the wizard settings so like IC and carbRatio and stuff
* `carelink/settings/activeSchedule-mismatch`: same as "basal" but with the currently active schedule
    * The above three issues _might_ occur in this situation: You've uploaded data from a pump to CareLink, but that pump has been reset between the last upload and the current upload, e.g. if the pump was reset and given to a new user.
* `diasend/basal/temp-duration-truncated`: happens when we have a temp basal whose duration was artificially limited to 24 hours (temps cannot be more than 24 hours)
    * The Diasend XLS file only says when basal delivery changes, not whether or not it is a temp basal. (Suspends cause basal change to 0).
    * Diasend XLS file only reports settings changes at the time of the most resent upload.
    * We assume temp basal if the delivery is different than the likely setting.
    * So if you have a flat basal rate (no changes over the course of the day), it will look like a long temp basal. So we limit temp basal to 24 hours.
* `diasend/basal/temp-basal-fabrication`: happens when we create a temp basal event based on a basal value not matching a schedule from diasend. Basically exists on all diasend temps.
    * Diasend XLS file only says when basal delivery changes, not whether or not it is a temp basal. (Suspends cause basal change to 0).
    * We assume temp basal if the delivery is different than the likely setting.
* `diasend/bolus/extended`: happens on every extended bolus from a diasend source
    * Diasend XLS file only indicates immediate amount, not extended amount. (XXX Confirm this... true of Diasend display also?)
* `carelink/basal/temp-percent-create-scheduled`: happens whenever a percentage temp basal crosses over a scheduled basal boundary on carelink

