const workouts = [
  {
    name: 'Treino de pernas',
    icon: '🪑',
    time: '8 min • nível fácil',
    exercises: [0, 1, 2]
  },
  {
    name: 'Treino de braços',
    icon: '💪',
    time: '7 min • nível fácil',
    exercises: [3, 5]
  },
  {
    name: 'Treino completo',
    icon: '🧍',
    time: '12 min • nível moderado',
    exercises: [0, 3, 4, 5, 2]
  }
];

const exercises = [
  {
    title: 'Sentar e levantar da cadeira',
    icon: '🪑',
    sets: '3 séries • 8 repetições',
    instruction: 'Sente e levante devagar, com controle.',
    media: 'assets/gifs/sentar-levantar.gif'
  },
  {
    title: 'Elevação de panturrilha',
    icon: '🦶',
    sets: '3 séries • 10 repetições',
    instruction: 'Suba e desça devagar, segurando o equilíbrio.',
    media: 'assets/gifs/panturrilha.gif'
  },
  {
    title: 'Extensão de joelho sentado',
    icon: '🦵',
    sets: '2 séries • 8 repetições',
    instruction: 'Estenda a perna lentamente e volte.',
    media: 'assets/gifs/extensao-joelho.gif'
  },
  {
    title: 'Flexão de braços na parede',
    icon: '🧱',
    sets: '3 séries • 8 repetições',
    instruction: 'Apoie as mãos na parede e flexione devagar.',
    media: 'assets/gifs/flexao-parede.gif'
  },
  {
    title: 'Marcha parada',
    icon: '🚶',
    sets: '2 séries • 30 segundos',
    instruction: 'Eleve os joelhos alternando os lados.',
    media: 'assets/gifs/marcha-parada.gif'
  },
  {
    title: 'Abrir e fechar braços',
    icon: '🤲',
    sets: '2 séries • 10 repetições',
    instruction: 'Abra os braços e feche com movimento leve.',
    media: 'assets/gifs/abrir-fechar-bracos.gif'
  }
];

let currentWorkoutIndex = 0;
let currentExerciseOrder = [];
let currentExercisePosition = 0;
let timerInterval = null;
let secondsLeft = 30;

function openScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setNav(btn) {
  document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectChoice(btn) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.choice').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
}

function showHowWorks() {
  alert('Escolha um treino, siga as instruções e avance no seu ritmo. Se sentir dor, tontura ou falta de ar, pare e procure atendimento.');
}

function renderWorkoutList() {
  const list = document.getElementById('workout-list');
  list.innerHTML = '';

  workouts.forEach((w, idx) => {
    const el = document.createElement('div');
    el.className = 'trainer-card';
    el.innerHTML = `
      <div class="icon-circle">${w.icon}</div>
      <div>
        <h3>${w.name}</h3>
        <p>${w.time}</p>
      </div>
    `;
    el.onclick = () => startWorkout(idx);
    list.appendChild(el);
  });
}

function startWorkout(index) {
  currentWorkoutIndex = index;
  currentExerciseOrder = workouts[index].exercises.slice();
  currentExercisePosition = 0;
  renderExerciseDetail();
  openScreen('screen-exercise');
  startTimer();
}

function renderExerciseDetail() {
  const exIndex = currentExerciseOrder[currentExercisePosition];
  const ex = exercises[exIndex];

  document.getElementById('exercise-counter').textContent = `${currentExercisePosition + 1} de ${currentExerciseOrder.length}`;
  document.getElementById('exercise-title').textContent = ex.title;
  document.getElementById('exercise-instruction').textContent = ex.instruction;
  document.getElementById('exercise-sets').textContent = ex.sets;
  document.getElementById('exercise-icon').textContent = ex.icon;
  document.getElementById('done-count').textContent = currentExerciseOrder.length;

  const media = document.getElementById('exercise-media');
  media.src = ex.media;
  media.alt = `GIF de ${ex.title}`;
  media.style.display = 'none';
  media.onerror = () => {
    media.style.display = 'none';
    document.getElementById('exercise-icon').style.display = 'flex';
  };
  media.onload = () => {
    media.style.display = 'block';
    document.getElementById('exercise-icon').style.display = 'none';
  };

  resetTimer();
}

function nextExercise() {
  if (currentExercisePosition < currentExerciseOrder.length - 1) {
    currentExercisePosition++;
    renderExerciseDetail();
  } else {
    stopTimer();
    openScreen('screen-finish');
  }
}

function prevExercise() {
  if (currentExercisePosition > 0) {
    currentExercisePosition--;
    renderExerciseDetail();
  }
}

function resetTimer() {
  stopTimer();
  secondsLeft = 30;
  updateTimerLabel();
}

function updateTimerLabel() {
  const m = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const s = String(secondsLeft % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${m}:${s}`;
}

function startTimer() {
  stopTimer();
  timerInterval = setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft--;
      updateTimerLabel();
    } else {
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function saveProgress() {
  const progress = {
    lastWorkout: new Date().toISOString(),
    completedExercises: currentExerciseOrder.length,
    workoutName: workouts[currentWorkoutIndex].name
  };
  localStorage.setItem('academiaDaNiziaProgress', JSON.stringify(progress));
  alert('Progresso salvo no navegador.');
}

function showHistory() {
  const saved = localStorage.getItem('academiaDaNiziaProgress');
  if (!saved) {
    alert('Nenhum progresso salvo ainda.');
    return;
  }

  const data = JSON.parse(saved);
  alert(
    `Último treino salvo em: ${new Date(data.lastWorkout).toLocaleString('pt-BR')}\n` +
    `Treino: ${data.workoutName}\n` +
    `Exercícios concluídos: ${data.completedExercises}`
  );
}

renderWorkoutList();
updateTimerLabel();
