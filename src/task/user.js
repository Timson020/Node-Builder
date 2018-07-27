import schedule from 'node-schedule'

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

export function getuserinfo() {
	demo1()
	demo2()
}

function demo1 () {
	// 每当到10秒的时候就执行cb
	schedule.scheduleJob('10 * * * * *', () => {
		console.info(`task is running, time is ${Date.now()}`)
	})
}

function demo2 () {
	// 每当到10秒的时候就执行cb
	schedule.scheduleJob('10 * * * * *', () => {
		console.info(`task is running, time is ${Date.now()}`)
	})
}
