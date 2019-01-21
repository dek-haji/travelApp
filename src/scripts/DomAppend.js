import interestBuilder from "./DomBuilder"
import data from "./InterestData"
const DOMappend = {
    appendToDOM() {
        data.getAllInterest()
        .then (interests => {

            let placesContainer = document.querySelector(".output");
            let interestFrag = document.createDocumentFragment()
            interests.forEach(interest => {
                // console.log(interests)
                let interestHTML = interestBuilder.interestDom(interest);
                interestFrag.appendChild(interestHTML);
            })
            while (placesContainer.firstChild) {
                placesContainer.removeChild(placesContainer.firstChild)
            }
            placesContainer.appendChild(interestFrag);
        })
    }
}



export default DOMappend;