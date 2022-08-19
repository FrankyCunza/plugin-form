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
        this.multiple = null
        this.id = uniqueIdForm()()
        this.innerHtml = null
        this.required = null
        this.placeholder = null
        this.type = "text"
        this.selectMultiple = null
        this.label = null
        this.name = null
        this.option = null
        this.optionValue = null
        this.classNameInput = HOOKFORMINPUTCLASS
        this.checkedHtml = '<span class="hidden absolute bottom-4 text-green-500 right-2 pointer-events-none iconvalidation"><i class="fas fa-check"></i></span>'
        this.warningHtml = '<span class="hidden absolute bottom-4 text-red-500 right-2 pointer-events-none iconvalidation"><i class="fas fa-exclamation-triangle"></i></span>'
        this.inputFilePreviewImage = null
        this.value = null
    }

    static get observedAttributes() {
        return ["type"];
    }

    disconnectedCallback() {
        // console.log("Removed")
    }

    render() {
        let htmlDataAttributes = ""
        Object.entries({ ...this.dataset }).forEach(([k, v]) => {
            htmlDataAttributes += `data-${k}='${v}'`
        })
        let label = `<label class="">${this.label}${this.required ? "*" : ""}</label>`
        let htmlField = ""
        // FIELD SELECT
        if (this.type === "select") {
            htmlField += `
                ${this.warningHtml}
                <select 
                    ${this.selectMultiple == "true" ? "multiple" : ""} 
                    class="${this.classNameInput} cursor-pointer" 
                    data-field 
                    name="${this.name}"
                    ${htmlDataAttributes}>
                    ${this.innerHtml ? this.innerHtml : ""}
                </select>
                ${this.checkedHtml}
            `
        } else {
            htmlField = `
                ${this.type == "file" && this.inputFilePreviewImage ? `
                    <div class='mb-2 bg-white border border-solid border-gray-300 rounded-lg h-20' id="previewimage${this.id}"></div>
                ` : ''}
                ${this.warningHtml}
                <input 
                    type="${this.type}" 
                    data-required="${this.required ? "true" : "false"}"
                    placeholder="${this.placeholder}" 
                    value="${this.value || ''}"
                    data-field 
                    class="${this.classNameInput}" 
                    name="${this.name}" 
                    ${htmlDataAttributes}
                />
                ${this.checkedHtml}
            `
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
            this.type === "p" ||  
            this.type === "h6" ||  
            this.type === "h5" || 
            this.type === "h4" || 
            this.type === "h3" ||
            this.type === "h2" ||
            this.type === "h1"
        ) {
            label = ""
            htmlField = `<${this.type} class="${CLASSTEXT[this.type]}">${this.label}</${this.type}>`
        }
        // FIELD RADIO
        if (this.type === "radio") {
            let htmlTrue = `
                <div>
                    <label class="flex rounded-lg gap-2 cursor-pointer w-full ${this.getAttribute("cleanstyles") == "true" ? "" : "border border-solid border-gray-200 p-2 "}">
                        <span>Si</span>
                        <input 
                            type="radio" 
                            data-required="${this.required ? "true" : "false"}" 
                            data-field 
                            name="${this.name}" 
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
                            data-required="${this.required ? "true" : "false"}" 
                            data-field 
                            name="${this.name}" 
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
        if (this.type == "radio-multiple") {
            htmlField = `
                <div>
                    <label class="flex rounded-lg gap-1 cursor-pointer w-full flex-wrap border p-2 ${this.getAttribute("cleanstyles") == "true" ? "" : "border-solid border-gray-200"}">
                        <span>${this.option}</span>
                        <input 
                            type="radio" 
                            data-required="${this.required ? "true" : "false"}" 
                            data-multiple="true" 
                            data-radiomultiple="true" 
                            data-field 
                            name="${this.name}" 
                            data-value="${this.optionValue}" 
                            class="cursor-pointer" 
                            ${htmlDataAttributes}
                        />
                    </label>
                </div>
            `
        }
        // TEXTAREA
        if (this.type === "textarea") {
            htmlField = `
                ${this.warningHtml}
                <textarea 
                    class="${this.classNameInput}" 
                    data-required="${this.required ? "true" : "false"}" 
                    data-field 
                    ${htmlDataAttributes}
                    name="${this.name}">${this.value || ""}</textarea>
                ${this.checkedHtml}
            `
        }
        // CHECKBOX
        if (this.type === "checkbox") {
            if (this.multiple) {
                htmlField = this.innerHTML
            } else {
                htmlField = `
                    ${this.warningHtml}
                    <input type="checkbox" 
                        data-required="${this.required ? "true" : "false"}" 
                        data-field 
                        name="${this.name}" 
                        data-value="true" 
                        class="cursor-pointer" 
                        value="true" 
                        ${htmlDataAttributes}
                        ${this.value == "true" ? "checked" : ""} 
                    />
                    ${this.checkedHtml}
                `
            }
        }
        if (this.getAttribute("onlyfield") == "true") {
            label = ""
        }
        this.innerHTML = `
            <div class="w-full text-xs">
                ${label}
                <div class="relative w-full">
                ${this.type !== "label" ? htmlField : ""}
                </div>
            </div>
            `
    }

    changeField() {
        if (document.querySelector(`[data-field][name='${this.name}']`)) {
            document.querySelector(`[data-field][name='${this.name}']`).addEventListener("change", e => {
                switch (this.type) {
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
        this.value = this.getAttribute("data-value")
        this.multiple = this.getAttribute("data-multiple") == "true" ? true : false
        this.innerHtml = this.innerHTML
        this.type = this.getAttribute("type")
        this.required = this.getAttribute("required") == "true" ? true : false
        this.placeholder = this.getAttribute("placeholder") || ""
        this.label = this.getAttribute("label")
        this.name = this.getAttribute("data-name") || this.getAttribute("name")
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