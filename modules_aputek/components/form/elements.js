import { HOOKFORMINPUTCLASS } from "../../config/index.js"

function uniqueIdForm() {
    const firstItem = {
        value: "0"
    };
    /*length can be increased for lists with more items.*/
    let counter = "123456789".split('')
        .reduce((acc, curValue, curIndex, arr) => {
            const curObj = {};
            curObj.value = curValue;
            curObj.prev = acc;

            return curObj;
        }, firstItem);
    firstItem.prev = counter;

    return function () {
        let now = Date.now();
        if (typeof performance === "object" && typeof performance.now === "function") {
            now = performance.now().toString().replace('.', '');
        }
        counter = counter.prev;
        return `${now}${Math.random().toString(16).substr(2)}${counter.value}`;
    }
}

export class CustomFieldHook extends HTMLElement {
    constructor() {
        super()
        this.lang = "en"
        this.data = null
        this.multiple = null
        this.id = uniqueIdForm()()
        this.innerHtml = null
        this.selectMultiple = null
        this.option = null
        this.optionValue = null
        this.classNameInput = HOOKFORMINPUTCLASS
        this.checkedHtml = '<span class="hidden absolute bottom-4 text-green-500 right-2 pointer-events-none iconvalidation"><i class="fas fa-check"></i></span>'
        this.warningHtml = '<span class="hidden absolute bottom-4 text-red-500 right-2 pointer-events-none iconvalidation"><i class="fas fa-exclamation-triangle"></i></span>'
        this.inputFilePreviewImage = null
    }

    static get observedAttributes() {
        return ["type"];
    }

    disconnectedCallback() {
        // console.log("Removed")
    }

    render() {
        let htmlDataAttributes = ""
        Object.entries({ ...this.data['dataAttributes'] }).forEach(([k, v]) => {
            htmlDataAttributes += `data-${k}='${v}'`
        })
        let label = `<label class="text-base font-semibold text-gray-800">${this.data['label']}${this.data['required'] ? "*" : ""}</label>`
        let htmlField = ""
        switch (this.data['type']) {
            case "text":
            case "number":
            case "color":
            case "date":
            case "datetime-local":
            case "date":
            case "email":
            case "month":
            case "number":
            case "password":
            case "radio":
            case "range":
            case "tel":
            case "time":
            case "url":
            case "week":
            case "file":
                htmlField = `
                    ${this.data['type'] == "file" && this.inputFilePreviewImage ? `
                        <div class='mb-2 bg-white border border-solid border-gray-300 rounded-lg h-20' id="previewimage${this.id}"></div>
                    ` : ''}
                    ${this.warningHtml}
                    <input 
                        type="${this.data['type']}" 
                        data-alternatename="${this.data['alternateName'] || ""}"
                        data-required="${this.data['required'] ? "true" : "false"}"
                        placeholder="${this.data['placeholder'] || ""}" 
                        value="${this.data['value'] || ''}"
                        data-field 
                        class="${this.classNameInput}" 
                        name="${this.data['name']}" 
                        ${htmlDataAttributes}
                    />
                    ${this.checkedHtml}
                `
                break;
        }
        // FIELD SELECT
        if (this.data['type'] === "select") {
            let options = ""
            if (this.data['options']) {
                options += `<option hidden value="">Select</option>`
                this.data['options'].forEach(el => {
                    options += `<option value="${el.value}" ${this.data['value'] == el.value ? "selected" : ""}>${el.title[this.lang] || el.title}</option>`
                })
            }
            htmlField += `
                ${this.warningHtml}
                <select 
                    ${this.selectMultiple == "true" ? "multiple" : ""} 
                    class="${this.classNameInput} cursor-pointer" 
                    data-required="${this.data['required'] ? "true" : "false"}"
                    data-field 
                    name="${this.data['name']}"
                    ${htmlDataAttributes}>
                    ${options}
                </select>
                ${this.checkedHtml}
            `
        }
        // FIELD HTML
        if (this.data['type'] === "html") {
            htmlField = this.data['html']
        }
        const CLASSTEXT = {
            p: "text-base",
            h6: "text-xl font-bold",
            h5: "text-2xl font-bold",
            h4: "text-3xl font-bold",
            h3: "text-4xl font-bold",
            h2: "text-5xl font-bold",
            h1: "text-6xl font-bold"
        }
        if (
            this.data['type'] === "p" ||  
            this.data['type'] === "h6" ||  
            this.data['type'] === "h5" || 
            this.data['type'] === "h4" || 
            this.data['type'] === "h3" ||
            this.data['type'] === "h2" ||
            this.data['type'] === "h1"
        ) {
            label = ""
            htmlField = `<${this.data['type']} class="${CLASSTEXT[this.data['type']]}">${this.data['label']}</${this.data['type']}>`
        }
        // FIELD RADIO
        if (this.data['type'] === "radio") {
            let htmlTrue = `
                <div>
                    <label class="flex rounded-lg gap-2 cursor-pointer w-full ${this.getAttribute("cleanstyles") == "true" ? "" : "border border-solid border-gray-200 p-2 "}">
                        <span>Si</span>
                        <input 
                            type="radio" 
                            data-required="${this.data['required'] ? "true" : "false"}" 
                            data-field 
                            name="${this.data['name']}" 
                            data-value="true" 
                            class="cursor-pointer" 
                            value="true" 
                            ${htmlDataAttributes}
                        />
                    </label>
                </div>
            `
            let htmlFalse = `
                <div>
                    <label class="flex rounded-lg gap-2 cursor-pointer w-full ${this.getAttribute("cleanstyles") == "true" ? "" : "border border-solid border-gray-200 p-2 "}">
                        <span>No</span>
                        <input 
                            type="radio" 
                            data-required="${this.data['required'] ? "true" : "false"}" 
                            data-field 
                            name="${this.data['name']}" 
                            data-value="false" 
                            class="cursor-pointer" 
                            value="false" 
                            ${htmlDataAttributes}
                        />
                    </label>
                </div>
            `
            let html = ""
            if (this.getAttribute("show") == "true") {
                label = ""
                html = htmlTrue
            }
            else if (this.getAttribute("show") == "false") {
                label = ""
                html = htmlFalse
            } else {
                html = htmlTrue + htmlFalse
            }
            htmlField = `
                <div class="flex gap-2">
                    ${html}
                </div>
            `
        }
        // FIELD RADIO MULTIPLE
        if (this.data['type'] == "radio-multiple") {
            htmlField += `<div class="flex gap-3">`
            this.data['options'].forEach(el => {
                htmlField += `
                    <div>
                        <label class="flex rounded-lg gap-1 cursor-pointer w-full flex-wrap border p-2 ${this.getAttribute("cleanstyles") == "true" ? "" : "border-solid border-gray-200"}">
                            <span>${el.title[this.lang] || el.title}</span>
                            <input 
                                type="radio" 
                                data-required="${this.data['required'] ? "true" : "false"}" 
                                data-multiple="true" 
                                data-radiomultiple="true" 
                                data-field 
                                name="${this.data['name']}" 
                                data-value="${el.value}" 
                                class="cursor-pointer" 
                                ${htmlDataAttributes}
                            />
                        </label>
                    </div>
                `
            })
            htmlField += `</div>`
        }
        // TEXTAREA
        if (this.data['type'] === "textarea") {
            htmlField = `
                ${this.warningHtml}
                <textarea 
                    class="${this.classNameInput}" 
                    data-required="${this.data['required'] ? "true" : "false"}" 
                    data-field 
                    ${htmlDataAttributes}
                    name="${this.data['name']}">${this.data['value'] || ""}</textarea>
                ${this.checkedHtml}
            `
        }
        // CHECKBOX
        if (this.data['type'] === "checkbox") {
            if (this.data?.options?.length > 0) {
                htmlField += `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                `
                this.data['options'].forEach(el => {
                    htmlField += `
                    <div class="relative flex rounded-xl w-full">
                        <input type="checkbox" 
                            class="cursor-pointer focus:outline-none focus:ring-4 ring-inset rounded-xl focus:ring-blue-200 absolute w-full h-full appearance-none form__checkbox" 
                            data-multiple="true" 
                            data-keyparent="${this.data['name']}" 
                            data-fullkey="${el.title}" 
                            name="${el.value}" 
                            ${htmlDataAttributes} 
                            data-alternatename="${el.alternateName || ""}" />
                        <div class="text-sm rounded-xl flex flex-col gap-2 items-center justify-center">
                            <div class="form__checkbox--circle absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-sm bg-opacity-30 rounded-full bg-white hidden">
                                    <i class="fas fa-check"></i>
                            </div>
                            <div class="${!el?.icon && 'hidden'} bg-gray-100 p-2 rounded-lg">
                                    <img src="${el?.icon}" style="max-width: 45px; max-height: 45px;"  />
                            </div>
                            <span class="flex font-medium text-center leading-4">${el.title[this.lang] || el.title}</span>
                        </div>
                    </div>
                    `
                })
                htmlField += `</div>`
            } else {
                htmlField += `
                    <div class="relative w-full grid col-span-${this.data?.columns ? this.data.columns : '3'}>
                        <label class="flex w-full items-center py-4 border rounded-xl px-4 cursor-pointer">
                            ${this.warningHtml}
                            <input type="checkbox" data-multiple="false" class="cursor-pointer" data-fullkey="${this.data['name']}" name="${this.data['name']}" data-required="${this.data['required'] && 'true'}" />
                            ${this.checkedHtml}
                            <p class="ml-2">${this.data['label']} ${this.data['required'] ? '*' : ''}</p>
                        </label>
                    </div>
                `
            }
        }
        if (this.data['onlyfield']) {
            label = ""
        }
        // this.classList.add(`grid`)
        this.classList.add(`col-span-${this.data['columns'] || 1}`)
        this.innerHTML = `
            <div class="w-full text-xs">
                ${label}
                <div class="relative w-full">
                ${this.data['type'] !== "label" ? htmlField : ""}
                </div>
            </div>
            `
    }

    changeField() {
        if (document.querySelector(`[data-field][name='${this.data['name']}']`)) {
            document.querySelector(`[data-field][name='${this.data['name']}']`).addEventListener("change", e => {
                switch (this.data['type']) {
                    case "file":
                        if (this.inputFilePreviewImage) {
                            const image = URL.createObjectURL(e.target.files[0]);
                            document.getElementById("previewimage" + this.id).innerHTML = `
                                <div class="h-full w-full flex justify-center items-center">
                                    <img src='${image}' class="h-full" />
                                </div>
                            `
                        }
                        break;
                    default:
                        break;
                }
            })
        }
    }

    connectedCallback() {
        this.data = JSON.parse(this.getAttribute("data"))
        this.multiple = this.getAttribute("data-multiple") == "true" ? true : false
        this.innerHtml = this.innerHTML
        this.selectMultiple = this.getAttribute("multiple")
        this.optionValue = this.getAttribute("optionvalue") || ""
        // RADIO MULTIPLE
        this.option = this.getAttribute("option")
        // FILE
        this.inputFilePreviewImage = this.getAttribute("data-previewimage") == "true" ? true : false
        // RENDER
        this.render()
        // CHANGE FIELD
        this.changeField()
    }

    attributeChangedCallback() {
        // console.log("Change attribute")
    }
}
window.customElements.define('custom-field-hook', CustomFieldHook);