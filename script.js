//import { questionnaire } from "./questionnaire.js";

const questionnaire = [{
    "question": "What is your comfort food?",
    "name":"comfortfood",
    "answers": [
      {
        value: "1",
        label: "Medim-rare flat iron Steak"
      },{
        value: "2",
        label: "Pie!"
      },{
        value: "3",
        label: "Chicken Tikka Masala"
      }
    ]
},{
    "question": "What is your drink?",
    "name":"drink",
    "answers": [
      {
        value: "1",
        label: "On the rocks"
      },{
        value: "2",
        label: "Beer. Whichever you got."
      },{
        value: "3",
        label: "Pisco Sour with Cinnamon and a slice of dried Mango"
      }
    ]
}
];

/*const answers = [
  {
    value: "steak",
    label: "Medim-rare flat iron Steak"
  },{
    value: "pie",
    label: "Pie!"
  },{
    value: "masala",
    label: "Chicken Tikka Masala"
  }
];*/

let currentQuestion = 0;
let selectedAnswers = [];

//Render the Start button and handle the click event
function onStart() {
  let start = $("<button></button>").attr({
    "id":"start",
    "type":"submit"
  }).text("START").click(() => renderForm());

  $("body").append(start);
}

//Render the Reset button and handle the click event
function onReset() {
  selectedAnswers = [];
  
  let reset = $("<button></button>").attr({
    "id":"reset",
    "type":"submit"
  }).text("DO IT AGAIN").click(() => {
    reset.remove();
    currentQuestion = 0;
    $(document).ready(renderForm());
  });

  $("body").append(reset);
}

//Render the main question form with question and answers corresponding to currentQuestion value.
//Also render the Submit button and handle the click event based on whether it's the last question in the test or not
function renderForm() {
  $("#start").hide();

  let selectedVal = "";
  let h3 = $("<h3></h3>").text(questionnaire[currentQuestion].question);

  let options = $("<div></div>").attr("class", ".answer-options");
  for (let answer of questionnaire[currentQuestion].answers) {
    let a = $("<input></input>").attr({
      "name":questionnaire[currentQuestion].name,
      "type":"radio",
      "value":answer.value
    }).on('click',(e) => {
      let currentEl = e.currentTarget;
      if (currentEl.checked) {
        selectedVal = currentEl.value;
      }
    });
    let l = $("<label></label>").text(answer.label);
    options.append(a,l);
  }

  let b = $("<button></button>").attr("type","submit").text("ROGER").click((e) => {
    if (selectedVal === "") {
      e.preventDefault();
      alert("You must select an answer first!");
      return;
    }
    e.preventDefault();
    $("form").remove();
    selectedAnswers.push(selectedVal);
    if (currentQuestion<questionnaire.length-1) {
      currentQuestion++;
      renderForm();
    } else {
      renderResults();
      onReset();
    }
  });

  let f = $("<form></form>").attr("method","POST").append(h3,options,b);
  $("body").append(f);
}

function renderResults() {
  console.log(selectedAnswers);
}

$(onStart());
