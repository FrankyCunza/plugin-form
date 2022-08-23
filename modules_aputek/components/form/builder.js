import { validateForm } from "./validate.js"

export class HookFormBuilder extends HTMLElement {
    constructor() {
        super()
        this.formId = "form"
        this.lang = "en"
        this.handle = () => {
            console.log("Sending")
        }
        this.builder = JSON.parse(localStorage.getItem("data"))
        this.builderr = {
            "constructor": {
                "age": {
                    "type": "text",
                    "name": "age",
                    "pattern": "",
                    "position": 4,
                    "required": true
                },
                "names": {
                    "type": "number",
                    "name": "names",
                    "pattern": "",
                    "position": 4,
                    "required": true
                },
                "countries": {
                    "type": "checkbox",
                    "name": "countries",
                    "position": 5,
                    "required": true
                },
                "areyoumarried": {
                    "type": "radio",
                    "name": "areyoumarried",
                    "position": 7,
                    "required": true
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
        this.builder && Object.entries(this.builder['constructor']).forEach(([k, v]) => {
            const LABEL = this.builder['languages'][this.lang] && this.builder['languages'][this.lang][k] ? this.builder['languages'][this.lang][k]['label'] : `Campo ${k}`
            let data = {
                ...v,
                label: LABEL,
                name: k
            }
            console.log(data)
            if (data) {
                html += `<custom-field-hook data='${JSON.stringify(data)}'></custom-field-hook>`
            }
            // html += `<custom-field-hook name="${k}" required="${v['required']}" type="${v['type']}" label="${LABEL}"></custom-field-hook>`
        })
        html += `
            <div class="relative">
                <button class="bg-purple-700 text-white rounded-lg py-4 w-full">Enviar</button>
            </div>
        `
        this.querySelector("form").innerHTML = html
    }

    render() {
        let html = ""
        html += `
            <form novalidate class="grid grid-cols-1 gap-4" id="${this.formId}">
            </form>
        `
        this.innerHTML = html
        this.querySelector("form").addEventListener("submit", e => {
            e.preventDefault()
            validateForm({ selector: `[id='${this.formId}']` }).then(res => {
                console.log(res[1])
                this.handle()
            }).catch(err => {
                console.log(err)
            })
        })
    }

    connectedCallback() {
        this.render()
        this.lang = this.getAttribute("data-lang") || "en"
        this.builderHTML()
    }
}

window.customElements.define('custom-hook-form-builder', HookFormBuilder);