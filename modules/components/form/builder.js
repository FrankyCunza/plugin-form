export class HookFormBuilder extends HTMLElement {
    constructor() {
        super()
        this.builder = {
            "constructor": {
                "age": {
                    "type": "text",
                    "name": "age",
                    "pattern": "",
                    "position": 4
                },
                "names": {
                    "type": "number",
                    "name": "names",
                    "pattern": "",
                    "position": 4
                },
                "countries": {
                    "type": "checkbox",
                    "name": "countries",
                    "position": 5
                },
                "areyoumarried": {
                    "type": "radio",
                    "name": "areyoumarried",
                    "position": 7
                }
            },
            "languages": {
                "es": {
                    "age": {
                        "label": "Edad"
                    },
                    "names": {
                        "label": "Nombres"
                    },
                    "countries": {
                        "label": "Countries"
                    },
                    "areyoumarried": {
                        "label": "Are you married?"
                    }
                },
                "en": {
                    "age": {
                        "label": "Age"
                    },
                    "names": {
                        "label": "Names"
                    },
                    "countries": {
                        "label": "Countries"
                    },
                    "areyoumarried": {
                        "label": "Are you married?"
                    }
                }
            }
        }
        this.values = {}
    }

    static get observedAttributes() {
        return [""];
    }

    disconnectedCallback() {
        // console.log("Removed")
    }

    update({ builder = {}, values = {} }) {
        this.builder = builder
        this.values = values
    }

    builderHTML() {
        let html = ""
        Object.entries(this.builder['constructor']).forEach(([k, v]) => {
            const LABEL = this.builder['languages']['es'][k]['label']
            switch (v['type']) {
                case "text":
                case "number":
                case "date":
                case "radio":
                case "datetime":
                case "month":
                    html += `<custom-field name="${k}" type="${v['type']}" label="${LABEL}"></custom-field>`
                    break;
            }
        })
        this.querySelector("form").innerHTML = html
    }

    render() {
        let html = ""
        html += `
            <form novalidate class="grid grid-cols-1 gap-4">
            </form>
        `
        this.innerHTML = html
    }

    connectedCallback() {
        this.render()
        this.builderHTML()
    }
}

window.customElements.define('custom-hook-form-builder', HookFormBuilder);