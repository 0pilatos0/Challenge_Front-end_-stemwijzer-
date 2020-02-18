let buttons = document.getElementById('game-buttons');
let button1 = document.getElementById('button1');
let button2 = document.getElementById('button2');
let button3 = document.getElementById('button3');
let button4 = document.getElementById('button4');
let title = document.getElementById('title');
let description = document.getElementById('description');

let punten = [];
let partijen = [];
let antwoorden = [];
let vraag = 0;
Main();
function Main() {
  verandertitel('Hoofdmenu');
  veranderbuttonText('Start', '', '', 'sla deze vraag over -->');
  knoppendisplay('inline-block', 'none', 'none', 'none');
  button1.onclick = function() {
    Start();
  };
  for (i = 0; i < subjects[vraag].parties.length; i++) {
    punten.push(0);
    partijen.push(subjects[vraag].parties[i].name);
  }
  back.style.display = 'none';
}
function verandertitel(titeltekst) {
  title.innerHTML = titeltekst;
}
function veranderbuttonText(waarde1, waarde2, waarde3, waarde4) {
  button1.innerHTML = waarde1;
  button2.innerHTML = waarde2;
  button3.innerHTML = waarde3;
  button4.innerHTML = waarde4;
}
function knoppendisplay(waarde1, waarde2, waarde3, waarde4) {
  button1.style.display = waarde1;
  button2.style.display = waarde2;
  button3.style.display = waarde3;
  button4.style.display = waarde4;
}
function veranderdescriptionText(descriptiontekst) {
  description.innerHTML = descriptiontekst;
}
function Start() {
  back.style.display = 'block';
  if (vraag + 1 > subjects.length) {
    Calculate();
  } else {
    verandertitel(subjects[vraag].title);
    veranderdescriptionText(subjects[vraag].statement);
    knoppendisplay(
      'inline-block',
      'inline-block',
      'inline-block',
      'inline-block'
    );
    veranderbuttonText(
      'Eens',
      'Geen van Beide',
      'oneens',
      'sla deze vraag over -->'
    );

    button1.onclick = function() {
      ButtonHandler('pro');
      vraag++;
      Start();
    };
    button2.onclick = function() {
      ButtonHandler('none');
      vraag++;
      Start();
    };
    button3.onclick = function() {
      ButtonHandler('contra');
      vraag++;
      Start();
    };
    button4.onclick = function() {
      vraag++;
      Start();
    };
  }
}
function Calculate() {
  verandertitel('Resultaten');
  veranderdescriptionText(
    'Hieronder worden de resultaten getoont van de test.'
  );
  knoppendisplay('none', 'none', 'none', 'none');
  for (o = 0; o < subjects.length; o++) {
    for (i = 0; i < subjects[o].parties.length; i++) {
      if (subjects[o].parties[i].position === antwoorden[o]) {
        punten[i] += 1;
      }
    }
  }
}
function ButtonHandler(position) {
  antwoorden[vraag] = position;
}
function Back() {
  if (vraag > 0) {
    vraag--;
    Start();
  }
}
