class SequenceUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getSequences() {
        return `${this.baseUrl}/sequences`;
    }

    getSequenceById(id) {
        return `${this.baseUrl}/sequences/${id}`;
    }

    createSequence() {
        return `${this.baseUrl}/sequences`;
    }

    removeSequenceById(id) {
        return `${this.baseUrl}/sequences/${id}`;
    }

    updateSequenceById(id) {
        return `${this.baseUrl}/sequences/${id}`;
    }
}

export const sequenceUrls = new SequenceUrls();