import data from "./InterestData";
import eventListeners from "./eventListener"
import DOMappend from "./DomAppend"


const interestBuilder = {
    pageLoad() {
        let outputContainer = document.querySelector(".input")
        outputContainer.innerHTML = "";
        let interestFormContainer = document.createElement("container")
        interestFormContainer.classList.add("interestContainerForm");
        interestFormContainer.innerHTML = "<h2 class='interestFormHeader'>Add Your Interest</h2>" ;
        outputContainer.appendChild(interestFormContainer)

        let placeContainer = document.createElement("container")
        placeContainer.classList.add("placesContainer")
        outputContainer.appendChild(placeContainer)

        DOMappend.appendToDOM();

    },
    interestFormCreater() {
        data.getPlaces()
            .then(places => {
                let interestForm = document.createElement("form");
                interestForm.classList.add("interestForm")
                let interestFormContainer = document.querySelector(".interestContainerForm")
                interestFormContainer.appendChild(interestForm)

                let interestNameInput = document.createElement("input");
                let interestNameLabel = document.createElement("label");

                interestNameLabel.textContent = "Interest Name:"
                interestNameInput.setAttribute("type", "text");
                interestNameInput.classList.add("interestName");
                interestForm.appendChild(interestNameLabel);
                interestForm.appendChild(interestNameInput);



                let interestDescriptionInput = document.createElement("input")
                let interestDescriptionLabel = document.createElement("label");
                interestDescriptionLabel.setAttribute("type", "text");
                interestDescriptionInput.classList.add("interestDescription");
                interestDescriptionLabel.textContent = "Description:"
                interestForm.appendChild(interestDescriptionLabel)
                interestForm.appendChild(interestDescriptionInput)



                let costInput = document.createElement("input")
                let costLabel = document.createElement("label")
                costInput.classList.add("interestCost")
                costLabel.setAttribute("type", "text")
                costLabel.textContent = "Cost:"
                interestForm.appendChild(costLabel)
                interestForm.appendChild(costInput)

                let placeDropDown = document.createElement("select")
                placeDropDown.setAttribute("id", "mySelect")
                let LondonOption = document.createElement("option")
                LondonOption.setAttribute("value", `${places[0].id}`)
                LondonOption.textContent = `${places[0].name}`


                let parisOptions = document.createElement("option")
                parisOptions.setAttribute("value", `${places[1].id}`)
                parisOptions.textContent = `${places[1].name}`


                let berlinOptions = document.createElement("option")
                berlinOptions.setAttribute("value", `${places[2].id}`)
                berlinOptions.textContent = `${places[2].id}`



                placeDropDown.appendChild(LondonOption)
                placeDropDown.appendChild(parisOptions)
                placeDropDown.appendChild(berlinOptions)
                interestForm.appendChild(placeDropDown)

                let interestSaveButton = document.createElement("button")
                interestSaveButton.setAttribute("class", "interestSaveButton")
                interestSaveButton.textContent = "save"
                interestForm.appendChild(interestSaveButton);


                interestSaveButton.addEventListener("click", eventListeners.interestSave)

            })
    },
    interestDom(value) {
        let interestContainer = document.querySelector(".output");
        interestContainer.setAttribute("id", `interest--${value.placeId}`);

        let place = document.createElement("h2")
        place.innerHTML = `Place: <p>${place.value}</p>`
        interestContainer.appendChild(place)

        let name = document.createElement("h3")
        name.innerHTML = `name: <p>${value.name}</p>`
        interestContainer.appendChild(name)

        let description = document.createElement("h3")
        description.innerHTML = `description: <p>${value.description}</p>`
        interestContainer.appendChild(description)


        let cost = document.createElement("p")
        cost.innerHTML = `cost: <p>${value.cost}</p>`
        interestContainer.appendChild(cost)

        let review = document.createElement("p")
        review.innerHTML = `review: <p>${value.review}</p>`
        review.setAttribute("id", `review--${value.id}`)
        interestContainer.appendChild(review)


        let interestEditButton = document.createElement("button")
        interestEditButton.innerText = "Edit"
        interestEditButton.setAttribute("id", `interestedit--${value.id}`)


        let interestDeleteButton = document.createElement("button")
        interestDeleteButton.innerText = "Delete";
        interestDeleteButton.setAttribute("id", `interest--${value.id}`)
        interestContainer.classList.add("interestContainer")
        interestDeleteButton.addEventListener("click", eventListeners.deletePrompt)
        interestContainer.appendChild(interestEditButton)
        interestContainer.appendChild(interestDeleteButton)



        data.getAllInterest()
            .then(() => {
                interestEditButton.addEventListener("click", () => {
                    interestBuilder.interestEditForm(IDBCursorWithValue)

                })
            })
        return interestContainer;
    },
    interestEditForm() {
        let interestEditId = event.target.id;
        interestId = interestEditId.split("--")[1]

        let costEditfield = document.createElement("input")
        costEditfield.setAttribute("type", "text")
        costEditfield.classList.add("costEditField")
        let costEditLabel = document.createElement("label")
        costEditLabel.textContent = "cost:"

        let reviewEditField = document.createElement("input")
        reviewEditField.setAttribute("type", "text")
        reviewEditField.classList.add("reviewEditField")
        let reviewEditLabel = document.createElement("label")
        reviewEditLabel.textContent = "Edit review:"


        let saveButton = document.createElement("button")
        saveButton.textContent = "Save"

        data.getInterest(interestId)
            .then(interestId => {
                console.log(interest.cost)
                costEditfield.value = interest.value
                reviewEditField.value = review.value
                saveButton.addEventListener("click", () => {
                    let placeId = interest.placeId
                    let name = interest.name
                    let description = interest.description


                    let editedInterest = {
                        placeId: id,
                        name: name,
                        description: description,
                        cost: costEditfield.value,
                        review: reviewEditField.value
                    }
                    data.editInterest(interest.id, editedInterest)
                        .then(() => {
                            DOMEappend.appendToDom();

                        })
                })

            })
        let interestContainer = document.querySelector(`#interest--${interestId}`)
        interestContainer.appendChild(costEditLabel)
        interestContainer.appendChild(costEditfield)
        interestContainer.appendChild(reviewEditLabel)
        interestContainer.appendChild(reviewEditField)
        interestContainer.appendChild(saveButton)

    }
}




export default interestBuilder