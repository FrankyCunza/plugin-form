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
 
const types = [
     {
          title: "Text",
          name: "text"
     },
     {
          title: "Textarea",
          name: "textarea"
     },
     {
          title: "Button",
          name: "button"
     },
     {
          title: "Checkbox",
          name: "checkbox"
     },
     {
          title: "Color",
          name: "color"
     },
     {
          title: "Date",
          name: "date"
     },
     {
          title: "Datetime Local",
          name: "datetime-local"
     },
     {
          title: "Email",
          name: "email"
     },
     {
          title: "File",
          name: "file"
     },
     {
          title: "Hidden",
          name: "hidden"
     },
     {
          title: "Image",
          name: "image"
     },
     {
          title: "Month",
          name: "month"
     },
     {
          title: "Number",
          name: "number"
     },
     {
          title: "Password",
          name: "password"
     },
     {
          title: "Radio",
          name: "radio"
     },
     {
          title: "Radio Multiple",
          name: "radio-multiple"
     },
     {
          title: "Range",
          name: "range"
     },
     {
          title: "Reset",
          name: "reset"
     },
     {
          title: "Search",
          name: "search"
     },
     {
          title: "Submit",
          name: "submit"
     },
     {
          title: "Tel",
          name: "tel"
     },
     {
          title: "Time",
          name: "time"
     },
     {
          title: "URL",
          name: "url"
     },
     {
          title: "Week",
          name: "week"
     },
     {
          title: "Select",
          name: "select"
     },
     {
          title: "H1",
          name: "h1"
     },
     {
          title: "H2",
          name: "h2"
     },
     {
          title: "H3",
          name: "h3"
     },
     {
          title: "H4",
          name: "h4"
     },
     {
          title: "H5",
          name: "h5"
     },
     {
          title: "H6",
          name: "h6"
     },
     {
          title: "Paragraph",
          name: "p"
     }
]

class Form {
     constructor(selector, { sections }) {
          this.selector = selector
          this.sections = sections
          this.forms = [
               {
                    blocks: [
                         {
                              fields: []
                         }
                    ],
                    title: "Personal Information",
                    name: "personal_information",
                    position: 2
               },
               {
                    blocks: [],
                    label: "Passport Details",
                    name: "passport_details",
                    position: 1
               },
               {
                    blocks: [],
                    label: "Test",
                    name: "test",
               },
               {
                    blocks: [],
                    label: "Test Two",
                    name: "test_two",
                    position: null
               }
          ]
          this.titles = {
               h1: {
                    class: "font-bold text-6xl"
               },
               h2: {
                    class: "font-bold text-5xl"
               },
               h3: {
                    class: "font-bold text-4xl"
               },
               h4: {
                    class: "font-bold text-3xl"
               },
               h5: {
                    class: "font-bold text-2xl"
               },
               h6: {
                    class: "font-bold text-xl"
               }
          }
          this.idFormColumns = uniqueIdForm()()
          this.indexSection = null
          this.indexBlock = null
          this.indexField = null
          this.modalSectionId = uniqueIdForm()()
          this.modalBlockId = uniqueIdForm()()
          this.modalFieldId = uniqueIdForm()()
          this.colSectionId = uniqueIdForm()()
          this.colBlockId = uniqueIdForm()()
          this.colFieldId = uniqueIdForm()()
          this.modalSectionInput = 'modalSectionInput'
          this.modalBlockInput = 'modalBlockInpuit'
          this.sectionMethod = "add"
          this.blockMethod = "add"
          this.inputClass = 'w-full px-3 focus:outline-none focus:ring-4 focus:ring-blue-400 h-12 border border-gray-300 rounded-xl w-full'
          this.types = types
          this.idFields = {
               name: "fieldName",
               info: "fieldInfo",
               alternateName: "fieldAlternateName",
               columns: "fieldColumns",
               pattern: "fieldPattern",
               type: "fieldType",
               required: "fieldRequired",
               value: "fieldValue",
               hidden: "fieldhidden"
          }
          this.idCustomFields = {
               options: "fieldOptions",
               optionsBody: "fieldOptionsBody"
          }
          this.indexSection = null;
          this.indexBlock = null;
          this.constructForm();
          switch (this.sections) {
               case 3:
                    this.printSections();
                    break;
               case 2:
                    this.indexSection = 0;
                    this.printBlocks();
                    break;
               case 1:
                    this.indexSection = 0;
                    this.indexBlock = 0;
                    this.printFields();
                    break;
               default:
                    break;
          }
          this.selectorFormColumns = document.getElementById(this.idFormColumns)
          this.selectorsFields = {
               name: document.getElementById(this.idFields.name),
               info: document.getElementById(this.idFields.info),
               alternateName: document.getElementById(this.idFields.alternateName),
               value: document.getElementById(this.idFields.value),
               columns: document.getElementById(this.idFields.columns),
               pattern: document.getElementById(this.idFields.pattern),
               type: document.getElementById(this.idFields.type),
               required: document.getElementById(this.idFields.required),
               hidden: document.getElementById(this.idFields.hidden)
          }
          this.selectorsCustomFields = {
               options: document.getElementById(this.idCustomFields.options), // FATHER OPTIONS
               optionsBody: document.getElementById(this.idCustomFields.optionsBody) // CHILD OPTIONS
          }
     }

     constructTop() {
          let htmlSection = `
               <div class="w-full">
                    <button data-action="modalForm" data-name="section" data-modaltarget="${this.modalSectionId}" class="bg-gray-50 py-3.5 font-medium focus:ring-4 focus:ring-blue-200 w-full hover:bg-blue-50 hover:text-blue-700 ring-inset">
                         Create section
                    </button>
               </div>
          `
                    let htmlBlock = `
               <div>
                    <button data-action="modalForm" data-name="block" data-modaltarget="${this.modalBlockId}" class="bg-gray-50 py-3.5 font-medium focus:ring-4 focus:ring-blue-200 w-full hover:bg-blue-50 hover:text-blue-700 ring-inset">
                         Create block
                    </button>
               </div>
          `
                    let htmlField = `
               <div>
                    <button data-action="modalForm" data-name="field" data-modaltarget="${this.modalFieldId}" class="bg-gray-50 py-3.5 font-medium focus:ring-4 focus:ring-blue-200 w-full hover:bg-blue-50 hover:text-blue-700 ring-inset">
                         Create field
                    </button>
               </div>
          `
          let htmlButtonActions = `
               <div class="grid grid-cols-${this.sections} text-gray-800 w-full">
          `
          switch (this.sections) {
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

     get Forms() {
          switch (this.sections) {
               case 1:
               case 2:
               case 3:
                    return {
                         form: this.forms,
                         columns: parseInt(parseFloat(this.selectorFormColumns.value))
                    };
                    break;
               default:
                    break;
          }
     }

     constructLines() {
          let html = "";
          html += `
          <div class="grid grid-cols-${this.sections} absolute w-full h-full pointer-events-none z-10">
          `;
          [... new Array(this.sections)].forEach((el, i) => {
               html += `
               <div class="${i < this.sections - 1 ? 'border-r border-gray-300' : ''}"></div>
          `})
          html += `
          </div>
          `
          return html
     }

     constructModals() {
          let html = ""
          let htmlModalSection = `
               <div class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-20 hidden" id="${this.modalSectionId}">
                    <div class="bg-black bg-opacity-20 absolute top-0 left-0 w-full h-full" data-action="modalForm" data-modaltarget="${this.modalSectionId}"></div>
                    <div class="bg-white p-5 rounded-xl relative max-w-3xl w-full">
                         <h2 class="font-bold text-xl text-gray-800 mb-3">Add section</h2>
                         <input type="text" id="${this.modalSectionInput}" 
                         class="${this.inputClass}" />
                         <button type="button" data-action="savesection" class="mt-3 bg-blue-600 px-4 py-3 rounded-xl text-white">Save</button>
                    </div>
               </div>
          `
          let htmlModalBlock = `
               <div class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-20 hidden" id="${this.modalBlockId}">
                    <div class="bg-black bg-opacity-20 absolute top-0 left-0 w-full h-full" data-action="modalForm" data-modaltarget="${this.modalBlockId}"></div>
                    <div class="bg-white p-5 rounded-xl relative max-w-3xl w-full">
                         <h2 class="font-bold text-xl text-gray-800 mb-3">Add block</h2>
                         <input type="text" id="${this.modalBlockInput}" 
                         class="${this.inputClass}" />
                         <button type="button" data-action="saveblock" class="mt-3 bg-blue-600 px-4 py-3 rounded-xl text-white">Save</button>
                    </div>
               </div>
          `
          let htmlTypes = ""
          this.types.forEach(el => {
               htmlTypes += `
                    <option value="${el.name}">${el.title}</option>
               `
          })
          let htmlModalField = `
               <div class="fixed w-screen h-screen top-0 left-0 py-10 flex items-center justify-center z-20 hidden" id="${this.modalFieldId}">
                    <div class="bg-black bg-opacity-20 absolute top-0 left-0 w-full h-screen" data-action="modalForm" data-modaltarget="${this.modalFieldId}"></div>
                    <div class="bg-white p-5 rounded-xl relative max-w-3xl w-full h-max overflow-y-auto" style="max-height: 90vh">
                         <h2 class="font-bold text-xl text-gray-800 mb-3">Add field</h2>
                         <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
                              <div>
                                   <label class="text-gray-800 font-medium">Name</label>
                                   <input type="text" id="${this.idFields.name}" 
                                   class="${this.inputClass}" />
                              </div>
                              <div>
                                   <label class="text-gray-800 font-medium">Info</label>
                                   <input type="text" id="fieldInfo" 
                                   class="${this.inputClass}" />
                              </div>
                              <div>
                                   <label class="text-gray-800 font-medium">Alternate Name</label>
                                   <input type="text" id="${this.idFields.alternateName}" 
                              class="${this.inputClass}" />
                              </div>
                              <div>
                                   <label class="text-gray-800 font-medium">Value</label>
                                   <input type="text" id="${this.idFields.value}" 
                              class="${this.inputClass}" />
                              </div>
                              <div>
                                   <label class="text-gray-800 font-medium">Columns</label>
                                   <select class="border border-gray-300 rounded-xl h-12 px-4 w-full" id="${this.idFields.columns}">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4" hidden>4</option>
                                   </select>
                              </div>
                              <div>
                                   <label class="text-gray-800 font-medium">Pattern</label>
                                   <input type="text" id="${this.idFields.pattern}" 
                                   class="${this.inputClass}" />
                              </div>
                              <div>
                                   <label class="text-gray-800 font-medium">Type</label>
                                   <select class="border border-gray-300 rounded-xl h-12 px-4 w-full" data-action="fieldtype" id="${this.idFields.type}">
                                        ${htmlTypes}
                                   </select>
                              </div>
                              <div>
                                   <label class="text-gray-800 font-medium">Required</label>
                                   <select class="border border-gray-300 rounded-xl h-12 px-4 w-full" id="${this.idFields.required}">
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                   </select>
                              </div>
                              <div>
                                   <label class="text-gray-800 font-medium">Hidden</label>
                                   <select class="border border-gray-300 rounded-xl h-12 px-4 w-full" id="${this.idFields.hidden}">
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                   </select>
                              </div>
                         </div>
                         <div class="flex flex-col mt-4 border border-gray-300 rounded-xl p-3 hidden" id="${this.idCustomFields.options}">
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
                                             </tr>
                                        </thead>
                                        <tbody id="${this.idCustomFields.optionsBody}"></tbody>
                                   </table>
                              </div>
                         </div>
                         <button type="button" data-action="savefield" class="mt-3 bg-blue-600 px-4 py-3 rounded-xl text-white">Save</button>
                    </div>
               </div>
          `
          html += htmlModalSection + htmlModalBlock + htmlModalField
          return html
     }

     constructBody() {
          let htmlSection = `
               <div class="w-full bg-white" data-section="section" id="${this.colSectionId}">

          </div>
          `
          let htmlBlock = `
               <div class="w-full bg-white" data-section="block" id="${this.colBlockId}">

          </div>
          `
          let htmlField = `
               <div class="w-full bg-white" data-section="field" id="${this.colFieldId}">

          </div>
          `
          let html = ""
          html += `<div class="grid grid-cols-${this.sections}">`
          switch (this.sections) {
               case 1:
                    html += htmlField
                    break;
               case 2:
                    html += htmlBlock + htmlField
                    break;
               case 3:
                    html += htmlSection + htmlBlock + htmlField
                    break;
               default:
                    break;
          }
          html += `</div>`
          return html
     }

     button({ index, column, el }) {
          let htmlField = ""
          if (column === "field") {
               switch (el.type) {
                    case "field_text":
                    case "field_date":
                    case "field_hour":
                    case "field_address":
                    case "field_email":
                    case "field_password":
                    case "field_file":
                    case "field_number":
                    case "checkbox":
                    case "color":
                    case "date":
                    case "datetime-local":
                    case "email":
                    case "file":
                    case "hidden":
                    case "month":
                    case "number":
                    case "password":
                    case "radio":
                    case "range":
                    case "reset":
                    case "search":
                    case "submit":
                    case "tel":
                    case "text":
                    case "time":
                    case "url":
                    case "checkbox":
                         htmlField = `<input ${el.type == "image" ? `src="${el.value}"` : ""} type="${el.type.includes("field_") ? el.type.split("field_")[1] : el.type}" class="${this.inputClass}" placeholder="${el.placeholder || ""}" />`
                         break;
                    case "image":
                         htmlField = `<input src="${el.value}" type="image" class="w-full" placeholder="${el.placeholder || ""}" />`
                         break;
                    case "textarea":
                         htmlField = `<textarea class="${this.inputClass} py-2" placeholder="${el.placeholder || ""}"></textarea>` ;
                         break;
                    case "select":
                    case "field_select":
                         if (el?.options.length > 0) {
                              htmlField += `<select class="${this.inputClass}">`
                              el?.options.forEach(el => {
                                   htmlField += `
                                        <option>${el.title}</option>
                                   `
                              })
                              htmlField += `</select>`
                         }
                         break;
                    case "h6":
                    case "h5":
                    case "h4":
                    case "h3":
                    case "h2":
                    case "h1":
                    case "H6":
                    case "H5":
                    case "H4":
                    case "H3":
                    case "H2":
                    case "H1":
                         htmlField += `<${el.type.toLowerCase()} class="${this.titles[el.type.toLowerCase()].class}">${el.label || el.title}</${el.type.toLowerCase()}>`
                         break;
                    case "p":
                         htmlField += `<p class="text-base">${el.label || el.title}</p>`
                         break;
                    default:
                         break;
               }
          }
          return `
               <button data-action="${column}" data-index="${index}" class="px-2 py-6 hover:bg-gray-50 cursor-pointer flex h-22 justify-between items-center border-b border-gray-300 w-full ring-inset focus:outline-none focus:ring-2 focus:ring-blue-200 relative text-left">
                    <div class="flex flex-col w-full ${column !== "field" ? "pointer-events-none" : ""}">
                    <div class="pointer-events-none">
                         ${el.label || el.title} ${el.required == true ? "*" : ""}
                    </div>
               ${htmlField}
               </div>
               <div class="flex gap-1.5 absolute top-1 right-1.5">
                    <div data-action="edit${column}" data-position="${el.position}" data-index="${index}" class="text-xs font-medium text-blue-600">Edit</div>
                    <div data-action="delete${column}" data-position="${el.position}" data-index="${index}" class="text-xs font-medium text-red-600">Delete</div>
                    <div data-action="moveup${column}" data-position="${el.position}" data-index="${index}" class="text-xs font-medium text-yellow-600">Up</div>
                    <div data-action="movedown${column}" data-position="${el.position}" data-index="${index}" class="text-xs font-medium text-yellow-600">Down</div>
               </div>
          </button>
          `
     }

     printSections() {
          const selector = document.getElementById(this.colSectionId)
          let html = ""
          if (this.forms.length > 0) {
               this.forms = this.resetPositions(this.forms)
               this.forms.forEach((el, i) => {
                    html += this.button({ index: i, column: 'section', el })
               })
          } else {
               html = "Without data"
          }
          /* selector.insertAdjacentHTML("beforeend", "Nice") */
          selector.innerHTML = html
     }

     printBlocks() {
          const selector = document.getElementById(this.colBlockId)
          let html = ""
          if (this.forms[this.indexSection]['blocks']?.length > 0) {
               this.forms[this.indexSection]['blocks'] = this.resetPositions(this.forms[this.indexSection]['blocks'])
               this.forms[this.indexSection]['blocks'].forEach((el, i) => {
                    html += this.button({ index: i, column: 'block', el })
               })
          } else {
               html = "Without data"
          }
          selector.innerHTML = html
     }

     printFields() {
          const selector = document.getElementById(this.colFieldId)
          let html = ""
          if (this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'].length > 0) {
               this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'] = this.resetPositions(this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'])
               this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'].forEach((el, i) => {
                    html += this.button({ index: i, column: 'field', el })
               })
          } else {
               html = "Without data"
          }
          selector.innerHTML = html
     }

     saveSection() {
          const value = document.getElementById(this.modalSectionInput).value
          let data = {
               label: value,
               name: value,
               blocks: []
          }
          if (value) {
               if (this.sectionMethod === "add") {
                    this.forms.push(data)
               } else {
                    this.forms[this.indexSection].label = value
                    this.forms[this.indexSection].name = value
               }
          }
          document.getElementById(this.modalSectionId).classList.toggle("hidden")
          this.printSections()
     }

     saveBlock() {
          const value = document.getElementById(this.modalBlockInput).value
          let data = {
               label: value,
               name: value,
               fields: []
          };
          if (value) {
               if (this.blockMethod === "add") {
                    this.forms[this.indexSection]['blocks'].push(data);
               } else {
                    this.forms[this.indexSection]['blocks'][this.indexBlock].label = value;
                    this.forms[this.indexSection]['blocks'][this.indexBlock].name = value;
               }
          }
          document.getElementById(this.modalBlockId).classList.toggle("hidden")
          this.printBlocks()
     }

     saveField() {
          const label = this.selectorsFields.name.value
          let name = this.selectorsFields.name.value
          if (this.selectorsFields.alternateName.value === '') {
               name = this.selectorsFields.name.value.toLowerCase().replace(/\s{1,}/g, '_').replace(/[^\w\s]/gi, '');
          }
          else {
               name = this.selectorsFields.alternateName.value
          }
          const info = this.selectorsFields.info.value
          const alternateName = this.selectorsFields.alternateName.value
          const columns = this.selectorsFields.columns.value
          const pattern = String.raw`${this.selectorsFields.pattern.value}`
          const type = this.selectorsFields.type.value
          const required = this.selectorsFields.required.value == "true" ? true :  false
          const hidden = this.selectorsFields.hidden.value == "true" ? true :  false
          const value = this.selectorsFields.value.value
          const options = this.options
          if (label) {
               if (this.fieldMethod === "add") {
                    this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'].push({
                         label,
                         name,
                         info,
                         alternateName,
                         value,
                         columns,
                         pattern,
                         type,
                         required,
                         hidden,
                         position: this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'].length + 1,
                         options
                    })
               } else {
                    let item = this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'][this.indexField]
                    item.label = label
                    item.name = name
                    item.info = info
                    item.alternateName = alternateName
                    item.value = value
                    item.columns = columns
                    item.pattern = pattern
                    item.type = type
                    item.required = required
                    item.hidden = hidden
                    item.options = options
               }
          }
          document.getElementById(this.modalFieldId).classList.toggle("hidden")
          this.printFields()
          console.log(JSON.stringify(this.forms[this.indexSection]['blocks'][this.indexBlock]['fields']))
     }

     deleteSection() {
          delete this.forms[this.indexSection]
          let res = this.forms.filter(el => el !== undefined)
          this.forms = res
          this.printSections()
     }

     deleteBlock() {
          delete this.forms[this.indexSection]['blocks'][this.indexBlock]
          let res = this.forms[this.indexSection]['blocks'].filter(el => el !== undefined)
          this.forms[this.indexSection]['blocks'] = res
          this.printBlocks()
     }

     deleteField() {
          delete this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'][this.indexField]
          let res = this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'].filter(el => el !== undefined)
          this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'] = res
          this.printFields()
     }

     editSection() {
          let section = this.forms[this.indexSection]
          document.getElementById(this.modalSectionId).classList.toggle("hidden")
          document.getElementById(this.modalSectionInput).value = section.label || section.title
     }

     editBlock() {
          let block = this.forms[this.indexSection]['blocks'][this.indexBlock]
          document.getElementById(this.modalBlockId).classList.toggle("hidden")
          document.getElementById(this.modalBlockInput).value = block.label
     }

     editField() {
          let field = this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'][this.indexField]
          this.selectorsFields.name.value = field.label || ""
          this.selectorsFields.info.value = field.info || ""
          this.selectorsFields.alternateName.value = field.alternateName || ""
          this.selectorsFields.value.value = field.value || ""
          this.selectorsFields.columns.value = field.columns || ""
          this.selectorsFields.pattern.value = field.pattern || ""
          this.selectorsFields.type.value = field.type || ""
          this.selectorsFields.required.value = field.required+"" || ""
          this.customFields(field.type)
          document.getElementById(this.modalFieldId).classList.toggle("hidden")
          this.addOption(field?.options)
     }

     modalForm(e) {
          const name = e.target.dataset.name
          switch (name) {
               case "section":
                    document.getElementById(this.modalSectionInput).value = ""
                    break;
               case "block":
                    document.getElementById(this.modalBlockInput).value = ""
                    if (this.indexSection < 0 || this.indexSection === null || this.indexSection === undefined) {
                         alert("Por favor seleccione una sección")
                         return false;
                    }
                    break;
               case "field":
                    if (this.indexBlock < 0 || this.indexBlock === null || this.indexBlock === undefined) {
                         alert("Por favor seleccione un bloque")
                         return false;
                    }
                    break;
               default:
                    break;
          }
          document.getElementById(e.target.dataset.modaltarget).classList.toggle("hidden")
     }

     resetPositions(data) {
          if (data.length <= 0 || JSON.stringify(data) === "{}" || JSON.stringify(data).startsWith("{")) {
               return  []
          }
          let lastPosition = data.filter(el => el.position >= 1).length
          let newData = data.map(el => {
               if (!el.position) {
                    lastPosition++
                    el.position = parseFloat(lastPosition)
               } else {
                    el.position = parseFloat(el.position)
               }
               return el
          }).sort(function (a, b) {
               return a.position - b.position
          })
          for (let i=0; i < newData.length; i++) {
               newData[i].position = i + 1
          }
          // console.log(newData)
          return newData
     }

     moveItem( { array, arrow, position } ) {
          array = this.resetPositions(array)
          if (arrow === "up") {
               if (position === 1) {
                    array.map(el => {
                         if (el.position === 1) {
                              el.position = array.length
                         } else  {
                              el.position = el.position - 1
                         }
                         return el;
                    })
               } else {
                    array.map(el => {
                         if (el.position === position) {
                              el.position = position - 1
                         } else if (el.position === (position-1)) {
                              el.position = el.position + 1
                         }
                         return el;
                    })
               }
               return array
          }

          if (arrow === "down") {
               if (position === array.length) {
                    array.map(el => {
                         if (el.position == array.length) {
                              el.position = 1
                         } else {
                              el.position = el.position + 1
                         }
                         return el;
                    })
               } else {
                    array.map(el => {
                         if (el.position == position) {
                              el.position = (position+1)
                         } else if (el.position == (position + 1)) {
                              el.position = (el.position-1)
                         }
                         return el;
                    })
               }
               return array
          }
     }

     move( { column, arrow, position } ) {
          switch (column) {
               case "section":
                    this.forms = this.moveItem( { array: this.forms, arrow, position } )
                    this.printSections();
                    break;
               case "block":
                    this.forms[this.indexSection]['blocks'] = this.moveItem( { array: this.forms[this.indexSection]['blocks'], arrow, position } )
                    this.printBlocks();
                    break;
               case "field":
                    this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'] = this.moveItem( { array: this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'], arrow, position } )
                    this.printFields()
                    break;
               default:
                    break;
          }
     }

     customFields(type) {
          switch (type) {
               case "select":
               case "field_select":
               case "checkbox":
               case "radio-multiple":
                    this.selectorsCustomFields.options.classList.remove("hidden")
                    break;
               default:
                    this.selectorsCustomFields.options.classList.add("hidden")
                    break;
          }
     }

     resetForms(data) {
          this.forms = this.resetPositions(data)
          this.printSections()
     }

     resetSections() {

     }

     resetFields(data) {
          switch (this.sections) {
               case 3:
                    break;
               case 2:
                    break;
               case 1:
                    this.forms[this.indexSection]['blocks'][this.indexBlock]['fields'] = this.resetPositions(data)
                    this.printFields();
                    break;
               default:
                    break;
          }
     }

     get options() {
          let children = this.selectorsCustomFields.optionsBody.children
          let array = []
          for (let i = 0; i < children.length; i++) {
               array.push({
                    title: children[i].children[0].children[0].value,
                    value: children[i].children[1].children[0].value,
                    icon: children[i].children[2].children[0].value,
               })
          }
          return array
     }

     optionHTML(option) {
          return `
          <tr class="h-12 border-t border-gray-300">
               <td class="p-3">
                    <input type="text" value="${option?.title || ""}" placeholder="Name" class="${this.inputClass}" />
               </td>
               <td class="p-3 relative">
                    <input type="text" value="${option?.value || ""}" placeholder="Value" class="${this.inputClass}" />
               </td>
               <td class="p-3 relative">
                    <input type="text" value="${option?.icon || ""}" placeholder="Value" class="${this.inputClass}" />
                    <button data-action="deleteoption" class="w-8 h-8 bg-red-200 text-red-800 rounded flex items-center justify-center absolute top-5 right-5"><i class="fas fa-trash pointer-events-none"></i></button>
               </td>
          </tr>
          `
     }

     addOption(array = []) {
          const insert = (option) => {
               this.selectorsCustomFields.optionsBody.insertAdjacentHTML("beforeend", this.optionHTML(option))
          }
          if (array && array.length > 0) {
               this.selectorsCustomFields.optionsBody.innerHTML = ""
               array.forEach(el => {
                    insert(el)
               })
          } else {
               insert()
          }
     }

     deleteOption(e) {
          e.target.parentElement.parentElement.remove()
     }

     constructForm() {
          let html = `
               <div class="flex flex-col gap-3">
                    <div>
                         <label class="font-medium block">Columns</label>
                         <input type="number" id="${this.idFormColumns}" class="border focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-lg p-3 ring-inset" placeholder="columns" />
                    </div>
                    <div class="flex flex-col relative">
                         ${this.constructLines()}
                         ${this.constructTop()}
                         ${this.constructBody()}
                    </div>
               </div>
               ${this.constructModals()}
          `
          document.getElementById(this.selector).innerHTML = `${html}`
          document.body.addEventListener("click", e => {
               switch (e.target.dataset.action) {
                    case "section":
                         this.indexSection = e.target.dataset.index
                         this.printBlocks()
                         break;
                    case "block":
                         this.indexBlock = e.target.dataset.index
                         this.printFields()
                         break;
                    case "editsection":
                         this.indexSection = e.target.dataset.index
                         this.sectionMethod = "edit"
                         this.editSection()
                         break;
                    case "editblock":
                         this.indexBlock = e.target.dataset.index
                         this.blockMethod = "edit"
                         this.editBlock()
                         break;
                    case "editfield":
                         this.indexField = e.target.dataset.index
                         this.fieldMethod = "edit"
                         this.editField();
                         break;
                    case "savesection":
                         this.saveSection()
                         break;
                    case "saveblock":
                         this.saveBlock()
                         break;
                    case "savefield":
                         this.saveField();
                         break;
                    case "deletesection":
                         this.indexSection = e.target.dataset.index
                         this.deleteSection()
                         break;
                    case "deleteblock":
                         this.indexBlock = e.target.dataset.index
                         this.deleteBlock()
                         break;
                    case "deletefield":
                         this.indexField = e.target.dataset.index;
                         this.deleteField();
                         break;
                    case "moveupsection":
                         this.indexSection = e.target.dataset.index
                         this.move({ column: "section", arrow: "up", position: parseFloat(e.target.dataset.position) })
                         break;
                    case "movedownsection":
                         this.indexSection = e.target.dataset.index
                         this.move({ column: "section", arrow: "down", position: parseFloat(e.target.dataset.position) })
                         break
                    case "moveupblock":
                         this.indexBlock = e.target.dataset.index
                         this.move({ column: "block", arrow: "up", position: parseFloat(e.target.dataset.position) })
                         break;
                    case "movedownblock":
                         this.indexBlock = e.target.dataset.index
                         this.move({ column: "block", arrow: "down", position: parseFloat(e.target.dataset.position) })
                         break;
                    case "moveupfield":
                         this.indexField = e.target.dataset.index
                         this.move({ column: "field", arrow: "up", position: parseFloat(e.target.dataset.position) })
                         break;
                    case "movedownfield":
                         this.indexField = e.target.dataset.index
                         this.move({ column: "field", arrow: "down", position: parseFloat(e.target.dataset.position) })
                         break;
                    case "modalForm":
                         this.sectionMethod = "add";
                         this.blockMethod = "add";
                         this.fieldMethod = "add";
                         this.modalForm(e);
                         break;
                    case "addOption":
                         this.addOption();
                         break;
                    case "deleteoption":
                         this.deleteOption(e)
                         break;
                    default:
                         break;
               }
          });

          document.body.addEventListener("change", e => {
               switch (e.target.dataset.action) {
                    case "fieldtype":
                         this.customFields(e.target.value)
                         break;
                    default:
                         break;
               }
          })
          /* document.body.insertAdjacentHTML("beforeend", this.constructScript()) */
          /*  document.getElementById(this.selector).insertAdjacentHTML("beforeend", this.constructScript()) */
     }
}

function Forms({ form_builder, selector, key_parent, columns, values = {}, showButtonSubmit = false }) {
     const info = (info) => {
          return `
            <div class="ml-2">
                <div class="w-5 h-5 bg-gray-100 text-gray-700 flex items-center justify-center rounded-full text-xs tooltip relative cursor-pointer">
                    <i class="fas fa-info"></i>
                    <p class="text-xs mb-1 absolute p-2 rounded-md -top-10 hidden whitespace-nowrap bg-gray-700 text-white border border-gray-300">${info}</p>
                </div>
            </div>`
     }

     const label = (label, info) => {
          return label.length > 0 ? `<div class="flex items-center mb-0.5">${label} ${info}</div>` : ''
     }

     const classInput = "bg-white placeholder-gray-500 w-full border border-gray-300 hover:border-blue-600 py-2.5 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"

     let html = ''
     html += `
          <style>
               .tooltip:hover p {
                    display: flex;
               }
               .form__checkbox + div {
                    min-height: 120px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    background: #ffff;
                    outline: 1px solid #ccc;
               }
               .form__checkbox:checked + div {
                    outline: 2px solid blue;
                    color: blue;
                    font-weight: bold;
               }
               .form__checkbox:checked + div div {
                    display: flex
               }
          </style>
    `
     const printForms = () => {
          html += `<div class="grid grid-cols-1 md:grid-cols-${columns} gap-3 items-end">`
          let checked = '<span class="hidden absolute bottom-4 text-green-500 right-2 pointer-events-none iconvalidation"><i class="fas fa-check"></i></span>'
          let warning = '<span class="hidden absolute bottom-4 text-red-500 right-2 pointer-events-none iconvalidation"><i class="fas fa-exclamation-triangle"></i></span>'
          JSON.stringify(form_builder).startsWith("{") ? "" : form_builder?.forEach((el, i) => {
               let htmlDataAttributes = ""
               if (el.hasOwnProperty("data_attributes")) {
                    Object.entries(el?.data_attributes).forEach(([key, value]) => {
                         htmlDataAttributes += `data-${key}='${value}'`
                    })
               }
               switch (el.type) {
                    case "field_text":
                    case "field_date":
                    case "field_hour":
                    case "field_address":
                    case "field_email":
                    case "field_password":
                    case "field_file":
                    case "field_number":
                    case "date":
                    case "datetime-local":
                    case "email":
                    case "file":
                    case "hidden":
                    case "month":
                    case "number":
                    case "password":
                    case "range":
                    case "reset":
                    case "search":
                    case "submit":
                    case "tel":
                    case "text":
                    case "time":
                    case "url":
                         html += `
                              <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"">
                                   ${el.label && label(`<label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required ? '*' : ''}</label>`, el.info ? info(el.info) : '')}                            
                                   ${warning}
                                   <input value="${values[el?.name] ? values[el.name] : el.value || ""}" ${el.type == "image" ? `src='${el.value}'` : ""} type="${el.type.includes("field_") ? el.type.split("field_")[1] : el.type}" ${el.type == "file" ? 'multiple' : ''} data-fullkey="${key_parent || ""}${el.name}" name="${el.name}" ${htmlDataAttributes} data-alternatename="${el.alternate_name || el.alternateName || ""}" pattern="${el.pattern}" data-required="${el.required || false}" data-placeholder="${el.placeholder || el.label}" autocomplete="${el.name}" 
                                   class="${classInput}">
                                   ${checked}
                              </div>
                         `
                         break;
                    case "color":
                         html += `
                      <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"">
                        ${label(`<label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required ? '*' : ''}</label>`, el.info ? info(el.info) : '')}     
                        ${warning}
                        <input value="${el.value}" type="color" name="${el.name}" class="w-full h-8">
                        ${checked}
                      </div>
                      `
                         break;
                    case "image":
                         html += `
                              <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"">
                                   ${label(`<label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required ? '*' : ''}</label>`, el.info ? info(el.info) : '')}     
                                   <input src="${el.value}" type="image" name="${el.name}" class="w-full">
                              </div>
                         `
                         break;
                    case 'field_select':
                    case 'select':
                         html += `
                              <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"">
                              ${label(`<label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required ? '*' : ''}</label>`, el.info ? info(el.info) : '')} 
                              ${warning}
                              <select type="${types[el.type]}" value="${values[el?.name] ? values[el.name] : el.value || ""}" data-fullkey="${key_parent || ""}${el.name}" name="${el.name}" ${htmlDataAttributes} data-alternatename="${el.alternate_name || el.alternateName || ""}"  data-required="${el.required}" data-placeholder="${el.placeholder || el.label}" autocomplete="${el.name}" 
                              class="${classInput}">
                         `
                         html += `<option hidden value="">Select</option>`
                         el?.options && el?.options?.forEach(ele => {
                              let htmlDataAttributesByOptions = ""
                              if (ele.hasOwnProperty("data_attributes")) {
                                   Object.entries(ele?.data_attributes).forEach(([key, value]) => {
                                        htmlDataAttributesByOptions += `data-${key}=${value} `
                                   })
                              }
                              html += `
                            <option value="${ele.value}" ${values[el?.name] == ele.value ? "selected" : ""} ${htmlDataAttributesByOptions}>${ele.title}</option>
                        `
                         })
                         html += `
                        </select>
                        ${checked}
                    </div>
                    `
                         break
                    case 'field_radio':
                    case 'radio':
                         html += `
                         <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"">
                              ${label(`<label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required ? '*' : ''}</label>`, el.info ? info(el.info) : '')} 
                              <div class="flex">
                                   <div>
                                        <label class="flex border border-gray-200 px-3 cursor-pointer py-2 rounded-xl w-max items-center">
                                             <input type="radio" class="cursor-pointer" name="${el.name}" data-value="true" ${htmlDataAttributes} data-alternatename="${el.alternate_name || el.alternateName || ""}" />
                                             <span class="ml-2">Yes</span>
                                        </label>
                                   </div>
                                   <div class="ml-2">
                                        <label class="flex border border-gray-200 px-3 cursor-pointer py-2 rounded-xl w-max items-center">
                                             <input type="radio" class="cursor-pointer" name="${el.name}" data-value="false" ${htmlDataAttributes} data-alternatename="${el.alternate_name || el.alternateName || ""}" />
                                             <span class="ml-2">No</span>
                                        </label>
                                   </div>
                              </div>
                         </div>
                         `
                         break;
                    case 'radio-multiple':
                         let htmlOptions = ""
                         el?.options.forEach((check, i) => {
                              htmlOptions += `
                                   <label class="bg-gray-50 hover:bg-gray-100 p-4 border border-gray-300 rounded-xl relative cursor-pointer">
                                        <input type="radio" data-multiple=true class="cursor-pointer" 
                                             data-multiple="true" 
                                             data-keyparent="${el.name}" 
                                             data-value=${check.value}
                                             data-fullkey="${key_parent || "" + check.title}" 
                                             name="${el.name}" ${htmlDataAttributes} 
                                             data-alternatename="${check.alternate_name || ""}" />
                                        <span class="text-left">${check.title}</span>
                                   </label>
                              `
                         })
                         html += `
                         <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"">
                              ${label(`<label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required ? '*' : ''}</label>`, el.info ? info(el.info) : '')} 
                              <div class="flex flex-col gap-2">
                                   ${htmlOptions}
                              </div>
                         </div>
                         `
                         break;
                    case 'field_checkboxes':
                    case 'field_checkbox':
                    case "checkbox":
                         let htmlChekboxes = ""
                         el?.options?.length > 0 ? el?.options.forEach(check => {
                              htmlChekboxes += `
                                   <div class="relative flex rounded-xl w-full">
                                        <input type="checkbox" class="cursor-pointer focus:outline-none focus:ring-4 ring-inset rounded-xl focus:ring-blue-200 absolute w-full h-full appearance-none form__checkbox" data-multiple="true" data-keyparent="${el.name}" data-fullkey="${key_parent || "" + check.title}" name="${check.title}" ${htmlDataAttributes} data-alternatename="${check.alternate_name || ""}" />
                                        <div class="text-sm rounded-xl">
                                             <div class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-sm bg-opacity-30 rounded-full bg-white hidden">
                                                  <i class="fas fa-check"></i>
                                             </div>
                                             ${check.title}
                                        </div>
                                   </div>
                              `
                         }) :
                              htmlChekboxes += `
                              <div class="relative w-full grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"">
                                   <label class="flex w-full items-center py-4 border rounded-xl px-4 cursor-pointer">
                                        ${warning}
                                        <input type="checkbox" data-multiple="false" class="cursor-pointer" data-fullkey="${key_parent + el.name}" name="${el.name}" data-required="${el.required && 'true'}" />
                                        ${checked}
                                        <p class="ml-2">${el.label} ${el.required ? '*' : ''}</p>
                                   </label>
                              </div>
                              `
                         html += `
                              <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"">
                                   <label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required ? '*' : ''}</label>
                                   <div class="grid ${el?.options?.length > 0 ? "grid-cols-4 gap-3" : ""} w-full mt-1">
                                        ${htmlChekboxes}
                                   </div>
                              </div>
                         `
                         break
                    case 'field_textarea':
                    case 'textarea':
                         html += `
                         <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}" ${el.hide ? 'hidden' : ''}" name="blockform${el.name}">
                              ${label(`<label class="font-semibold mb-0 text-sm block text-gray-600">${el.label} ${el.required ? '*' : ''}</label>`, el.info ? info(el.info) : '')} 
                              ${warning}
                              <textarea data-fullkey="${key_parent || "" + el.name}" spellcheck="false" autocomplete="off" name="${el.name}" ${htmlDataAttributes} data-alternatename="${el.alternate_name || el.alternateName || ""}" pattern="${el.pattern}" data-required="${el.required}" data-placeholder="${el.placeholder || el.label}" autocomplete="${el.name}" 
                              class="${classInput}"></textarea>
                              ${checked}
                         </div>
                         `
                         break;
                    case 'button':
                         html += `
                         <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}" ${el.hide ? 'hidden' : ''}" name="blockform${el.name}">
                              <button type="button" class="${classInput} bg-blue-600 text-white"
                              data-fullkey="${key_parent || ""}${el.name}" name="${el.name}" ${htmlDataAttributes} data-alternatename="${el.alternate_name || el.alternateName || ""}">${el.label}</button>
                         </div>
                         `
                         break;
                    case 'h1':
                    case 'H1':
                         html += `
                     <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"" name="${el.name}">
                         <h1 class="text-6xl font-bold">${el.label}</h1>
                     </div>
                     `
                         break
                    case 'h2':
                    case 'H2':
                         html += `
                     <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"" name="${el.name}">
                         <h2 class="text-5xl font-bold">${el.label}</h2>
                     </div>
                     `
                         break
                    case 'h3':
                    case 'H3':
                         html += `
                     <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"" name="${el.name}">
                         <h3 class="text-4xl font-bold">${el.label}</h3>
                     </div>
                     `
                         break
                    case 'h4':
                    case 'H4':
                         html += `
                         <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"" name="${el.name}">
                         <h4 class="text-3xl font-bold">${el.label}</h4>
                         </div>
                         `
                         break
                    case 'h5':
                    case 'H5':
                         html += `
                         <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"" name="${el.name}">
                         <h5 class="text-2xl font-bold">${el.label}</h5>
                         </div>
                         `
                         break
                    case 'h6':
                    case 'H6':
                         html += `
                         <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"" name="${el.name}">
                         <h6 class="text-xl font-bold">${el.label}</h6>
                         </div>
                         `
                         break
                    case 'p':
                         html += `
                     <div class="relative grid col-span-${el.columns ? el.columns : '3'} ${el.hidden && "hidden"}"" name="${el.name}">
                         <p>${el.label}</p>
                     </div>
                     `
                         break
                    default:
                         break
               }
          })
          html += `</div>`
          html += `
               <button type="button" class="mt-3 hidden w-full bg-blue-600 rounded-lg py-3 text-white font-medium">Send</button>
          `
     }
     printForms()
     if (selector) {
          document.getElementById(selector).innerHTML = html
     } else {
          return html
     }
}

function constructFormValues({ builder, values }) {
     let types = {}
     builder.forEach(el => {
          types[el.name] = {
               type: el.type,
               title: el.label
          }
     })
     let html = ''
     html += `<div class="grid grid-cols-1 gap-2">`
     Object.entries(values).forEach(([key, value]) => {
          if (builder.length > 0 && types[key]) {
               switch (types[key].type) {
                    case "field_text":
                    case "field_date":
                    case "field_hour":
                    case "field_address":
                    case "field_email":
                    case "field_password":
                    case "field_number":
                    case "field_select":
                    case "color":
                    case "date":
                    case "datetime-local":
                    case "email":
                    case "hidden":
                    case "image":
                    case "month":
                    case "number":
                    case "password":
                    case "range":
                    case "reset":
                    case "search":
                    case "tel":
                    case "text":
                    case "time":
                    case "url":
                    case "select":
                    case "textarea":
                    case "p":
                    case "h1":
                    case "h2":
                    case "h3":
                    case "h4":
                    case "h5":
                    case "h6":
                    case "H1":
                    case "H2":
                    case "H3":
                    case "H4":
                    case "H5":
                    case "H6":
                         html += `
                              <div>
                                   <h2 class="font-semibold">${types[key].title}</h2>
                                   <p>${value ? value : 'Empty.'}</p>
                              </div>
                         `
                         break;
                    case "radio":
                         html += `
                              <div>
                                   <h2 class="font-semibold">${types[key].title}</h2>
                                   <p>${value ? "Si" : 'No'}</p>
                              </div>
                         `
                         break;
                    case "checkbox":
                    case "field_checkbox":
                    case "field_checkboxes":
                         let htmlValues = ""
                         if (typeof value == "boolean") {
                              htmlValues = value ? "Si" : "No"
                         } else {
                              htmlValues += `
                              <table class="max-w-sm rounded border-l border-r border-b w-full text-sm">
                                   <tbody>`
                              Object.entries(value).forEach(([key, value]) => {
                                   htmlValues += `
                                   <tr class="border-t">
                                        <td class="p-2 font-semibold bg-gray-50 border-r">${key}</td>
                                        <td class="p-2 w-12">
                                             ${value ? "<i class='fas fa-check text-green-600'></i>" : "<i class='fas fa-times text-red-600'></i>"}
                                        </td>
                                   </tr>
                              `
                              })
                              htmlValues += `
                                   </tbody>
                              </table>`
                         }
                         html += `
                              <div>
                                   <h2 class="font-semibold">${types[key].title}</h2>
                                   <div class="flex flex-col">
                                        ${htmlValues}
                                   </div>
                              </div>
                         `
                         break;
                    case "field_file":
                    case "file":
                         let files = ''
                         value.length > 0 && value.forEach(el => {
                              files += `
                                        <a class="flex rounded px-2 py-1 bg-gray-50 w-max border border-solid border-gray-400" href="/static/uploads/${el.split('uploads/')[1]}" target="_blank">${el.split('uploads/')[1]}</a>
                                   `
                         })
                         html += `
                              <div>
                                   <h2 class="font-semibold">${types[key].title}</h2>
                                   <div class="flex">
                                        ${files}
                                   </div>
                              </div>
                              `
                         break;
                    default:
                         break;
               }
          }
     })
     html += `</div>`
     return html
}

async function validateForm({ selector, form_builder, name }) {
     const selectorForm = document.getElementById(selector)
     let forms = selectorForm.elements
     let fd = new FormData()
     let filenames = []
     let form = {}

     const error = (e) => {
          e.classList.remove('border-gray-300')
          e.classList.add('border-red-400')
          e.previousElementSibling.classList.remove("hidden")
          e.nextElementSibling.classList.add("hidden")
     }
     const success = (e) => {
          e.classList.add('border-gray-300')
          e.classList.remove('border-red-400')
          e.previousElementSibling.classList.add("hidden")
          e.nextElementSibling.classList.remove("hidden")
     }

     let promise = new Promise((resolve, reject) => {
          let checked = []
          for (let i = 0; i < forms.length; i++) {
               let field = form_builder.find(el => el.name == forms[i].getAttribute("name"))
               switch (forms[i].type) {
                    case "field_text":
                    case "field_date":
                    case "field_hour":
                    case "field_address":
                    case "field_email":
                    case "field_password":
                    case "field_file":
                    case "field_number":
                    case "date":
                    case "datetime-local":
                    case "email":
                    case "color":
                    case "hidden":
                    case "month":
                    case "number":
                    case "password":
                    case "range":
                    case "reset":
                    case "search":
                    case "tel":
                    case "text":
                    case "time":
                    case "url":
                    case "textarea":
                    case "select-one":
                         form[forms[i].getAttribute(name || "name")] = forms[i].value
                         fd.append(forms[i].getAttribute(name || "name"), forms[i].value)
                         if(field?.skipValidation == true) {
                              
                         } else {
                              if (forms[i].dataset.required == 'true' && forms[i].getAttribute("pattern")) {
                                   let patt = field.pattern
                                   const [, pattern, flags] = patt.match(/\/(.*)\/([a-z]*)/);
                                   const regex = new RegExp(pattern, flags);
                                   if (!regex.test(forms[i].value)) {
                                        error(forms[i])
                                        checked.push(false)
                                   } else {
                                        success(forms[i])
                                   }
                              } else if (forms[i].dataset.required == 'true' && !forms[i].value) {
                                   error(forms[i])
                                   checked.push(false)
                              } else {
                                   success(forms[i])
                              }
                         }
                         break;
                    case "radio":
                         if (!forms[i].dataset.multiple) {
                              const radioButtons = document.querySelectorAll(`input[name="${forms[i].name}"]`);
                              let selected;
                              for (const radioButton of radioButtons) {
                                   if (radioButton.checked) {
                                        selected = radioButton.getAttribute("data-value");
                                        break;
                                   }
                              }
                              form[forms[i].getAttribute("name")] = selected == "true" ? true : false  
                              fd.append(forms[i].getAttribute("name"), selected == "true" ? true : false)
                         } else {
                              const radioButtons = document.querySelectorAll(`input[name="${forms[i].name}"]`);
                              let selected;
                              for (const radioButton of radioButtons) {
                                   if (radioButton.checked) {
                                        selected = radioButton.getAttribute("data-value");
                                        break;
                                   }
                              }
                              form[forms[i].getAttribute("name")] = selected  
                              fd.append(forms[i].getAttribute("name"), selected)
                         }
                         break;
                    case "field_checkboxes":
                    case "field_checkbox":
                    case "checkbox":
                         if (forms[i].getAttribute("data-multiple") == "true") {
                              form[forms[i].getAttribute("data-keyparent")] = { ...form[forms[i].getAttribute("data-keyparent")] }
                              form[forms[i].getAttribute("data-keyparent")][forms[i].getAttribute(name || "name")] = forms[i].checked
                         } else {
                              form[forms[i].getAttribute("name")] = forms[i].checked
                              fd.append(forms[i].getAttribute("name"), forms[i].checked)
                              if (!forms[i].checked && forms[i].dataset.required == 'true') {
                                   error(forms[i])
                                   checked.push(false)
                              } else {
                                   success(forms[i])
                              }
                         }
                         break;
                    case "file":
                         form[forms[i].getAttribute("name")] = ''
                         if (forms[i].dataset.required == 'true' && forms[i].files.length <= 0) {
                              error(forms[i])
                              checked.push(false)
                         } else {
                              success(forms[i])
                              for (let s = 0; s < forms[i].files.length; s++) {
                                   fd.append("files[]", forms[i].files[s])
                                   filenames.push(forms[i].getAttribute("name"))
                              }
                         }
                         break;
                    default:
                         break;
               }
          }
          if (!checked.length > 0) {
               fd.append('filenames', JSON.stringify({ 'file_details': filenames }))
               resolve([fd, form])
          } else {
               reject(false)
          }
     })
     return await promise;
}