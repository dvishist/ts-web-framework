import axios, { AxiosPromise } from 'axios'
import { UserProps } from './User'

interface hasId {
	id?: number
}

export class Sync<T extends hasId> {
	constructor(private url: string) {}

	fetch = (id: number): AxiosPromise => {
		return axios.get(`${this.url}/${id}`)
	}

	save = (data: T): AxiosPromise => {
		const { id } = data

		if (id) {
			return axios.put(`${this.url}/${id}`, data)
		} else {
			return axios.post(this.url, data)
		}
	}
}
