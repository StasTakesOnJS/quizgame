//import questionnaire from "./questionnaire.js";

const questionnaire = [{
    "question": "What is your comfort food?",
    "name":"comfortfood",
    "answers": [
      {
        value: 1,
        label: "Medim-rare flat iron Steak"
      },{
        value: 2,
        label: "Pie!"
      },{
        value: 3,
        label: "Chicken Tikka Masala"
      }
    ]
},{
    "question": "What is your drink?",
    "name":"drink",
    "answers": [
      {
        value: 1,
        label: "On the rocks"
      },{
        value: 2,
        label: "Beer. Whichever you got."
      },{
        value: 3,
        label: "Pisco Sour with Cinnamon and a slice of dried Mango"
      }
    ]
},{
    "question": "Where do you stand on dogs?",
    "name":"dog",
    "answers": [
      {
        value: 3,
        label: "What's \"dogs\"?"
      },{
        value: 1,
        label: "I don't speak of such awful creatures"
      },{
        value: 2,
        label: "I sleep on dog's pillow sometimes. So you know, whatever"
      }
    ]
},{
    "question": "If you were a cat, what would make you sure that you are actually a cat, and not, say, a bald eagle?",
    "name":"drink",
    "answers": [
      {
        value: 2,
        label: "Never met my dad, but my mom is one big fluff. So yeah, pretty sure."
      },{
        value: 3,
        label: "I wonder if i fit in that box... What was the question?"
      },{
        value: 1,
        label: "(Heavy purring)"
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
let h1 = $("<h1></h1>").text("What type of Kat are you?");

//Render the Start button and handle the click event
function onStart() {
  let start = $("<button></button>").attr({
    "id":"start",
    "type":"submit"
  }).text("START").click(() => {
    $("body").empty();
    renderForm();
  });

  $("body").append(h1,start);
}

//Render the Reset button and handle the click event
function onReset() {
  selectedAnswers = [];

  let reset = $("<button></button>").attr({
    "id":"reset",
    "type":"submit"
  }).text("GO AGAIN").click(() => {
    reset.remove();
    currentQuestion = 0;
    $("body").empty();
    $(document).ready(renderForm());
  });

  $("body").append("<br>",reset);
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
      "id":answer.value,
      "name":questionnaire[currentQuestion].name,
      "type":"radio",
      "value":answer.value
    }).on('click',(e) => {
      let currentEl = e.currentTarget;
      if (currentEl.checked) {
        selectedVal = currentEl.value;
      }
    });
    let l = $("<label></label>").text(answer.label).attr("for",answer.value);
    options.append(a,l,"<br>");
  }

  let b = $("<button></button>").attr("type","submit").text("MEOW").click((e) => {
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
  let rating = selectedAnswers.map((i) => parseInt(i)).reduce((a,b) => a+b);
  let type = "";
  let url = "";
  let alt = "";

  if (rating < 7) {
    type = "Well you are one with some Cattitude!"
    url = "https://cdn.images.express.co.uk/img/dynamic/80/590x/Grumpy-Cat-on-bed-544409.jpg";
    alt = "Purring intensifies";
  } else if (rating > 9) {
    type = "You, my friend, are a Blep Cat :P";
    url = "https://i.pinimg.com/originals/ac/e9/3c/ace93c234dfef3c6fae56f60f7d55efe.jpg";
    alt = "Look, a butterfly!";
  } else {
    type = "Congrats, you are a Laperm!";
    url = "https://www.askideas.com/media/84/Cury-Hair-Laperm-Cat.jpg";
    alt = "Got fish?";
  }

  let h2 = $("<h2></h2>").text(type);
  let image = $("<img></img>").attr({
    "src":url,
    "alt":alt,
    "title":alt
  });

  $("body").append(h2,image);
}

$(onStart());
