type Callback = () => void

//when not using arrow functions, you need to bind context 'this' in
export class Eventing {
	events: { [key: string]: Callback[] } = {}

	on = (eventName: string, callback: Callback): void => {
		const handlers = this.events[eventName] || []
		handlers.push(callback)
		this.events[eventName] = handlers
	}

	trigger = (eventName: string): void => {
		const handlers = this.events[eventName]
		handlers && handlers.forEach(callback => callback())
	}
}
