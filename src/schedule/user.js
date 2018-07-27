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
	demo3()
}

function demo1() {
	// 每当到10秒的时候就执行cb
	// 例如2018-07-30 10：12：10
	// 例如2018-08-11 19：58：10 。。。
	const job = schedule.scheduleJob('10 * * * * *', () => {
		console.info(`每当到10秒的时候就执行 running, time is ${Date.now()}`)
		// 取消该任务
		job.cancel()
	})
}

function demo2() {
	// 每当到每天的0时0点0分的时候就执行cb
	schedule.scheduleJob('0 10 1 * * *', () => {
		console.info(`每当到每天的0时0点0分的时候就执行 is running, time is ${Date.now()}`)
	})
}

function demo3() {
	// 每当到每周一的0时0点0分的时候就执行cb
	schedule.scheduleJob('0 0 0 * * 1', () => {
		console.info(`每当到每周一的0时0点0分的时候就执行 is running, time is ${Date.now()}`)
	})
}
