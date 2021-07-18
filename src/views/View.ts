import { Model } from '../models/Model'

export abstract class View<T extends Model<U>, U> {
	children: { [key: string]: Element } = {}

	constructor(public parent: Element, public model: T) {
		this.bindModel()
	}

	abstract template(): string

	childrenMap(): { [key: string]: string } {
		return {}
	}

	eventsMap(): { [key: string]: () => void } {
		return {}
	}

	bindModel(): void {
		this.model.on('change', () => {
			this.render()
		})
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

	bindChildren(fragment: DocumentFragment): void {
		const children = this.childrenMap()
		for (let childKey in children) {
			const selector = children[childKey]
			this.children[childKey] = fragment.querySelector(selector)!
		}
	}

	render(): void {
		this.parent.innerHTML = ''
		const templateElement = document.createElement('template')
		templateElement.innerHTML = this.template()
		this.bindEvents(templateElement.content)
		this.bindChildren(templateElement.content)
		this.parent.append(templateElement.content)
	}
}
