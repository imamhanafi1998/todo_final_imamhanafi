const defaultList = [
  {
    "pesan": "Ini contoh pesan pertama",
    "completed": false
  },
  {
    "pesan": "Ini contoh pesan kedua",
    "completed": true
  }
]

const modifiedList = JSON.parse(localStorage.getItem('list')) || defaultList

const component = {
  list: document.querySelector("#list"),
  input: document.querySelector("#input"),
  submit: document.querySelector("#submit"),
  reset: document.querySelector("#reset")
}

const renderList = () => {
  component.list.innerHTML = null
  localStorage.setItem("list", JSON.stringify(modifiedList))
  modifiedList.forEach((inputan_baru, index) => {
    // buat element li
    const todo_baru = document.createElement("li")
    // isi text dari li
    todo_baru.innerText = inputan_baru.pesan

    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("checked", "checked")

    if (inputan_baru.completed) {
      const hapus = document.createElement("button")
      hapus.innerText = "Hapus"
      checkbox.setAttribute("disabled", "disabled")
      hapus.addEventListener("click", () => {
        hapus_todo(index)
      })
      todo_baru.append(" | ", hapus)
    } else {
      checkbox.removeAttribute("checked")
    }
    todo_baru.prepend(checkbox)

    checkbox.addEventListener("click", () => {
      todo_selesai(index)
    })
    component.list.append(todo_baru)
  })
  component.input.focus()
}

const hapus_todo = (index) => {
  modifiedList.splice(index, 1)
  renderList()
}

function inputanTerpenuhi() {
  return component.input.value.length > 0
}

const tambah_todo = () => {
  if (inputanTerpenuhi()) {
    const baruu = component.input.value
    modifiedList.push({"pesan": baruu, "completed": false})
    renderList()
    // alert()
  } else {
    // alert("k")
  }
  component.input.value = ""
}

const todo_selesai = (index) => {
  modifiedList[index].completed = true
  renderList()
}

component.submit.addEventListener("click", () => {
  tambah_todo()
})

component.reset.addEventListener("click", () => {
  localStorage.clear()
  window.location.reload()
})

renderList()
