import { User } from '../models/User'

export class UserForm {
	constructor(public parent: Element, public model: User) {
		this.bindModel()
	}

	bindModel(): void {
		this.model.on('change', () => {
			this.render()
		})
	}

	eventsMap(): { [key: string]: () => void } {
		return {
			'click:.set-age': this.setRandomAge,
			'click:.set-name': this.setName
		}
	}

	bindEvents(fragment: DocumentFragment): void {
		const events = this.eventsMap()
		for (let eventKey in events) {
			const [eventName, selector] = eventKey.split(':')
			fragment.querySelectorAll(selector).forEach(element => {
				element.addEventListener(eventName, events[eventKey])
			})
		}
	}

	setRandomAge = (): void => {
		this.model.setRandomAge()
	}

	setName = (): void => {
		const input = this.parent.querySelector('input')!
		const name = input.value
		this.model.set({ name })
	}

	template(): string {
		return `
            <div>
                <h1>User Form</h1>
				<div>
				User Name: ${this.model.get('name')}
				</div>
				<div>
				User Age: ${this.model.get('age')}
				</div>
                <input />
				<button class="set-name">Set Name</button>
				<button class="set-age">Set Random Age</button>
            </div>
        `
	}

	render(): void {
		this.parent.innerHTML = ''
		const templateElement = document.createElement('template')
		templateElement.innerHTML = this.template()
		this.bindEvents(templateElement.content)
		this.parent.append(templateElement.content)
	}
}
