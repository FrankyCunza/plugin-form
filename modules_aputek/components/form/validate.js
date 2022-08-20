export async function validateForm({ selector, form_builder = [], name = "", validateIndexes = [] }) {
    const formInfo = document.querySelector(`${selector.startsWith("[") ? selector : "[id='${selector}']"} [data-info]`)
    // let quantityFields = document.querySelectorAll(`[data-allfields='${formInfo.getAttribute("data-id")}']`)
    let forms = document.querySelectorAll(`${selector.startsWith("[") ? selector : `[id='${selector}']`} textarea, ${selector.startsWith("[") ? selector : `[id='${selector}']`} input, ${selector.startsWith("[") ? selector : `[id='${selector}']`} select`);
    let fd = new FormData()
    let filenames = []
    let form = {}

    if (validateIndexes.length > 0) {
        forms = document.querySelectorAll(`[data-indexblockfield='${validateIndexes[0]}'] input, [data-indexblockfield='${validateIndexes[0]}'] select, [data-indexblockfield='${validateIndexes[0]}'] textarea`)
    }

    if (formInfo) {
        if (validateIndexes.length <= 0 && formInfo.getAttribute("data-type") === "sequential" && formInfo.getAttribute("data-finish") == "false") {
            throw Error("no passed");
        }
    }

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
            if (field?.skipValidation == true || forms[i].getAttribute("data-skipValidation") == "true") {
                break;
            }
            switch (forms[i].type) {
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
                case "week":
                case "tel":
                case "text":
                case "time":
                case "url":
                case "textarea":
                case "select-one":
                case "select":
                case "select-multiple":
                    if (forms[i].type == "select-multiple") {
                        let opts = [...forms[i].options].reduce((acc, cur) => {
                            if (cur.selected)
                                acc.push(cur.value)
                            return acc
                        }, [])
                        form[forms[i].getAttribute(name || "name")] = opts
                        fd.append(forms[i].getAttribute(name || "name"), opts)
                    } else {
                        form[forms[i].getAttribute(name || "name")] = forms[i].value
                        fd.append(forms[i].getAttribute(name || "name"), forms[i].value)
                    }
                    if (forms[i].dataset.required == 'true' && forms[i].getAttribute("pattern")) {
                        let patt = forms[i].getAttribute("pattern") || field.pattern
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
                        if (forms[i].dataset.required == 'true' && !selected) {
                            checked.push(false)
                            forms[i].parentElement.classList.add("border-red-300")
                        } else {
                            forms[i].parentElement.classList.remove("border-red-300")
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

                        if (forms[i].dataset.required == 'true' && !form[forms[i].getAttribute("name")]) {
                            forms[i].parentElement.classList.add("border-red-300")
                            checked.push(false)
                        } else {
                            forms[i].parentElement.classList.remove("border-red-300")
                        }
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