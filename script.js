const answers = [
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
];

function renderForm() {
  let f = document.createElement("form");
  f.method = "POST";

  let h3 = document.createElement("h3");
  h3.innerHTML = "What is your comfort food?";
  f.appendChild(h3);

  for (let answer of answers) {
    let a = document.createElement("input");
    a.name = "comfortfood";
    a.type = "radio";
    a.value = answer.value;
    f.appendChild(a);

    let l = document.createElement("label");
    l.innerHTML = answer.label;
    f.appendChild(l);
  }

  let b = document.createElement("button");
  b.type = "submit";
  b.innerHTML = "ROGER";
  f.appendChild(b);

  document.body.appendChild(f);
}

renderForm();
