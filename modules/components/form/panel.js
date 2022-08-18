import { HOOKFORMINPUTCLASS, HOOKFORMTYPES } from "../../config/index.js"
import { validateForm } from "./validate.js"

export class HookFormPanel extends HTMLElement {
    constructor() {
        super()
        this.data = {
            columns: 2
        }
        this.levels = 1
    }

    static get observedAttributes() {
        return [""];
    }

    disconnectedCallback() {
        // console.log("Removed")
    }

    constructConfig() {
        let html = ""
        html += `
            <div class="grid grid-cols-3">
                <div class="p-4">
                    <custom-field label="Columnas" data-value="${this.data.columns}" type="text"></custom-field>
                </div>
            </div>
        `
        return html
    }

    constructTop() {
        let htmlSection = `
               <div class="w-full">
                    <button data-action="modalform" data-name="section" 
                    class="bg-gray-50 py-3.5 font-medium focus:ring-4 focus:ring-blue-400 w-full hover:bg-blue-50 hover:text-blue-700 ring-inset">
                        Create section
                    </button>
               </div>
          `
        let htmlBlock = `
               <div>
                    <button data-action="modalform" data-name="block"
                    class="bg-gray-50 py-3.5 font-medium focus:ring-4 focus:ring-blue-400 w-full hover:bg-blue-50 hover:text-blue-700 ring-inset">
                        Create block
                    </button>
               </div>
          `
        let htmlField = `
               <div>
                    <button data-action="modalform" data-name="field" 
                    class="bg-gray-50 py-3.5 font-medium focus:ring-4 focus:ring-blue-400 w-full hover:bg-blue-50 hover:text-blue-700 ring-inset">
                        Create field
                    </button>
               </div>
          `
        let htmlButtonActions = `
               <div class="grid grid-cols-${this.levels} text-gray-800 w-full">
          `
        switch (this.levels) {
            case 1:
                htmlButtonActions += htmlField
                break;
            case 2:
                htmlButtonActions += htmlBlock + htmlField
                break;
            case 3:
                htmlButtonActions += htmlSection + htmlBlock + htmlField
                break;
            default:
                break;
        }
        htmlButtonActions += `</div>`
        return htmlButtonActions
    }

    constructLines() {
        let html = ""
        html += `<div class="grid grid-cols-${this.levels} absolute top-0 left-0 w-full h-full pointer-events-none z-10">`;
        const quantity = [... new Array(this.levels)]
        quantity.forEach((el, i) => {
            html += `<div class="${i < (this.levels-1) ? "border-solid border-r border-gray-400" : ""}"></div>`
        })
        html += `</div>`
        return html
    }

    constructTypes() {
        let html = ""
        HOOKFORMTYPES.forEach(el => {
            html += `<option value="${el.name}">${el.title}</option>`
        })
        return html
    }

    printModalFieldForm() {
        return `
            <custom-field type="text" label="Label" name="label"></custom-field>
            <custom-field type="text" label="Aditional Name" name="additionalName"></custom-field>
            <custom-field type="text" label="Info" name="info"></custom-field>
            <custom-field type="text" label="Alternate name" name="alternateName"></custom-field>
            <custom-field type="select" label="Columns" name="columns">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </custom-field>
            <custom-field type="text" label="Pattern" name="pattern"></custom-field>
            <custom-field type="select" label="Type" name="type">
                ${this.constructTypes()}
            </custom-field>
            <custom-field type="select" label="Required" name="required">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </custom-field>
        `
    }

    constructModals() {
        let html = ""
        let htmlModalSection = `
               <div class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-20 hidden" data-modal="section">
                    <div class="bg-black bg-opacity-20 absolute top-0 left-0 w-full h-full" data-action="modalform"></div>
                    <div class="bg-white p-5 rounded-xl relative max-w-3xl w-full">
                         <h2 class="font-bold text-xl text-gray-800 mb-3">Add section</h2>
                         <input type="text"
                         class="${HOOKFORMINPUTCLASS}" />
                         <button type="button" data-action="savesection" class="mt-3 bg-blue-600 px-4 py-3 rounded-xl text-white">Save</button>
                    </div>
               </div>
          `
        let htmlModalBlock = `
               <div class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-20 hidden" data-modal="block">
                    <div class="bg-black bg-opacity-20 absolute top-0 left-0 w-full h-full" data-action="modalform"></div>
                    <div class="bg-white p-5 rounded-xl relative max-w-3xl w-full">
                         <h2 class="font-bold text-xl text-gray-800 mb-3">Add block</h2>
                         <input type="text"
                         class="${HOOKFORMINPUTCLASS}" />
                         <button type="button" data-action="saveblock" class="mt-3 bg-blue-600 px-4 py-3 rounded-xl text-white">Save</button>
                    </div>
               </div>
          `
        let htmlModalField = `
               <div class="fixed w-screen h-screen top-0 left-0 py-10 flex items-center justify-center z-20 hidden" data-modal="field">
                    <div class="bg-black bg-opacity-20 absolute top-0 left-0 w-full h-screen" data-action="modalform"></div>
                    <div class="bg-white p-5 rounded-xl relative max-w-3xl w-full h-max overflow-y-auto" style="max-height: 90vh">
                         <h2 class="font-bold text-xl text-gray-800 mb-3">Add field</h2>
                         <form novalidate class="grid grid-cols-3 gap-3" id="formpanel"></form>
                         <div class="flex flex-col mt-4 border border-gray-300 rounded-xl p-3 hidden">
                              <div class="flex items-center gap-2 mb-2">
                                   <label class="text-gray-800 font-medium">Options</label>
                                   <button class="bg-blue-50 tetx-xs text-blue-600 px-2 py-2 rounded-md font-medium" data-action="addOption">Add</button>
                              </div>
                              <div class="border border-gray-200 rounded-xl overflow-hidden">
                                   <table class="w-full">
                                        <thead class="bg-gray-50 h-12">
                                             <tr>
                                                  <th class="font-medium text-left px-3">Name</th>
                                                  <th class="font-medium text-left px-3">Value</th>
                                                  <th class="font-medium text-left px-3">Icon</th>
                                                  <th class="font-medium text-left px-3">Required</th>
                                                  <th class="font-medium text-left px-3">Textarea</th>
                                             </tr>
                                        </thead>
                                        <tbody></tbody>
                                   </table>
                              </div>
                         </div>
                         <div class="flex flex-col mt-4 border border-gray-300 rounded-xl p-3 hidden">
                              <div class="flex items-center gap-2 mb-2">
                                   <label class="text-gray-800 font-medium">HTML</label>
                              </div>
                              <textarea class="${HOOKFORMINPUTCLASS} pt-4" style="height: 150px;"></textarea>
                         </div>
                         <div class="w-full flex justify-end">
                             <button type="button" data-action="savefield" class="mt-3 bg-blue-600 px-4 py-3 rounded-xl text-white"><i class="fas fa-save mr-2 pointer-events-none"></i>Save</button>
                         </div>
                    </div>
               </div>
          `
        html += htmlModalSection + htmlModalBlock + htmlModalField
        return html
    }

    toggleModals(name) {
        this.querySelectorAll("[data-modal]").forEach(el => el.classList.add("hidden"))
        if (name) {
            this.querySelector(`[data-modal='${name}']`).classList.toggle("hidden")
        }
        if (name === "field") {
            this.querySelector("form").innerHTML = this.printModalFieldForm()
        }
    }

    saveField() {
        validateForm({ selector: "formpanel" })
        .then(res => {
            console.log(res[1])
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        this.constructTop()
        let html = ""
        html += "<div class='relative shadow border border-gray-300'>"
        html += this.constructConfig()
        html += this.constructLines()
        html += this.constructTop()
        html += this.constructModals()
        html += "</div>"
        this.innerHTML = html

        this.addEventListener("click", e => {
            switch (e.target.dataset.action) {
                case "modalform":
                    this.toggleModals(e.target.dataset.name)
                    break;
                case "savefield":
                    this.saveField()
                    break;
            }
        })
    }

    connectedCallback() {
        this.levels = parseFloat(this.getAttribute("levels")) || 1
        this.render()
    }
}

window.customElements.define('custom-hook-form-panel', HookFormPanel);