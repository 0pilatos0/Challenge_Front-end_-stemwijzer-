let answers = [];
let counter = 0;
let choicesStep = false;
let choicesLoaded = false;

window.onload = function() {
  startQu();
};

function startQu() {
  homepage.style.display = 'block';
  questions.style.display = 'none';
  results.style.display = 'none';
  backButton.style.display = 'none';

  document.getElementById('questionCount').innerHTML = subjects.length;
  start.addEventListener('click', startQ);
  values();
}

function values() {
  for (let i = 0; i < parties.length; i++) {
    let party = parties[i];
    party['count'] = 0;
    party['marked'] = false;
  }
}
function startQ() {
  homepage.style.display = 'none';
  questions.style.display = 'block';
  results.style.display = 'none';

  backButton.style.display = 'block';

  openQuestions.style.display = 'block';
  choices.style.display = 'none';

  pro.addEventListener('click', setAnswer);
  none.addEventListener('click', setAnswer);
  contra.addEventListener('click', setAnswer);
  skip.addEventListener('click', setAnswer);

  backButton.addEventListener('click', Back);

  setQ();
}
function Back() {
  if (counter === 0) {
    startQ();
    let previousAnswer = answers[counter].position;
    document.getElementById(previousAnswer).classList.add('active');
  } else if (counter === subjects.length) {
    startQ();
  } else {
    counter--;
    startQ();

    let previousAnswer = answers[counter].position;
    document.getElementById(previousAnswer).classList.add('active');
  }
}
function setAnswer(value) {
  answers[counter] = {
    position: value.target.id,
    isImportant: isImportant.checked
  };

  counter++;
  setQ();
}
function setQ() {
  if (counter === subjects.length && choicesStep === false) {
    showC();
  } else if (counter === subjects.length && choicesStep === true) {
    counter = subjects.length - 1;
    setQ();
  } else if (counter < subjects.length) {
    question.innerHTML = counter + 1 + '. ' + subjects[counter].title;
    statement.innerHTML = subjects[counter].statement;

    removeAC();
    if (counter !== 0 && answers[counter] !== undefined) {
      addActiveClass();
    }

    choicesStep = false;
    checkS();
  }
}
function addActiveClass() {
  switch (answers[counter].position) {
    case 'pro':
      pro.classList.add('active');
      break;
    case 'none':
      none.classList.add('active');
      break;
    case 'contra':
      contra.classList.add('active');
      break;
  }
}
function removeAC() {
  pro.classList.remove('active');
  none.classList.remove('active');
  contra.classList.remove('active');
}
function checkS() {
  if (answers[counter] === undefined) {
    isImportant.checked = false;
  } else {
    isImportant.checked = answers[counter].isImportant;
  }
}
function showC() {
  choicesStep = true;

  openQuestions.style.display = 'none';
  choices.style.display = 'block';

  backButton.addEventListener('click', Back);

  question.innerHTML = 'Welke partijen wilt u meenemen in het resultaat?';
  statement.innerHTML =
    'U kunt kiezen voor grote partijen, daarbij nemen we de partijen mee die in de peilingen op minimaal één zetel staan. U kunt kiezen voor seculiere partijen. Maak tenminste een selectie van drie partijen.';

  nextPage.addEventListener('click', result);

  createP();

  largeParties.addEventListener('click', largeP);
  secularParties.addEventListener('click', secularP);
  noParties.addEventListener('click', clearP);
}
function createP() {
  if (!choicesLoaded) {
    for (let i = 0; i < parties.length; i++) {
      const currIndex = i;

      let createLi = document.createElement('li');
      createLi.className = 'list-group-item';

      let checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('id', parties[i].name);
      checkbox.onclick = function() {
        setP(currIndex);
      };
      createLi.appendChild(checkbox);

      let liContent = document.createTextNode(parties[i].name);
      createLi.appendChild(liContent);

      partyList.appendChild(createLi);
    }
    choicesLoaded = true;
  }
}
function largeP() {
  for (let i = 0; i < parties.length; i++) {
    let party = parties[i];
    if (party.size >= 1) {
      party.marked = true;

      let partyName = party.name;
      document.getElementById(partyName).checked = true;
    }
  }
}
function secularP() {
  for (let i = 0; i < parties.length; i++) {
    let partySecular = parties[i].secular;
    if (partySecular) {
      let party = parties[i];
      party.marked = true;

      let partyName = party.name;
      document.getElementById(partyName).checked = true;
    }
  }
}
function clearP() {
  for (let i = 0; i < parties.length; i++) {
    let party = parties[i];
    party['marked'] = false;

    let partyErase = parties[i].name;

    document.getElementById(partyErase).checked = false;
  }
}
function setP(index) {
  if (parties[index].marked) {
    parties[index].marked = false;
  } else {
    parties[index].marked = true;
  }
}
function result() {
  let markCounter = 0;
  for (let k = 0; k < parties.length; k++) {
    if (parties[k].marked) {
      markCounter++;
    }
  }

  if (markCounter >= 3) {
    choicesStep = false;

    homepage.style.display = 'none';
    questions.style.display = 'none';
    results.style.display = 'block';

    backButton.addEventListener('click', Back);

    checkA();
    showR();
  } else {
    alert('Selecteer ten minste 3 partijen.');
  }
}
function resetC() {
  for (let i = 0; i < parties.length; i++) {
    parties[i].count = 0;
  }
}
function checkA() {
  resetC();
  for (let i = 0; i < answers.length; i++) {
    let answer = answers[i];
    let subjectParties = subjects[i].parties;
    for (let j = 0; j < subjectParties.length; j++) {
      let subjectParty = subjectParties[j];
      let answerPosition = answer.position;
      if (subjectParty.position !== answerPosition) {
        continue;
      }

      let foundParty = null;
      let subjectPartyName = subjectParty.name;
      for (let k = 0; k < parties.length; k++) {
        if (parties[k].name === subjectPartyName) {
          foundParty = parties[k];
          break;
        }
      }
      if (foundParty === null) {
        continue;
      }
      let answerIsImportant = answer.isImportant;
      if (answerIsImportant) {
        foundParty.count++;
      }
      foundParty.count++;
    }
  }
}
function showR() {
  otherResults.innerHTML = '';
  let markedParties = [];
  for (let i = 0; i < parties.length; i++) {
    const party = parties[i];
    if (party.marked) {
      markedParties.push(party);
    }
  }
  markedParties.sort(function(a, b) {
    return b.count - a.count;
  });
  for (let i = 0; i < markedParties.length; i++) {
    let li = document.createElement('li');
    li.innerHTML =
      markedParties[i].name + ' met: ' + markedParties[i].count + ' punten';
    otherResults.appendChild(li);
  }
}
