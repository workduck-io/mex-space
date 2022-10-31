/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

const { noteParser, reminderParser } = require('./src/parsers/entityParser')

const data = JSON.parse(fs.readFileSync('mex.json', 'utf-8'))
const nodeId = 'NODE_8jxTzFHQ73K4iRLH9Kz37'
const title = data.ilinks[0].path
const contents = data.contents[nodeId].content

const parsed = noteParser(nodeId, contents, title)
console.log(JSON.stringify(parsed))

const reminder = {
  id: 'REMINDER_FBGHd',
  nodeid: 'NODE_8jxTzFHQ73K4iRLH9Kz37',
  time: 1664281800000,
  title: 'Entities Testing',
  description: 'me to call Ahadh 6PM tomorrow',
  state: { done: false, snooze: false },
  createdAt: 1664200086752,
  updatedAt: 1664200086752
}

const parsedReminder = reminderParser(reminder)
console.log(`Parsed: ${parsedReminder}`)
