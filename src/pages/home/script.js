const questions = [
  {
    pkm: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/765.png",
    options: ["Staravia", "Oranguru", "Burmy", "Slugma"],
    pkm_name: "Oranguru",
  },
  {
    pkm: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/281.png",
    options: ["Ambipom", "Scorbunny", "Kirlia", "Bronzor"],
    pkm_name: "Kirlia",
  },
  {
    pkm: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/334.png",
    options: ["Sligoo", "Cacnea", "Lopunny", "Altaria"],
    pkm_name: "Altaria",
  },
  {
    pkm: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/050.png",
    options: ["Diglet", "Petilil", "Jellicent", "Carracosta"],
    pkm_name: "Diglet",
  },
  {
    pkm: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/498.png",
    options: ["Voltorb", "Cubchoo", "Tepig", "Graveler"],
    pkm_name: "Tepig",
  },
];

let AtualQuestion = 0;
let correctAnswers = 0;

function Disable(id, selected) {
  let child = document.getElementById(`options-${id}`).children;
  let result = document.getElementById(`question_result-${id}`);

  for (kid = 0; kid < child.length; kid++) {
    let correct =
      child[kid].value === questions[id].pkm_name ? "correct" : "incorrect";

    child[kid].classList.add(correct, "disabled");
    child[kid].disabled = true;
  }

  if (selected === questions[id].pkm_name) {
    correctAnswers += 1;
    result.classList.add("green-text");
    result.innerHTML = "Parabéns você acertou!!!";
  } else {
    result.classList.add("red-text");
    result.innerHTML = "Errou!!!";
  }
  document.getElementById(`next-${id}`).classList.remove("disabled");
}

function handleAnswer(optionID) {
  let option = document.getElementById(optionID);
  let question = optionID.toString().split("-")[1];

  Disable(question, option.value);
}

function nextQuestion(nextBTNID) {
  let nextBTN = document.getElementById(nextBTNID);

  if (!nextBTN.classList.contains("disabled")) {
    nextBTN.classList.add("disabled");

    let question = parseInt(nextBTNID.toString().split("-")[1]);

    document.getElementById(`question-${question}`).style.display = "none";

    if (question === 4) {
      document.getElementById("final").style.display = "";
      document.getElementById(
        "final-subtittle"
      ).innerHTML = `você acertou <strong>${
        (correctAnswers / questions.length) * 100
      }%</strong> das questões`;
    } else {
      document.getElementById(`question-${question + 1}`).style.display = "";
    }
  }
}

const questionsHTML = questions.map((value, position) => {
  optionsHTML = () => {
    let opHTML = "";
    let questionsHTML_Array = value.options.map((Qvalue, Qposition) => {
      return `<input type="button" class="option option-${position}" id="option-${position}-${Qposition}" onclick={handleAnswer(id)} value=${Qvalue}>`;
    });
    for (optionHTML_ArrayValue in questionsHTML_Array) {
      opHTML += questionsHTML_Array[optionHTML_ArrayValue];
    }
    return opHTML;
  };

  let firstQuestion = position === 0 ? null : "style='display:none'";

  return `<section id="question-${position}" class="question flex" ${firstQuestion}><h1 class="question-title">Quem é esse pokemon?</h1><img class="question-img" src=${
    value.pkm
  } alt="se f#" /><p id="question_result-${position}" class="question-result"></p><div class="options" id="options-${position}"> ${optionsHTML()} </div><input type="button" class="next disabled" id="next-${position}" value="Próxima pergunta" onclick={nextQuestion(id)}></section>`;
});

function updateHTML() {
  const container = document.getElementById("container");
  let HTML = "";

  for (questonHTMLposition in questionsHTML) {
    HTML += questionsHTML[questonHTMLposition];
  }

  HTML += `<section id="final" class="flex" style='display:none'><h1 id="final-tittle">Parabéns você completou o Quiz</h1><h2 id="final-subtittle"></h2></section>`;
  container.innerHTML = HTML;
}